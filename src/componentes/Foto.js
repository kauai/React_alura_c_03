import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Pubsub from 'pubsub-js'
import Header from './Header';


class FotoAtualizacoes extends Component {


  //essa funçao agora so chama a logica do like,passando o id!!!!
  like(e){
    e.preventDefault()
    this.props.like(this.props.foto.id)
  }


  comenta(e){
     e.preventDefault()
     this.props.comenta(this.props.foto.id,this.comentario.value)
     //console.log(this.comentario.value)
  }


    render(){
     
        return (
            <section className="fotoAtualizacoes">
              <a onClick={this.like.bind(this)} href="#" className={!this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo':'fotoAtualizacoes-like'}>Likar</a>
              <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" ref={(input) => this.comentario = input}/>
                <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
              </form>
            </section>            
        );
    }
}



class FotoInfo extends Component {
  // constructor(props){
  //    super(props)
  //   //  this.state = {
  //   //      likers:this.props.fotos.likers,
  //   //      comentarios:this.props.fotos.comentarios
  //   //     }
  // }

    render(){
       const {like,comentario,comentarios} = this.props.fotos
        
        return (
            <div className="foto-info">
              <div className="foto-info-likes">
                  {this.props.fotos.likers
                  .map(item => 
                    <Link key={item.login} to={`/timeline/${item.login}`}>
                  {item.login},</Link>)} -Curtiram
             </div>

              <p className="foto-info-legenda">
                <a className="foto-info-autor">autor </a>
                {comentario}
              </p>

              <ul className="foto-info-comentarios">

               {this.props.fotos.comentarios.map(item =>  (
                 <li key={item.id} className="comentario">
                    <Link to={`/timeline/${item.login}`} className="foto-info-autor">{item.login}</Link>
                    {item.texto}
               </li>))}
              </ul>
            </div>            
        );
    }
}



class FotoHeader extends Component {
    render(){
      const {loginUsuario,horario,urlPerfil} = this.props.fotos
      
      return (
            <header className="foto-header">
              <figure className="foto-usuario">
                <img src={urlPerfil} alt="foto do usuario"/>
                <figcaption className="foto-usuario">
                  <Link to={`/timeline/${loginUsuario}`}>{loginUsuario}</Link>  
                </figcaption>
              </figure>
              <time className="foto-data">{horario}</time>
            </header>            
        );
    }
}



export default class FotoItem extends Component {
    render(){
      {this.props.foto}
        return (
          <div className="foto">
            <FotoHeader fotos={this.props.foto}/>
            <img alt="foto" className="foto-src" src={this.props.foto.urlFoto}/>
            <FotoInfo fotos={this.props.foto}/>
            <FotoAtualizacoes comenta={this.props.comenta} foto={this.props.foto} like={this.props.like}/>
          </div>            
        );
    }
}