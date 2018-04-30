import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout'
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import {Switch} from 'react-router';
import './css/reset.css';
import  './css/timeline.css';
import  './css/login.css';
//iniciando modulo-04
// function verificaAutenticacao(nextState=null,Replace=null){
//   if(localStorage.getItem('auth-token') != null){
//     console.log(<App/>)  
//     return true
//   }
//   return null
// }

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={Login}/>,
            <Route path='/logout' component={Logout}/>
            {<Route exact path='/timeline' component={App}/>}
            {<Route exact path='/timeline/:login' component={App}/>}
            {/*!verificaAutenticacao() && <Redirect to="/?login=Voce nao está autorizado,ou sua sessao expirou!!"/>*/}
      </div>
    </Router>
,document.getElementById('root'));
