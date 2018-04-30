import React, { Component } from 'react';
import { Redirect,Route } from 'react-router-dom';
import FotoItem from './Foto';
import PubSub from 'pubsub-js'
import { CSSTransitionGroup } from 'react-transition-group'

export default class Timeline extends Component {
    
    constructor(props){
       super(props)
       this.state = {
           fotos:[],
           //token:null
       }
       this.login = this.props.login
      
    }

    
    //Pega os dados da pesquisa,no canal do pubSub!!!
    componentWillMount(){
       PubSub.subscribe('timeline',(topico,fotos) => {
           this.setState({fotos})
       });


       PubSub.subscribe('atualiza-liker',(topico,infoLiker) => {
         const fotoAchada = this.state.fotos.find(foto => foto.id === infoLiker.fotoId)
         fotoAchada.likeada = !fotoAchada.likeada
         const possivelLiker = fotoAchada.likers.find(liker => liker.login === infoLiker.liker.login)
         
         if(possivelLiker === undefined){
            fotoAchada.likers.push(infoLiker.liker)
         }else{
           const unLiker = fotoAchada.likers.filter(liker => liker.login != infoLiker.liker.login)
           fotoAchada.likers  = unLiker
         }
         this.setState({fotos:this.state.fotos})
   })


   PubSub.subscribe('novos-comentarios',(topico,newComents) => {
        const fotoAchada = this.state.fotos.find(foto => foto.id === newComents.fotoId)
        
         console.log(newComents.novoComentario)
         const novosComentarios = fotoAchada.comentarios.push(newComents.novoComentario);
         this.setState({fotos:this.state.fotos});
        
   })
    
}

    

    carregaFotos(){
        let urlPerfil 
        let user = Boolean(this.login)
        if(!user){
          urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
        }else{
           urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`
        }
       
        fetch(urlPerfil)
       .then(item => {
           if(item.ok) return item.json()
           return Promise.reject("Erro na requisiçao: erro => " + item.status);
       }).then(item => {
           this.setState({fotos:item})
           //this.setState({token:true})
       })
       .catch(error => {
            console.log(error)
           // this.setState({token:false})
       })
       //.then(item => console.log(item))
    }
  

    componentDidMount(){
      this.carregaFotos()
    }


    componentWillReceiveProps(nxtProps){
        let user = Boolean(this.login)
        if(user){
          this.login = nxtProps.login
          this.carregaFotos(nxtProps)
        }
    }



    like(fotoId){
        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method:'POST'})
        .then(response => {
          if(response.ok){
            return response.json()
          }else{
            throw new Error('Não foi possivel curtir a foto')
          }
        }).then(liker => {
          PubSub.publish('atualiza-liker',{fotoId:fotoId,liker})
        })
    }



    comenta(fotoId,comentario){
        const requestInfo = {
            method:'POST',
            body:JSON.stringify({texto:comentario}),
            headers:new Headers({
              'Content-type':'application/json'
            })
          }
          fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
          .then(response => {
            if(response.ok){
              return response.json()
            }else{
              throw new Error("Nao Foi Possivel Comentar!!!")
            }
          }).then(novoComentario => {
             PubSub.publish('novos-comentarios',{fotoId:fotoId,novoComentario})
          })
    }



    render(){
        {console.log(this.state.fotos)}
    {/*console.log(Object.values(this.props.match.params)[0])*/}
        return (
        <div className="fotos container">
        <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {this.state.fotos.map(item => <FotoItem comenta={this.comenta} key={item.id} foto={item} like={this.like}/> )}
        </CSSTransitionGroup>
          {/*!this.state.token && <Redirect to='/'/>*/}
        </div>            
        );
    }
}