import React, { useState, useEffect } from "react";
import axios from "axios";
import image1 from './assets/image1.png'
import { useNavigate } from "react-router-dom";

function Createprofile() {
  const [opencreate, setopencreate] = useState(false);
  const [opendocs, setopendocs] = useState(false);
  const [openconsent, setopenconsent] = useState(false);
  const [docs, setDocs] = useState([]);
  const [data, setData] = useState([]);
  const navigate=useNavigate();

  function openSection(section) {
    setopencreate(false);
    setopendocs(false);
    setopenconsent(false);

    if (section === "create") setopencreate(true);
    if (section === "docs")   setopendocs(true);
    if (section === "consent") setopenconsent(true);
  }
  function Accept(){
    alert("Accepted");
  }
  function Reject(){
    alert("Rejected");
  }

  useEffect(() => {
    if (opendocs) {
      axios
        .get("${import.meta.env.VITE_API_URL}/documents")
        .then(res => setDocs(res.data))
        .catch(err => console.error(err));
    }
  }, [opendocs]);

  useEffect(() => {
    if (opencreate) {
      axios
        .get("${import.meta.env.VITE_API_URL}/view-profile")
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, [opencreate]);

  return (
    <>
     <div className="main">
      <img onClick={()=>navigate("/hr")} src={image1} alt="logo"/>
      </div>
        <div className="profile-con">
          <button onClick={() => openSection("create")}>View profile</button>
          <button onClick={() => openSection("docs")}>View Docs</button>
          <button onClick={() => openSection("consent")}>Consent</button>
        </div>

      {opencreate && (
       
        <div className="opencreate">
          <div className="open-details">
            <h2>Personal Details</h2>
            {data.length === 0 ? (
              <p>No details submitted</p>
            ) : (
              data.map((items) => (
                <div key={items.id}>
                  <p>FirstName : {items.firstname}</p>
                  <p>LastName : {items.lastname}</p>
                  <p>MobileNumber : {items.mobile}</p>
                  <p>Email : {items.email}</p>
                  <p>Domain : {items.domain}</p><br></br>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {opendocs && (
        <div className="open-docs">
          <div className="open-docs1">
            <h2>Uploaded Documents</h2>
            {docs.length === 0 ? (
              <p>No documents uploaded</p>
            ) : (
              docs.map((doc) => (
                <div key={doc.id}>
                  <p>{doc.filename}</p>
                  <a
                    href={`${import.meta.env.VITE_API_URL}/documents/${doc.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                  View / Download
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {openconsent && (
        <div className="open-consen">
          <button className="accept" onClick={Accept}>Accept</button>
          <button className="reject" onClick={Reject}>Reject</button>
        </div>
      )}
    </>
  );
}

export default Createprofile;
