/**
 * This page implements the webapp's launchpage containing buttons to access the Cashier, Customer, and Manager users.
 * The launchpage also contains an image of the team logo and a Google Translate dropdown.
 * @author Neha Sujith
 * @author Mohona Ghosh
 * @author Estella Chen
 */
import React from "react";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import logo from "./chicken-logo.jpg";
// import { Box } from '@mui/material';

/**
 * Constructs and returns a LaunchPage object displaying team logo, Google Translate component, and buttons to access each user.
 * @returns a LaunchPage component with the display described above
 */
const LaunchPage = () => {
    let navigate = useNavigate()

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

      document.getElementById("signInDiv").hidden = true;
      navigate("/CashierManagerLogin");
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
            {/* <Box color="white" bgcolor="palevioletred" p={1}> */}
                <div id="google_translate_element"></div>
            {/* </Box> */}
          </div>
          <img width="200" className="rounded mx-auto d-block" src={logo} alt="chicken-yurh"/>
          <h1 className="font-weight-light display-1 text-center">
              Welcome to Chick-fil-A!
          </h1>
          <h2 className="font-weight-light display-5 text-center">
              Select user below:
          </h2>
          <br></br>

          <button onClick={() => handleUpdate("Customer")} type="button" className="btn btn-outline-danger btn-block">Customer</button>
          <h1 className="font-weight-light display-6 text-center">
              Cashier or Manager
          </h1>
          <div id="signInDiv" style={{display: 'flex', justifyContent:'center', alignItems:'center'}}></div>
      </div>
    )
}

export default LaunchPage;