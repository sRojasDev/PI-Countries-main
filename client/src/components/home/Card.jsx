
import styled from "styled-components";
import {CardLink} from "../nav/styleNav";
import { useDispatch } from "react-redux";
import { getCountryById } from "../../redux/actions";

export default function Card({name, flag, region, id}){

    const dispatch = useDispatch();

    function handleClick() {
        dispatch(getCountryById(id));
    }


    const MyImg=styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
    margin:0px;
    `
    const Targeta= styled.div`
    display:flex;
    margin: 1em;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    text-transform: capitalize;
    padding-bottom: 5%;
    background: rgb(86.7, 86.7, 86.7, 0.88);
    border-radius:2px;
    padding:2%;

    &:hover{
        transition: 0.2s;
        background: rgba(219, 184, 94, 0.9);
        color: #00242a;
        
        h3{
            font-weight:500;
        }
    }
    `;
    //background: rgba(248, 182, 13, 0.8);
   //rgba(248, 182, 13, 0.74);
    return( 
        
        <Targeta key={id}>
            <CardLink to={`/detail/${id}`} onClick={()=>handleClick}>
            <h3> {name}</h3> <br/>
                <MyImg src={flag}  alt={""} width="100%" /> <br/>
                <p>{region}</p>
            </CardLink>
        </Targeta>
        
    )
}