import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Header extends Component {

    //faz a busca no campo pesquisa!!!
    pesquisa(e){
      e.preventDefault()
      fetch(`http://localhost:8080/api/public/fotos/${this.loginPesquisado.value}`)
      .then(response => {
         if(response.ok){
             return response.json()
         }
         return Promise.reject(response.statusText);
      })
      .then(fotos => {
        PubSub.publish('timeline',fotos) //pega o retorno das pesquisas!!!
      })
      .catch(console.log)
    }


    render(){
        return (
        <header className="header container">
          <h1 className="header-logo">
            Instalura
          </h1>

          <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
            <input ref={(input) => this.loginPesquisado = input} type="text" name="search" placeholder="Pesquisa" className="header-busca-campo"/>
            <input type="submit" value="Buscar" className="header-busca-submit"/>
          </form>


          <nav>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="#">
                  ♡
                  {/*                 ♥ */}
                  {/* Quem deu like nas minhas fotos */}
                </a>
              </li>
            </ul>
          </nav>
        </header>            
        );
    }
}