import { useParams } from "react-router-dom";

export default function WithoutState(){
    const {id} =useParams();
    return (
        <div style={{textAlign: "center", marginTop:"10rem", fontSize:"2rem"}}>{`Only the id is accessible here because it is the value being passed: ${id}`}</div>
    )
}