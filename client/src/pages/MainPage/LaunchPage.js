/**
 * This page implements the webapp's launchpage containing buttons to access the Cashier, Customer, and Manager users.
 * The launchpage also contains an image of the team logo and a Google Translate dropdown.
 * @author Neha Sujith
 * @author Mohona Ghosh
 */
import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import logo from "./chicken-logo.jpg";

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

      useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
          "src",
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }, []);

    return (
      <div>
          <div>
            <div id="google_translate_element" /*style="text-align: 'right'; vertical-align: text-top;"*/></div>
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