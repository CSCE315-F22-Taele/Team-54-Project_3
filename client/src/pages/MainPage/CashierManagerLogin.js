/**
 * This page implements the webapp's cashier and manager login using OAuth
 * @author Estella Chen
 */
 import React from "react";
 import { useEffect, useState } from "react";
 import {useNavigate} from "react-router-dom";
 import { ArrowReturnLeft } from 'react-bootstrap-icons';
 import jwt_decode from "jwt-decode";
 
 /**
  * Constructs and returns a CashierManagerLogin object allowing the user to use their email to log in
  * @returns a CashierManagerLogin component with the display described above
  */
 const CashierManagerLogin = () => {
     let navigate = useNavigate()
 
     const [user, setUser] = useState({});
 
     /**
      * Allows the user to navigate to a certain page depending on the button clicked.
      * @param {String} page the page to navigate to
      */
     const handleUpdate = (page) => {
         navigate(`/${page}`);
     };
 
     /**
      * Initalizes the Google Translate element that shows up on the LaunchPage.
      */
     const googleTranslateElementInit = () => {
       new window.google.translate.TranslateElement(
         {
           pageLanguage: "en",
           autoDisplay: false
         },
         "google_translate_element"
       );
     };
 
     /**
      * Logs the email account chosen by the user to use for login
      */
     function handleCallbackResponse(response) {
       console.log("Encoded JWT ID token: " + response.credential);
       var userObject = jwt_decode(response.credential);
       console.log(userObject);
       setUser(userObject);
 
       document.getElementById("signInDiv").hidden = true;
       navigate("/Manager");
     }
 
     /**
      * Signs out the user
      */
     function handleSignOut(event) {
       setUser({});
       document.getElementById("signInDiv").hidden = false;
     }
 
     /**
      * Starts the display for Google Translate and Gmail login via OAuth
      */
     useEffect(() => {
       var addScript = document.createElement("script");
       addScript.setAttribute(
         "src",
         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
       );
       document.body.appendChild(addScript);
       window.googleTranslateElementInit = googleTranslateElementInit;
 
       /* global google */
       google.accounts.id.initialize({
         client_id: "971843556198-g2dablttraii3memss2rmmfeqp4pv4dn.apps.googleusercontent.com",
         callback: handleCallbackResponse
       });
 
       google.accounts.id.renderButton(
         document.getElementById("signInDiv"),
         { theme: "outline", size: "large" }
       );
 
       google.accounts.id.prompt();
     }, []);
 
     return (
       <div>
           <div>
             <div id="google_translate_element"></div>
           </div>
           <button onClick={() => handleUpdate("")} type="button" className="btn btn-outline-secondary"><ArrowReturnLeft color="black"/></button>
           <h2 className="font-weight-light display-5 text-center">
               Select user below:
           </h2>
           <br></br>
 
           <button onClick={() => handleUpdate("Cashier")} type="button" className="btn btn-outline-danger btn-block">Cashier</button>
           <h1 className="font-weight-light display-6 text-center">
              Manager
          </h1>
          <div id="signInDiv" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}></div>
           
       </div>
     )
 }
 
 export default CashierManagerLogin;