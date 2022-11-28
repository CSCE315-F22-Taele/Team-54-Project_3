import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import logo from "./chicken-logo.jpg";

const LaunchPage = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };
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
            <img width="200" className="rounded mx-auto d-block" src={logo} alt="chicken-yurh"/>
            <h1 className="font-weight-light display-1 text-center">
                Welcome to Chick-fil-A!
            </h1>
            <h2 className="font-weight-light display-5 text-center">
                Select user below:
            </h2>
            <br></br>
            <div id="google_translate_element"></div>

            <button onClick={() => handleUpdate("Customer")} type="button" className="btn btn-outline-danger btn-block">Customer</button>
            <button onClick={() => handleUpdate("Cashier")} type="button" className="btn btn-outline-danger btn-block">Cashier</button>
            <button onClick={() => handleUpdate("Manager")} type="button" className="btn btn-outline-danger btn-block">Manager</button>
        </div>

    )
}

export default LaunchPage;