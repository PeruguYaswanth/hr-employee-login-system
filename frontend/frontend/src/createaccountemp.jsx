import React from 'react'
import {useState} from 'react'
import image1 from './assets/image1.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function Createaccountemp(){
    const[empfirstname,setempfirstname]=useState("");
    const[emplastname,setemplastname]=useState("");
    const[empemail,setempemail]=useState("");
    const[empphonenumber,setempphonenumber]=useState("");
    const[emppassword,setemppassword]=useState("");
    const[error,seterror]=useState({});
    const navigate=useNavigate();
    async function submitting(){
        const newerror={}
        if(!empfirstname){
            newerror.empfirstname=true;
        }
        if(!emplastname){
            newerror.emplastname=true;
        }
        if(!empemail){
            newerror.empemail=true;
        }
        if(!empphonenumber){
            newerror.empphonenumber=true;
        }
        if(!emppassword){
            newerror.emppassword=true;
        }
        seterror(newerror);
        if(Object.keys(newerror).length>0){
            return;
        }
        else{
            try{
                const payload={
                    empfirstname:empfirstname,
                    emplastname:emplastname,
                    empemail:empemail,
                    empphonenumber:empphonenumber,
                    emppassword:emppassword,

                }
            const res=await axios.post("${import.meta.env.VITE_API_URL}/submitting",payload);
            alert(res.data.message)
            }
            catch(error){

            }
        }

    }

    return(
        <>
        <div className="top-bar">
            <img onClick={()=>navigate('/login')}src={image1} alt="logo"/>
        </div>
        <div className="crt-account">
            <input className={error.empfirstname? "s1":""} value={empfirstname} placeholder="Enter the firstName" type="text" onChange={(e)=>setempfirstname(e.target.value)}/>
            <input  className={error.emplastname? "s1":""}  value={emplastname} placeholder="Enter the lastname" type="text" onChange={(e)=>setemplastname(e.target.value)}/>
            <input   className={error.empemail? "s1":""}  value={empemail}placeholder="Enter the email" type="text" onChange={(e)=>setempemail(e.target.value)}/>
            <input   className={error.empphonenumber? "s1":""} value={empphonenumber} placeholder="Enter the phonenumber" type="text" onChange={(e)=>setempphonenumber(e.target.value)}/>
            <input   className={error.emppassword? "s1":""} value={emppassword} placeholder="Enter the password" type="password" onChange={(e)=>setemppassword(e.target.value)}/>
            <button onClick={submitting}>Createaccount</button>
        </div>

        </>
    )
}
export default Createaccountemp;