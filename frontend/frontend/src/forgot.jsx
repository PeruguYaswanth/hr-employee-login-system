import React,{useState} from 'react';
import image1 from './assets/image1.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Forgot(){
    const navigate=useNavigate();
    const[forgotpass,setforgotpass]=useState("");
    async function remember(){
            try {
            const payload ={
                forgotpass:forgotpass,

            }
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/comparisionpass",payload);
            alert(res.data.password);
        }
        catch (error) {
            if (error.response) {
                alert(error.response.data.detail);
            }             
            else {
                alert("Server not reachable. Please try again later.");
                console.error(error);
            }
        }
    }
    return(
        <>
        <div  className="remember1">
        <div className="remember">
             <img onClick={()=>navigate("/login")}src={image1} alt="logo"/>
            <input placeholder="please enter the PhoneNUmber OR Email" type="text"onChange={(e)=>setforgotpass(e.target.value)}/>
            <button onClick={remember}>Continue</button>
        </div>
        </div>
        </>
    )
}
export default Forgot;