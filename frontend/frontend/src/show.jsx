import React,{useState} from 'react';
import axios from 'axios';
import image3 from './assets/image3.png'
import image1 from './assets/image1.png'
import  {useNavigate} from 'react-router-dom';



function Show(){
    const[Firstname,setFirstname]=useState("");
    const[Lastname,setLastname]=useState("");
    const[Email,setEmail]=useState("");
    const[phoneNumber,setPhonenumber]=useState("");
    const[password,setpassword]=useState("");
    const[conformpassword,setconformpassword]=useState("");
    const[errors,seterrors]=useState({})
    const navigate=useNavigate()
    async function submit(){
        const newerrors={}
        if(!Firstname){
            newerrors.Firstname=true;
        }
        if(!Lastname){
            newerrors.Lastname=true;
        }
        if(!Email){
            newerrors.Email=true;
        }
        if(!phoneNumber){
            newerrors.phoneNumber=true;
        }
        if(!password){
            newerrors.password=true;
        }
        if(!conformpassword){
            newerrors.conformpassword=true;
        }
        seterrors(newerrors);

        if (Object.keys(newerrors).length > 0) {
            return; 
        }
        try{
            const payload={
                Firstname:Firstname,
                Lastname:Lastname,
                Email:Email,
                phoneNumber:phoneNumber,
                password:password,
                confirmpassword:conformpassword,

            }
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/data`,
                payload
                );
            alert("signup succesfully");
            console.log(res.data);
            }
            catch(error){
                console.log(error);
                alert('signup failed');
            }
        }

    
        


    return(
        <>
        <div className='top'>
            <img  onClick={()=>navigate('/')}src={image1} alt="imagee"/>
        </div>
        <div className='img-1'>
            <img src={image3} alt="imagee"/>
        </div>
        <div className='show1'>
            <input className={errors.Firstname? "correct":""} placeholder='please enter Firstname' type='text' onChange={(e)=>setFirstname(e.target.value)} />
            <input  className={errors.Lastname? "correct":""} placeholder='please enter Lastname' type='text' onChange={(e)=>setLastname(e.target.value)}/>
            <input  className={errors.Email? "correct":""} placeholder='please enter Email' type='text' onChange={(e)=>setEmail(e.target.value)}/>
            <input  className={errors.phoneNumber? "correct":""} placeholder='please enter PhoneNumber' type='text' onChange={(e)=>setPhonenumber(e.target.value)}/>
            <input  className={errors.password? "correct":""} placeholder='please enter Password' type='password' onChange={(e)=>setpassword(e.target.value)}/>
            <input   className={errors.conformpassword? "correct":""} placeholder='please enter ConfirmPassword' type='password' onChange={(e)=>setconformpassword(e.target.value)}/>
            <button onClick={submit}>SignUp</button>
        </div>
        </>
    );
}

export default Show;