const URL_DADOS = 'https://pokeapi.co/api/v2/pokemon/'
const BT_BUSCA_POKE = document.querySelector('button')
const RESULT = document.getElementById('resultado')

BT_BUSCA_POKE.addEventListener('click', () => {
    const ID_POKE = document.querySelector('input').value
    if(ID_POKE == '' || ID_POKE <= 0){
        window.alert('informe um id válido')
    }
    else{
        RESULT.innerHTML = ''
        const DADOS_DO_POKEMON = consultaApiPoke(ID_POKE, URL_DADOS)
        DADOS_DO_POKEMON.then(res => {
            RESULT.innerText += res.name + '\n'
        })
        DADOS_DO_POKEMON.then(res => {
            RESULT.innerText += res.id + '\n'
        })
        DADOS_DO_POKEMON.then(res => {
            const COMPRIMENTO = res.types.length
            for(let i = 0; i <= COMPRIMENTO -1 ; i++){
                RESULT.innerText += res.types[i].type.name + '\n'
            }
        })
        // pegar os sprites do pokemon
        DADOS_DO_POKEMON.then(res => {
            RESULT.innerHTML += `<img src="${res.sprites.front_default}" alt="foto não encontrada">`
        })
        DADOS_DO_POKEMON.then(res => {
            RESULT.innerHTML += `<img src="${res.sprites.front_shiny}" alt="foto não encontrada">`
        })
    }
})

// faz requisição direto da API
async function consultaApiPoke(id, url){
    const URL_COMPLETA = await fetch(url + id + '/')
    const DADOS_JSON = await URL_COMPLETA.json()
    return await DADOS_JSON
}