import PubSub from 'pubsub-js'

export default class TimelineApi{

    static lista(urlPerfil){
        return dispatch => {
            fetch(urlPerfil)
            .then(item => {
                if(item.ok) return item.json()
                return Promise.reject("Erro na requisiçao: erro => " + item.status);
            }).then(fotos => {
                dispatch({type:'LISTAGEM',fotos})
                return fotos
            })
            .catch(error => {
                console.log(error)
            })
       }
    }



    static comenta(fotoId,comentario){
        return dispatch => {
            const requestInfo = {
                method:'POST',
                body:JSON.stringify({texto:comentario}),
                headers:new Headers({
                'Content-type':'application/json'
                })
            }
            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,requestInfo)
            .then(response => {
                if(response.ok){
                    return response.json()
                }
                     return Promise.reject(response)
            }).then(novoComentarios => {
                dispatch({type:'COMENTARIO',fotoId,novoComentarios})
                return novoComentarios
            }).catch(error => {
                console.log(error)
            })
        }
    }

    

    static like(fotoId){
        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,{method:'POST'})
            .then(response => {
            if(response.ok){
                return response.json()
            }
                return new Promise.reject(response)
            }).then(liker => {
                dispatch({type:'LIKE',fotoId,liker})
                return liker
            }).catch(error => {
                console.log(error)
            })
        }
    }
    
}