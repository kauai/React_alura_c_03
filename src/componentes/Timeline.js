import React, { Component } from 'react'
import { Redirect,Route } from 'react-router-dom'
import FotoItem from './Foto'
import { CSSTransitionGroup } from 'react-transition-group'
import TimelineApi from '../logicas/TimelineStore'


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
        this.props.store.dispatch(TimelineApi.lista(urlPerfil))
        //TimelineApi.lista(urlPerfil,this.props.store)
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