import PubSub from 'pubsub-js'

export default class logicaTimeline{

    constructor(fotos){
        this.fotos = fotos
    }

    like(fotoId){
        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method:'POST'})
        .then(response => {
          if(response.ok){
            return response.json()
          }
          return new Promise.reject(response)
        }).then(liker => {
           console.log(this.fotos,liker)
             const fotoAchada = this.fotos.find(foto => foto.id === fotoId)
             //console.log(fotoAchada)
              fotoAchada.likeada = !fotoAchada.likeada
              const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login)
            // console.log(possivelLiker)
             if(possivelLiker === undefined){
                 fotoAchada.likers.push(liker)
             }else{
                 const unLiker = fotoAchada.likers.filter(likerAtual => likerAtual.login != liker.login)
                 fotoAchada.likers  = unLiker
             }
                 PubSub.publish('timeline',this.fotos)
         }).catch(error => {
            console.log(error)
        })
    }
}