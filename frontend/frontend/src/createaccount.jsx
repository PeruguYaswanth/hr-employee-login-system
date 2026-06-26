 import React from 'react'
  import axios from "axios";
 import  {useState} from 'react'
 import image1 from './assets/image1.png'
 import { useNavigate } from 'react-router-dom';

 function CreateAccount(){
    const [forms,setforms]=useState(false);
    const[filldetails,setfilldetails]=useState(false);
    const[uploaddocument,setuploaddocument]=useState(false);
    const[consent,setconsent]=useState(false);
    const[status1,setstatus1]=useState(false);
    const[ischecked,setischecked]=useState(false);
    const [file, setFile] = useState(null);
    const [AadhaarMsg, setAadhaarMsg] = useState("");
    const[marksmsg,setMarksMsg]=useState("");
    const[PanCard,setPanCard]=useState("");
    const[BankAccount,setBankAccount]=useState("");
    const[resume,setresume]=useState("");
    const[firstname,setFirstName]=useState("");
    const[lastname,setLastName]=useState("");
    const[MObileNumber,setMobileNumber]=useState("");
    const[Email,setEmail]=useState("");
    const[Domain,setDomain]=useState("");
    const[errors,seterrors]=useState({});
    const navigate=useNavigate("")

    const Submit = async () => {
        const newerror={}
        if(!firstname){
            newerror.firstname=true;
        }
        if(!lastname){
            newerror.lastname=true;
        }
        if(!MObileNumber){
            newerror.MObileNumber=true;
        }
        if(!Email){
            newerror.Email=true;
        }        
        if(!Domain){
            newerror.Domain=true;
        }
        seterrors(newerror);
        if (Object.keys(newerror).length > 0) {
            return; 
        }
        else{
            opener("uploaddocument");
            
        }
    }
    function submit_doc(){
        if (!file) {
            alert("Please select a file");
            return;
        }
        else{
            opener("consent");
        }

    }



    const handleSubmit = async (e, docType) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/upload`,
            formData
        );

            if (docType === "aadhaar") {
                setAadhaarMsg(response.data.message);
            }
            if (docType === "marks") {
                setMarksMsg(response.data.message);
            }
            if (docType === 'PanCard'){
                setPanCard(response.data.message);
            }
            if (docType === 'BankAccount'){
                setBankAccount(response.data.message);
            }
            if (docType ==='resume'){
                setresume(response.data.message);
            }

        } 
        catch (error) {
            console.error(error);
        }


    }
      
    function handlecheckbox(e){
        setischecked(e.target.checked);
    }
    async function submit_all(){
        try {
                const payload = {
                    firstname,
                    lastname,
                    mobile: MObileNumber,
                    email: Email,
                    domain: Domain,
                };

                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/submit-profile`,
                    payload
                );

                alert(res.data.message);
            } 
            catch (err) {
                console.error(err);
                alert("Submission failed");
            }
    }
    function opener(sections){
        setstatus1(false);
        setfilldetails(false);
        setuploaddocument(false);
        setconsent(false);
        if(sections==='filldetails') setfilldetails(true);
        if(sections==='uploaddocument') setuploaddocument(true);
        if(sections==='consent') setconsent(true);
    }


    function status(){
        setforms(false);
        setfilldetails(false);
        setuploaddocument(false);
        setconsent(false);

        if(ischecked){
            setstatus1(true);
        }
        else{
            alert('please agree the conditions!')
            setstatus1(false);
        }
    }

    
    return(
        <>
            <div className="crt-container">
                <div className="crt-btn" >
                    <button onClick={()=>setforms(!forms)}>Forms</button><br></br>
                    <button onClick={()=>status(!status1)}>Status</button>
                </div>
            </div>       
        {forms&&(
            <div className="forms-con">
                <img onClick={()=>navigate('/employee')}src={image1} alt="logo"/>
                <button onClick={()=>opener("filldetails")}>Fill Details</button>
                <button onClick={()=>opener("uploaddocument")}>Upload Documents</button>
                <button onClick={()=>opener("consent")}>Consent</button>
            </div>
        )}
        {filldetails &&(
            <div className='p-n'>
                <h2>Personal Details</h2><br /><br />
            <div className="fill">
                <div className='fill1'>
                    <p>FirstName:</p>
                    <input  value={firstname}className={errors.firstname? "s":""}placeholder="enter FirstName"type="text" onChange={(e)=>setFirstName(e.target.value)}/>
                    <p>LastName:</p>
                    <input value={lastname} className={errors.lastname? "s":""} placeholder='enter LastName' type="text"onChange={(e)=>setLastName(e.target.value)}/>
                    <p>MobileNumber:</p>
                    <input value={MObileNumber} className={errors.MObileNumber? "s":""} placeholder='enter mobile number' type='tel' onChange={(e)=>setMobileNumber(e.target.value)}/>
                </div>
                <div className='fill1'>
                    <p>Email:</p>
                    <input value={Email} className={errors.Email? "s":""} placeholder='enter email' type='email' onChange={(e)=>setEmail(e.target.value)}/>
                    <p>Domain:</p>
                    <input  value={Domain}className={errors.Domain? "s":""}  placeholder='enter domain' type='text' onChange={(e)=>setDomain(e.target.value)}/>
                </div>
                    < button  onClick={Submit} >Submit</button>
            </div>
             </div>
        )}
        {uploaddocument &&(
            <div className='document'>
                <div className='document1'>
                    <p className='nm'> Adhaar:</p>
                    <form onSubmit={(e)=>handleSubmit(e,"aadhaar")}>
                        <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        />   
                        <br /><br />
                        <button type="submit">Upload</button>
                    </form><br /><br />
                    <p className='msg'>{AadhaarMsg}</p>
                    <p className='nm'>marksMemo:</p>
                    <form onSubmit={(e)=>handleSubmit(e,"marks")}>
                        <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        />   
                        <br /><br/>
                        <button type="submit">Upload</button>
                    </form><br /><br />
                    <p className='msg'>{marksmsg}</p>
                    <p className='nm'>PanCard:</p>
                    <form onSubmit={(e)=>handleSubmit(e,"PanCard")}>
                        <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        />   
                        <br /><br />
                        <button type="submit">Upload</button>
                    </form><br /><br />
                    <p className='msg'>{PanCard}</p>
                </div>
                <div className='document1'>
                    <p className='nm'>BankAccount:</p>
                    <form onSubmit={(e)=>handleSubmit(e,"BankAccount")}>
                        <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        />   
                        <br /><br />
                        <button type="submit">Upload</button>
                    </form><br /><br />
                    <p className='msg'>{BankAccount}</p>
                    <p className='nm'>Resume:</p>
                    <form onSubmit={(e)=>handleSubmit(e,"resume")}>
                        <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        />   
                        <br /><br />
                        <button type="submit">Upload</button>
                    </form><br /><br />
                    <p className='msg'>{resume}</p>
                    <div className='btttt'>
                        <button onClick={submit_doc}>Submit</button>
                    </div>
                </div>
            </div>

        )}
        {consent&&(
            <div className='consent'>
                <input type='checkbox' checked={ischecked } onChange={handlecheckbox}/>
                <p>I agree the terms and connditions of the company And i mentioned above are true and correct</p>
                <button onClick={submit_all}>Submit</button>
                
            </div>
        )}
        {status1  &&(
            <div className='status1'>
                <p>your application sucessfully submitted!</p>
            </div>
        )}



        </>
    );
}
export default CreateAccount;