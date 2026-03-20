import React from 'react'
import  {useNavigate} from 'react-router-dom';
import image1 from './assets/image1.png';
import image7 from './assets/image7.png';
import {useState} from 'react';
import axios from 'axios'
function Employee(){
    const[isopen,setIsopen]=useState(false);
    const[result,setresult]=useState([]);
    const navigate=useNavigate();
    function getting(){
        setIsopen(!isopen);
        show_getting();

    }
    async function show_getting(){
        const res=await axios.get('http://localhost:8000/users')
        setresult(res.data.user);
    }
    return(
        <>
        <div className='background'>
            <div className="body1">
                <img className='jjj' onClick={()=>navigate('/')} src={image1} alt='companylogo'/>
                <img className='iii' onClick={getting} src={image7} alt='login-logo'/>
                {result.map((user,index)=>(
                    <div key={index}>
                <p className='firstname'>{user.empfirstname}</p>
                <p className='lastname'>{user.emplastname}</p>
                </div>
                ))}
                <p className="Name">NAVA SOFTWARE SOLUTIONS</p>
    
                <div className="emp-con">
                    <ul>
                    <li> <a href="#" onClick={()=>navigate('/homepage')}>Home Page</a> </li>
                    <li><a href="#"onClick={()=>navigate('/createaccount')}>Create Account</a></li>
                    <li><a href="#"onClick={()=>navigate('/status')}>Status</a></li>
                    </ul>
                </div>
            </div>
         </div>
        {isopen &&(
            <div className='is-open'>
                {result.map((user,index)=>(
                    <div key={index}>
                        <input value={user.empfirstname}/>
                        <input value={user.emplastname}/>
                        <input value={user.identifier}/>
                    </div>
                ))}

            </div>
        )}
        <div className="body2">
            <p>@navasoftwaresolutions</p>
        </div>
        </>
    );
}
export default Employee;