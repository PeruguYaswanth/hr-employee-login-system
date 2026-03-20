import React from'react'
import  { useNavigate } from "react-router-dom";
import image1 from './assets/image1.png';
function Hr(){
    const navigate=useNavigate();
    return(<>
    <div className="body10">
        <img onClick={()=>navigate("/")}src={image1} alt='companylogo'/>
    </div>
    <div className="body3">
        <p className="Name2">NAVA SOFTWARE SOLUTIONS</p>
    <div className="hr-con">
        <ul>
        <li><a href="#"  onClick={()=>navigate('/homepage1')}>Homepage</a></li>
        <li><a href="#"onClick={()=>navigate('/createprofile')}>View employee profile</a></li>
        </ul>
    </div>
    </div>
    </>);
}
export default Hr;