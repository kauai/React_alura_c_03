import React, { Component } from 'react';
import { Redirect,Route } from 'react-router-dom';


class Logout extends Component {
    
    componentWillMount(){
       localStorage.removeItem('auth-token')
    }
   

    render() {
      return (
         <Redirect to='/'/>
      )
    }
}

export default Logout;