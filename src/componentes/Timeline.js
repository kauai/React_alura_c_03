import React, { Component } from 'react';
import { Redirect,Route } from 'react-router-dom';
import FotoItem from './Foto';
import PubSub from 'pubsub-js'
import { CSSTransitionGroup } from 'react-transition-group'
import logicaTimeline from '../logicas/logicaTimeline';

export default class Timeline extends Component {
    
    constructor(props){
       super(props)
       this.state = {
           fotos:[],
           //token:null
       }
       this.login = this.props.login
       this.logicaTimeline = new logicaTimeline([])
      
    }

    
    //Pega os dados da pesquisa,no canal do pubSub!!!
    componentWillMount(){
       PubSub.subscribe('timeline',(topico,fotos) => {
         console.log(fotos)
           this.setState({fotos})
       });


  //  PubSub.subscribe('atualiza-liker',(topico,infoLiker) => {})


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
           this.logicaTimeline = new logicaTimeline(item)
       })
       .catch(error => {
            //console.log(error)
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
     // console.log(fotoId)
      this.logicaTimeline.like(fotoId)
    }

    comenta(fotoId,comentario){
        this.logicaTimeline.comenta(fotoId,comentario)
    }


    render(){
       // {console.log(this.state.fotos)}
    {/*console.log(Object.values(this.props.match.params)[0])*/}
        return (
        <div className="fotos container">
        <CSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {this.state.fotos.map(item => <FotoItem comenta={this.comenta.bind(this)} key={item.id} foto={item} like={this.like.bind(this)}/> )}
        </CSSTransitionGroup>
          {/*!this.state.token && <Redirect to='/'/>*/}
        </div>            
        );
    }
}