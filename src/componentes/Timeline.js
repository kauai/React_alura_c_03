import React, { Component } from 'react'
import { Redirect,Route } from 'react-router-dom'
import FotoItem from './Foto'
import { CSSTransitionGroup } from 'react-transition-group'
import logicaTimeline from '../logicas/TimelineStore'


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
        this.props.store.subscribe(() => this.setState({fotos:this.props.store.getState()}))
    }

    

    carregaFotos(){
        let urlPerfil 
        let user = Boolean(this.login)
        if(!user){
          urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
        }else{
           urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`
        }
        const listaFixa = [{"urlPerfil":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg","loginUsuario":"alots","horario":"13/01/2018 14:14","urlFoto":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2","id":1,"likeada":false,"likers":[{"login":"rafael"},{"login":"alots"},{"login":"vitor"}],"comentarios":[{"login":"alots","texto":"testets maa","id":3},{"login":"alots","texto":"testtes","id":7},{"login":"alots","texto":"surf aventurte ","id":8},{"login":"alots","texto":"mmmmmmmmmmmm","id":31},{"login":"alots","texto":"mmmmmmmmmmmm","id":32},{"login":"alots","texto":"mmmmmmmmmmmm","id":33},{"login":"alots","texto":"mmmmmmmmmmmm","id":34},{"login":"alots","texto":"mmmmmmmmmmmm","id":35},{"login":"alots","texto":"mmmmmmmmmmmm","id":36},{"login":"alots","texto":"mmmmmmmmmmmm","id":37}],"comentario":"comentario da foto"},{"urlPerfil":"https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-19/11199408_569104449895751_1837574990_a.jpg","loginUsuario":"alots","horario":"13/01/2018 14:14","urlFoto":"https://instagram.fcgh9-1.fna.fbcdn.net/t51.2885-15/e35/15276770_381074615568085_8052939980646907904_n.jpg?ig_cache_key=MTM5ODY4MDMyNjYyMDA1MDE4OQ%3D%3D.2","id":2,"likeada":false,"likers":[{"login":"alots"},{"login":"rafael"},{"login":"vitor"}],"comentarios":[{"login":"alots","texto":"mais comentarios de testes vamos lá","id":60},{"login":"alots","texto":"mateus comenta sobre todas as definiçoes","id":68}],"comentario":"comentario da foto"}]
        this.props.store.dispatch({type:'LISTAGEM',fotos:listaFixa})
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
      this.props.store.like(fotoId)
    }


    comenta(fotoId,comentario){
        this.props.store.comenta(fotoId,comentario)
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