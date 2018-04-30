import React, { Component } from 'react';
import { Redirect,Route } from 'react-router-dom';
import queryString from 'query-string'

class Login extends Component {
    constructor(){
        super()
        this.state = {msg:'',token:false}
        this.envia = this.envia.bind(this);
        //this.string = this.string.bind(this);
    }
    
    envia(e){
      e.preventDefault()
      
      const requestInfo = {
           method:'POST',
           body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
           headers:new Headers({
               'Content-type':'Application/json'
           })
      }

      fetch('http://localhost:8080/api/public/login',requestInfo)
      .then(response => {
        if(response.ok) return response.text();
          return Promise.reject("Erro na requisiçao do Login: erro => " + response.status);
       })
       .then(token => {
           localStorage.setItem('auth-token',token)
           this.setState({token:true})
       })
        .catch(error => {
            this.setState({msg:"Voce precisa estar logado!!"})
            console.log(error)
       })
    }
    // string(indice){
    //     const values = queryString.parse(this.props.location.search)
    // }
    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        if(values){
            this.setState({msg:values.login})
        }
    }


    render() {
        //console.log(this.string())
        return (
            <div className="login-box">
                {this.state.token && <Redirect to='/timeline'/>}
                <h1 className="header-logo">Insta-App</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia}> 
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}

export default Login;