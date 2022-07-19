const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
const BT_BUSCA_POKE = document.querySelector('button')
const RESULT = document.getElementById('resultado')

BT_BUSCA_POKE.addEventListener('click', () => {
    const ID_POKE = document.querySelector('input').value
    if(!ID_POKE){
        window.alert('informe o id do pokemon')
    }
    else{
        const DADOS_DA_API = consultaDadosPoke(ID_POKE) 
        DADOS_DA_API.then(res => {
            RESULT.innerText += res.name + '\n'
        })
        DADOS_DA_API.then(res => {
            RESULT.innerText += res.id + '\n'
        })
        DADOS_DA_API.then(res => {
            const COMPRIMENTO = res.types.length
            // let tiposPoke = []
            for(let i = 0; i <= COMPRIMENTO -1 ; i++){
                RESULT.innerText += res.types[i].type.name + '\n'
            }
        })
    }
})

// faz requisição direto da API
async function consultaDadosPoke(id){
    const URL_COMPLETA = await fetch(BASE_URL + id + '/')
    const DADOS_JSON = await URL_COMPLETA.json()
    return await DADOS_JSON
}