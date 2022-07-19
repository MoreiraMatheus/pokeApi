const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
const BT_BUSCA_POKE = document.querySelector('button')

BT_BUSCA_POKE.addEventListener('click', () => {
    const ID_POKE = document.querySelector('input').value
    !ID_POKE ? window.alert('informe o id do pokemon') : console.log(`valor: ${ID_POKE}`)
    tratamentoDadosPoke(consultaDadosPoke(ID_POKE))
})

async function consultaDadosPoke(id){
    if(!id){
        console.log('id não informado')
    }
    const DADOS = await fetch(BASE_URL + id + '/')
    const DADOS_JSON = await DADOS.json()
    return await DADOS_JSON
}

async function tratamentoDadosPoke(promessa){
   promessa.then(res => {
    console.log(res.name)
    console.log(res.id)
    // console.log(res.types[1].type.name)
    for(let i = 0; i <= res.types.length; i++){
        console.log(res.types[i].type.name)
    }
   })
}