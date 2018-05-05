import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import { createStore } from 'redux';
import { timeline } from './reducers/timeline'

const store = createStore(timeline)


class App extends Component {
  constructor(){
    super()
     this.verificaAutenticacao = this.verificaAutenticacao.bind(this);
  }

   verificaAutenticacao(){
    const result = Boolean(Object.values(this.props.match.params)[0])
    //if((result == false) && (localStorage.getItem('auth-token') != null)){  
    if(result == false){
        if((result == false) && (localStorage.getItem('auth-token') != null)){  
          return true
        }
    }else if(result == true){
        return true
    }
    return null
  }

  render() {
    
    return (
      <div id="root">
       {/*console.log(this.props)*/}
       {!this.verificaAutenticacao() && <Redirect exact to="/"/>}
      <div className="main">
         <Header/>
         <Timeline login={this.props.match.params.login} store={store}/>
      </div>
     </div>
    )
  }
}

export default App;
