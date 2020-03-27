const btn_clima = document.getElementById("btn_clima");
const entrada_ciudad = document.getElementById("entrada_ciudad");
const resultadoMostrar = document.getElementById("resultado");

btn_clima.onclick=function(){
  const ciudad = entrada_ciudad.value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=f7fb5b7846df47ac91e3dc13bd859468&lang=es`;
  fetch(url).then(response=>{
    response.json().then(json=>{
      let data=json;
      let salida=respuestaFormato(data);
      resultadoMostrar.innerHTML=salida;
    });
  });
}

function respuestaFormato(data){
  let condiciones="";
  if(data.weather.length>1){
    for(var i=0;i<data.weather.length;i++){
      condiciones+= data.weather[i].description;
      if(i!=(data.weather.length-1)){
        condiciones+=" y ";
      }
    }
  }else{
    condiciones+=data.weather[0].description;
  }
  const gif = `https://api.tenor.com/v1/search?key=L7STWEJSSYWS&q=${condiciones}`;
  console.log(gif);
  fetch(gif).then((result) => {

    var result_json = result.json();
    result_json.then((json) => {
      var results = json.results;
      results.forEach((item, i) => {
        var url_tenor = item.url;
        var url_gif = item.media[0].gif.url;
        console.log(url_gif);
      });
    });
  })

  let salida = `<p><strong>Condiciones actuales en ${data.name}</strong></p>
  <p><strong>Temperatura: </strong>${Math.round(data.main.temp)} ºc</p>
  <p><strong>Sensasion termica: </strong>${data.main.feels_like} ºc</p>
  <p><strong>Temperatura minima : </strong>${Math.round(data.main.temp_min)} ºc</p>
  <p><strong>Temperatura maxima : </strong>${Math.round(data.main.temp_max)} ºc</p>
  <p><strong>Humedad: </strong>${data.main.humidity} %</p>
  <p><strong>Presion: </strong>${data.main.pressure} mb</p>
  <p><strong>Viento: </strong>${data.wind.speed} m/s</p>
  <p><strong>${condiciones}</strong></p>`;
  return(salida);
}
