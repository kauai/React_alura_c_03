//REDUCER
export function timeline(state = [],action){
    if(action.type == 'LISTAGEM'){
        console.log("Entrou na listagem!!!")
        return action.fotos
    }
    return state
 }