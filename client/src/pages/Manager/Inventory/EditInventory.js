import React from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';

const EditInventory = () => {
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

    const onFormSubmit = e => {
        e.preventDefault();
    }
    const onInput = () => {
        
    }

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter quantity" 
                    onChange={onInput}
                    />
                    {/* <button 
                        onClick={handleOrders}
                        className="btn btn-danger " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Order
                    </button> */}
                </Form.Group>
            </Form>
        </div>

    )
}

export default EditInventory;