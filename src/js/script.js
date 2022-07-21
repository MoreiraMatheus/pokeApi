const URL_DADOS = 'https://pokeapi.co/api/v2/pokemon/'
const BT_BUSCA_POKE = document.querySelector('button')
const POKEDEX = document.getElementById('pokedex')
const NOME_ID = document.getElementById('nome-e-id')
const IMAGE_POKE = document.getElementById('image-poke')
const TIPOS = document.getElementById('tipos-do-poke')
let isShiny = false

BT_BUSCA_POKE.addEventListener('click', () => {
    const ID_POKE = document.querySelector('input').value
    if(!ID_POKE || Number(ID_POKE) <= 0){
        window.alert('Digite valores válidos para busca')
    }
    else{
        const DADOS_DO_POKEMON = consultaApiPoke(ID_POKE)
        DADOS_DO_POKEMON.then(res => {
            reset()
            NOME_ID.appendChild(criaHtml('span', String(res.name).toLocaleUpperCase()))
            NOME_ID.appendChild(criaHtml('span', '#' + tratamentoID(res.id)))
            
            const IMG_NAO_ENCONTRADA = '<img src="src/img/ponto-de-interrogacao.png" alt="foto não encontrada">'
            const IMG_NORMAL = res.sprites.front_default
            const IMG_SHINY = res.sprites.front_shiny
            //arrumar uma forma de trocar da foto normal pra foto shiny
            !IMG_NORMAL || !IMG_SHINY ? IMAGE_POKE.innerHTML += IMG_NAO_ENCONTRADA : IMAGE_POKE.innerHTML += `<img src="${IMG_NORMAL}" alt="imagem-pokemon">`
            
            const COMPRIMENTO = res.types.length
            for(let i = 0; i <= COMPRIMENTO -1 ; i++){
                TIPOS.appendChild(criaHtml('p', res.types[i].type.name))
            }
        })

        DADOS_DO_POKEMON.catch(() => {
            window.alert('pokemon não encontrado')
        })
    }
})

async function consultaApiPoke(id){
    const URL_COMPLETA = await fetch(URL_DADOS + id + '/')
    const DADOS_JSON = await URL_COMPLETA.json()
    return await DADOS_JSON
}

function criaHtml(elemento, conteudo=''){
    const ELEMENTO = document.createElement(elemento)
    if(conteudo != ''){
        ELEMENTO.innerText = conteudo
    }
    return ELEMENTO
}

function tratamentoID(id){
    const ID = String(id)
    if(ID.length == 3){
        return ID
    }
    else if(ID.length == 2){
        return '0' + ID
    }
    else{
        return '00' + ID
    }
}

//função que talvez não seja usada
function mostraShiny(normal=null, shiny=null){
    if(normal == null || shiny == null){
        window.alert('em desenvolvimento')
    }
    else {
        if(isShiny){
            window.alert('vamos ver sua versão shiny')
            IMAGE_POKE.innerHTML += `<img src="${shiny}" alt="imagem-pokemon">`
        }
        else{
            window.alert('vamos ver sua versão normal')
            IMAGE_POKE.innerHTML += `<img src="${normal}" alt="imagem-pokemon">`
        }
        isShiny ? isShiny = false : isShiny = true
    }
}

function reset(){
    NOME_ID.innerHTML = ''
    IMAGE_POKE.innerHTML = ''
    const BT_PARA_SHINY = document.createElement('button')
    BT_PARA_SHINY.innerText = 'Shiny'
    BT_PARA_SHINY.setAttribute('onclick', `mostraShiny()`)
    IMAGE_POKE.appendChild(BT_PARA_SHINY)
    TIPOS.innerHTML = ''
}