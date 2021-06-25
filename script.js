
 
// iniciando os inputs 
const main_temp = document.querySelector(".celsius");
const cidade = document.querySelector(".cidade")
const condicao = document.querySelector(".condicao")
const min_temp = document.querySelector(".min-tem")
const max_temp = document.querySelector(".max-tem")
const hora_local = document.querySelector(".hora-local")
const icone = document.querySelector(".icon img")
const btn = document.querySelector('btn')
const input_text = document.querySelector('input')
const diaria = document.querySelector('.media-dias')
const api_key = "40d47c24"


// função que vai renderizar os dados no html
let render = (data) => {
    main_temp.innerHTML = data.temp + "° C"
    cidade.innerHTML = data.city
    condicao.innerHTML = data.description
    min_temp.innerHTML = data.forecast[0].min + "° C"
    max_temp.innerHTML = data.forecast[0].max + "° C"
    hora_local.innerHTML = `Horário local: ${data.time}`
    icone.src = `http://assets.api.hgbrasil.com/weather/images/${data.img_id}.png`
    
}

function buscarDados(lat, long) {
    const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${api_key}&lat=${lat}&lon=${long}`;

    fetch(url).then(Response => {
        return Response.json()
            }).then(api_data =>{
                render(api_data.results)
                }).catch(error => console.log(error))
}
// buscando a geolocalização pela api do Browser 
navigator.geolocation.getCurrentPosition((position)=> {
    lat = position.coords.latitude
     long = position.coords.longitude
     buscarDados(lat, long)
 })
 // Busando uma cidade pelo input de texto
btn.addEventListener('click', () => {
    let url = `https://api.hgbrasil.com/weather?format=json-cors&key=${api_key}&city_name=${input_text.value}`
    console.log(url)
    fetch(url)
    .then(Response => {
        return Response.json()
    })
    .then(api_data => {
        render(api_data.results) 
    })
})
