const URL_DADOS = 'https://pokeapi.co/api/v2/pokemon/'
const BT_BUSCA_POKE = document.querySelector('button')
const POKEDEX = document.getElementById('pokedex')
const NOME_ID = document.getElementById('nome-e-id')
const IMAGE_POKE = document.getElementById('image-poke')
const TIPOS = document.getElementById('tipos-do-poke')

BT_BUSCA_POKE.addEventListener('click', mostraPoke)


async function mostraPoke(){
    const ID_POKE = document.querySelector('input').value
    if(!ID_POKE || Number(ID_POKE) <= 0){
        window.alert('Digite valores válidos para busca')
    }
    else{
        const DADOS_DO_POKEMON = consultaApiPoke(ID_POKE)
        DADOS_DO_POKEMON.then(res => {
            NOME_ID.innerHTML = ''
            IMAGE_POKE.innerHTML = ''
            TIPOS.innerHTML = ''

            NOME_ID.appendChild(criaHtml('span', String(res.name).toLocaleUpperCase()))
            NOME_ID.appendChild(criaHtml('span', '#' + tratamentoID(res.id)))

            IMAGE_POKE.innerHTML += `<img src="${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID_POKE}.png`}"alt="imagem-não-encontrada">`
            IMAGE_POKE.innerHTML += `<img src="${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${ID_POKE}.png`}"alt="imagem-não-encontrada">`

            const FT_SHINY = IMAGE_POKE.querySelectorAll('img')[1]
            FT_SHINY.classList.add('esconde-ft')
            const BT_PARA_SHINY = document.createElement('button')
            BT_PARA_SHINY.setAttribute('onclick', `mostraShiny()`)
            BT_PARA_SHINY.innerHTML += '<img src="src/img/stars.png" alt="">'
            IMAGE_POKE.appendChild(BT_PARA_SHINY)
            
            const COMPRIMENTO = res.types.length
            for(let i = 0; i <= COMPRIMENTO -1 ; i++){
                TIPOS.appendChild(criaHtml('p', res.types[i].type.name))
            }
        })

        DADOS_DO_POKEMON.catch(() => {
            window.alert('pokemon não encontrado')
        })
    }
}

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

function mostraShiny(){
    const FT_NORMAL = IMAGE_POKE.querySelectorAll('img')[0]
    const FT_SHINY = IMAGE_POKE.querySelectorAll('img')[1]
    FT_NORMAL.classList.toggle('esconde-ft')
    FT_SHINY.classList.toggle('esconde-ft')
}

mostraPoke()
document.querySelector('input').value = ''