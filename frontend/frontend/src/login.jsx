import image1 from './assets/image1.png'
import { useNavigate } from 'react-router-dom';
import React,{useState} from 'react';
import axios from 'axios';
function Login(){
    const[identifier,setidentifier]=useState('');
    const[PASSWORD,setPASSWORD]=useState('');
    const[error,seterror]=useState({});
    const[showcase,setshowcase]=useState(false);
    const[sforgot,setsforgot]=useState(false);
    const navigate=useNavigate();

    function forgot(){
        setsforgot(!sforgot);
        if(sforgot==true){
            navigate("/forgot");
        }
    }


    async function loge(){
        const newerror={}
        if(!identifier){
            newerror.identifier=true;
        }
        if(!PASSWORD){
            newerror.PASSWORD=true;
        }
        seterror(newerror);
        if (Object.keys(newerror).length > 0) {
            return; 
        }
        else{
            try{
                const payload={
                    password:PASSWORD,
                    identifier:identifier,
                }
                const res=await axios.post('${import.meta.env.VITE_API_URL}/comparision',payload);
                if(res.data.message==="Logged in HR successfully"){
                    setshowcase(!showcase);
                } 
                if(res.data.message==="Logged in employee successfully"){
                    navigate("/employee")
                }
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


    }
    return(
        <>
        <div className="bor">
            <img  onClick={()=>navigate('/')}src={image1} alt="imagee"/>
            <div className="border">
                <input className={error.identifier? 'right':""} placeholder="Enter Email OR PhoneNumber" type="text" onChange={(e)=>setidentifier(e.target.value)}/>
                <input className={error.PASSWORD? 'right':""} placeholder="Enter password" type="password" onChange={(e)=>setPASSWORD(e.target.value)}/>
                <p onClick={forgot}>forgotpassword</p>
                <button onClick={loge} >Login</button>
            </div>
        </div>
        {showcase && (
            <div className='boto'>
                 <button onClick={()=>navigate("/hr")} >Login</button>
                 <button onClick={()=>navigate("/createaccountemp")} >Createaccount</button>
            </div>
            )
        }
        </>
    )
}
export default Login;