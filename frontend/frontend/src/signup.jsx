import image1 from './assets/image1.png'
import  {useNavigate} from 'react-router-dom';
function Signup(){
    const navigate=useNavigate();
    return(
        <>
        <div className="tot">
        <div className="body1">
            <img src={image1} alt="logo"/>
            <button onClick={()=>navigate('/show')}>SignUp</button>
            <button onClick={()=>navigate('/login')}>Login</button>
         </div>

       
        </div>
        </>
    )

}
export default Signup;