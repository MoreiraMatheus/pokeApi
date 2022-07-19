const URL_DADOS = 'https://pokeapi.co/api/v2/pokemon/'
const BT_BUSCA_POKE = document.querySelector('button')
const POKEDEX = document.getElementById('pokedex')
const NOME_ID = document.getElementById('nome-e-id')
const MOSTRA_INFOS = document.getElementById('dados-poke')

BT_BUSCA_POKE.addEventListener('click', () => {
    const ID_POKE = document.querySelector('input').value
    if(ID_POKE == '' || ID_POKE <= 0){
        window.alert('informe um id válido')
    }
    else{
        NOME_ID.innerHTML = ''
        MOSTRA_INFOS.innerHTML = ''
        const DADOS_DO_POKEMON = consultaApiPoke(ID_POKE)
        
        DADOS_DO_POKEMON.then(res => {
            NOME_ID.appendChild(criaHtml('span', res.name))
            NOME_ID.appendChild(criaHtml('span', res.id))

            const IMG_NAO_ENCONTRADA = '<img src="src/img/ponto-de-interrogacao.png" alt="foto não encontrada">'
            const IMG = res.sprites.front_default
            // const IMG_SHINY = res.sprites.front_shiny
            !IMG ? MOSTRA_INFOS.innerHTML += IMG_NAO_ENCONTRADA : MOSTRA_INFOS.innerHTML += `<img src="${IMG}" alt="imagem-pokemon">`
            // !IMG_SHINY ? MOSTRA_INFOS.innerHTML += IMG_NAO_ENCONTRADA : MOSTRA_INFOS.innerHTML += `<img src="${IMG_SHINY}" alt="foto não encontrada">`
            
            const COMPRIMENTO = res.types.length
            for(let i = 0; i <= COMPRIMENTO -1 ; i++){
                MOSTRA_INFOS.appendChild(criaHtml('p', res.types[i].type.name))
            }
            console.log(res)
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