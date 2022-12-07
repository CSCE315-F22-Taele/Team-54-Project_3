/**
 * This page implements the webapp's launchpage containing buttons to access the Cashier, Customer, and Manager users.
 * The launchpage also contains an image of the team logo and a Google Translate dropdown.
 * @author Neha Sujith
 * @author Mohona Ghosh
 */
import React from "react";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import logo from "./chicken-logo.jpg";
import jwt_decode from "jwt-decode";

/**
 * Constructs and returns a LaunchPage object displaying team logo, Google Translate component, and buttons to access each user.
 * @returns a LaunchPage component with the display described above
 */
const LaunchPage = () => {
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
     * 
     */
    function handleCallbackResponse(response) {
      console.log("Encoded JWT ID token: " + response.credential);
      var userObject = jwt_decode(response.credential);
      console.log(userObject);
      setUser(userObject);

      document.getElementById("signInDiv").hidden = true;
    }

    /**
     * 
     */
    function handleSignOut(event) {
      setUser({});
      document.getElementById("signInDiv").hidden = false;
    }

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

    // if we have no user: sign in button
    // if we have a user: show the log out button

    return (
      <div>
          <div>
            <div id="google_translate_element" /*style="text-align: 'right'; vertical-align: text-top;"*/></div>
          </div>
          <div>
            <div id="signInDiv"></div>
            { Object.keys(user).length != 0 &&
              <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
            }
            { user &&
              <div>
                <img src={user.picture}></img>
                <h3>{user.name}</h3>
              </div>
            }
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
          <button onClick={() => handleUpdate("Cashier")} type="button" className="btn btn-outline-danger btn-block">Cashier</button>
          <button onClick={() => handleUpdate("Manager")} type="button" className="btn btn-outline-danger btn-block">Manager</button>
      </div>
    )
}

export default LaunchPage;