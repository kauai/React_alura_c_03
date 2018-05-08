function trocaFoto(lista,fotoId,callbackAtualizaPropriedades){
    
    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
    const novasPropriedades = callbackAtualizaPropriedades(fotoEstadoAntigo)

    const fotoEstadoNovo = Object.assign({},fotoEstadoAntigo,novasPropriedades);
    const indiceDaLista = lista.findIndex(foto => foto.id === fotoId);

    const novaLista = lista.set(indiceDaLista,fotoEstadoNovo);
}

//REDUCER
export function timeline(state = new List(),action){

if(action.type == 'LISTAGEM'){
    console.log("Entrou na listagem!!!")
    console.log(state)
    return new List(action.fotos)
}


if(action.type === 'COMENTARIO'){
    return trocaFoto(state,action.fotoId,fotoAntiga => {
        const novosComentarios = fotoAntiga.comentarios.concat(action.novoComentario)
        return {comentarios:novosComentarios}
    })
}


if(action.type === 'LIKE'){
    return trocaFoto(state,action.fotoId,fotoEstadoAntigo => {
        const likeada = !fotoEstadoAntigo.likeada
        const possivelLiker = fotoEstadoAntigo.likers.find(likerAtual => likerAtual.login === action.liker.login)
     
        let novosLikers;
        if(possivelLiker === undefined){
            novosLikers = fotoEstadoAntigo.likers.concat(action.liker)
            console.log(novosLikers)
        }else{
            novosLikers = fotoEstadoAntigo.likers.filter(likerAtual => likerAtual.login != action.liker.login)
        }

        const novosComentarios = fotoEstadoAntigo.comentarios.concat(action.novoComentario)
        return {likeada,likers:novosLikers}
    })
}