import { List } from 'immutable'


//REDUCER
export function timeline(state = new List(),action){

    if(action.type == 'LISTAGEM'){
        console.log("Entrou na listagem!!!")
        return new List(action.fotos)
    }
    

    if(action.type === 'COMENTARIO'){
        const fotoId = action.fotoId
        const novoComentarios = action.novoComentario

        const fotoEstadoAntigo = state.find(foto => foto.id === fotoId)
        const novosComentarios = fotoEstadoAntigo.comentarios.concat(novoComentarios)

        const fotoEstadoNovo = Object.assign({},fotoEstadoAntigo,{comentarios:novosComentarios})

        const indiceDaLista = state.findIndex(foto => foto.id === action.fotoId);
        const novaLista = state.set(indiceDaLista,fotoEstadoNovo);
    
        return novaLista;
    }
 
    
    if(action.type === 'LIKE'){
        const fotoAchada = state.find(foto => foto.id === action.fotoId)
        fotoAchada.likeada = !fotoAchada.likeada
        const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === action.liker.login)
     
       if(possivelLiker === undefined){
           fotoAchada.likers.push(action.liker)
       }else{
           const unLiker = fotoAchada.likers.filter(likerAtual => likerAtual.login != action.liker.login)
           fotoAchada.likers  = unLiker
       }
       return state
    }


 }