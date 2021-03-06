const axios = require('axios');
const { Country } = require('../db');

function guardarPaises(array){
    array?.map( el => {
        return Country.create({...el});
    });
    return console.log("ok");
} 


function obtenerPaises(req, res){
    let status=200;
    const listPaises= axios.get("http://restcountries.com/v2/all")
    
    .then(paises  =>  paises.data?.map(el=> {
            const pais= { 
                name: el.name,
                id: el.alpha3Code,
                flag: el.flag,
                region: el.region,
                capital:  el.capital,
                subregion: el.subregion,
                area:  el.area,
                population:  el.population,
                lat: el.latlng,
                long: el.latlng,
            }
            if (pais.name=== "United States Minor Outlying Islands"){
                pais.lat=28.21;
                pais.long=-177.36;
                pais.capital="Isla Wake";
                return pais;
            }
            for (let key in pais){
                if (!pais[key]) pais[key]= key;
                
            }
            if (pais["lat"]&& Array.isArray(pais.lat)){
                pais.lat=pais["lat"][0];
            }
            if (pais["long"]&& Array.isArray(pais.long)){
                pais.long=pais["long"][1];
            }
            if (typeof pais.population === 'string'){
                pais.population=0;
            }
            return pais;
        }))
    .then(lista=> {
        console.log("se obtuvieron los paises de la api");
        guardarPaises(lista);
        console.log("Se guardaron los países en la base de datos");
        return status;
    })
    .catch(err=> {
        console.log("no se pudo cargar la lista de paises");
        console.log(err);
        status=404;
        return status });
    
    return listPaises;    
}
module.exports= obtenerPaises;