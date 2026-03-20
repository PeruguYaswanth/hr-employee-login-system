import Signup from './signup.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Show from './show.jsx';
import Login from './login.jsx';
import CreateAccount from "./createaccount.jsx";
import Homepage from "./homepage.jsx";
import Status from "./status.jsx";
import Homepage1 from "./homepagehr.jsx";
import Createprofile from "./createprofile.jsx";
import Hr from "./hr.jsx";
import Employee from "./employee.jsx";
import CreateAccountemp from './createaccountemp.jsx';
import Forgot from './forgot.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path={'/login'} element={<Login/>}/>
      <Route path={'/forgot'} element={<Forgot/>}/>
      <Route path={'/'} element={<Signup/>}/>
      <Route path="/hr" element={<Hr />} />
      <Route path="/createaccountemp" element={<CreateAccountemp />} />
      <Route path="/employee" element={<Employee />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/status" element={<Status />} />
      <Route path="/homepage1" element={<Homepage1 />} />
      <Route path="/createprofile" element={<Createprofile />} />
      <Route path={'/show'} element={<Show/>}/>
    </Routes>
    </BrowserRouter>
    </>

  );
}

export default App
