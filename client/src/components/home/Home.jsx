import Cards from "./Cards";
import styled from "styled-components";
import images from "../imgs/images";
import { useState, useEffect } from "react";
import {useSelector, useDispatch }  from "react-redux";
import {  filter_Actividad,filter_Continente, orden_AZ, orden_ZA, orden_Pobl_MAY, orden_Pobl_Menor ,loadActivity, getPaises } from '../../redux/actions';
import NavBar from "../nav/NavBar";
import NoPais from "../notFound/NoPais";
import "../nav/nav.css";
import "./home.css";
//import Filtros from "../filtro/filtros";

export default function Home(){
    const estado= useSelector(state=> state);
    const activArr= useSelector((state)=> state.actividades);
    const paisesArr=useSelector(store => store.allCountries); 
    const paises = useSelector(store=>store.paises); 
    const dispatch= useDispatch();

    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        loadActivity();
            !paises? dispatch(getPaises()):loadActivity(); 
    },[paises]);

    useEffect(() => {
        console.log(paises); 
    },[paises]);
    
    // function handle_filter_Continente(e){
    //     e.preventDefault();
    //     dispatch(filter_Continente(e.target.value));
    // }

    function filtrado(e) {
        e.preventDefault();
        if (e.target.name === 'continente') {
            setFilter('continente');
            dispatch(filter_Continente(e.target.value));
        }
        if (e.target.value === 'A-Z') {
            setFilter('a-z');
            dispatch(orden_AZ());
        }
        if (e.target.value === 'Z-A') {
            setFilter('z-a');
            console.log("llegó a la función filtrado");
            dispatch(orden_ZA());
        }
        if (e.target.value === 'filterPoblMay') {
            setFilter('pobla+');
            dispatch(orden_Pobl_MAY());
        }
        if (e.target.value === 'filterPoblMen') {
            setFilter('pob-');
            dispatch(orden_Pobl_Menor());
        }
        if (activArr?.includes(e.target.value)) {
            setFilter('actividad');
            filter_Actividad(e.target.value);
        }
    } //rgb(0, 36, 42, 0.8)

    const Fondo= styled.div`
    background-image: linear-gradient( 298deg , #cacece, #3383b8,rgb(0, 36, 42, 0.9) 50% );
    
    `;
    
    while(estado.error && paises.length===0 ){
        return( <NoPais/> )
    }

    return( 
        <Fondo>
            
            <form id="filtros">
        
        <div>
            <label id='iContinente' className="label"> Continente: </label>
            <select id='iContinente' defaultValue='API' name='continente' onChange={(e) => filtrado(e)} >
                <option value='API' > Todos </option>
                <option value='Africa' > Africa </option>
                <option value='Polar' > Antarctica </option>
                <option value='Asia' > Asia </option>
                <option value='Europe' > Europe </option>
                <option value='Americas' > America </option>
                <option value='Oceania' > Oceania </option>
                
            </select>
        </div>

        <div>
            <label id='idActivity' className="label"> Actividad Turistica: </label>
            <select id='idActivity' onChange={(e) => filtrado(e)} >            
            <option > -- </option>
                {/* {activArr?.map((act, i) => { return <option key={'ACT.'+ i} value={act} > {act} </option> })} */}
            </select>
        </div>

        <div>
            <label id='idAlfa' className="label" > Orden Alfabetico: </label>
            <select id='idAlfa' name='Alfa' onChange={(e) => filtrado(e)} >  
                <option > -- </option>
                <option value='A-Z' > A-Z </option>
                <option value='Z-A' > Z-A </option>
            </select>
        </div>

        <div>
            <label id='idPoblacion' className="label"> Poblacion: </label>
            <select id='idPoblacion' name='Poblacion' onChange={(e) => filtrado(e)} >            
                <option > -- </option>
                <option value='filterPoblMay' > Mayor </option>
                <option value='filterPoblMen' > Menor </option>
            </select>
            </div>
        
    </form>
        <div>
        <h2>.  Países del Mundo </h2>
        {estado.error && paises.length===0 && <NoPais/>}
        {paisesArr && filter === 'ALL'&& !paises && <Cards paises={paisesArr} />}
        {paises && filter === 'ALL'&& <Cards paises={paises} />}
        {filter ==='continente' && <Cards paises={paises} />}
        {filter === 'actividad' && <Cards paises={paises} />}
        {filter === 'a-z' && <Cards paises={paises} />}
        {filter === 'z-a' && <Cards paises={paises} />}
        {filter === 'pobla+' && <Cards paises={paises} />}
        {filter === 'pob-' && <Cards paises={paises} />}
        {filter === 'search' && <Cards paises={paises} />}
        
        </div>
        </Fondo>
    )
}