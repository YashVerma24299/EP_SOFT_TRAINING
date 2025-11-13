import {useParams, useLocation} from 'react-router-dom'


export default function WithState(){
  const {id} = useParams();
  const {state} = useLocation();
  return (
    <div style={{ textAlign: "center", marginTop: "10rem" }}>
      <div  style={{ fontSize: "2rem", marginBottom: "1rem" }}>We can access multiple thing...</div>
      <p style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>Id: {`${id}`}</p>
      <p style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>Title: {state.title}</p>
      <p style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>Description: {state.desc}</p>
      <p style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>Rating: {state.rating}</p>
    </div>
  )
}