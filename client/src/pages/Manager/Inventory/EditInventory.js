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
    const handleAdd = () => {

    }
    const handleEdit = () => {

    }
    const handleDelete = () => {
        
    }
    const handleSubmit = () => {
        
    }

    return (
        <div>
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter item ID" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter item name" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter category" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter expiration date" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter refrigeration requirement" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter quantity in stock" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter unit" 
                    onChange={onInput}
                    />
                    <button 
                        onClick={handleAdd}
                        className="btn btn-success " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Add item
                    </button>
                    <button 
                        onClick={handleEdit}
                        className="btn btn-secondary " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Edit item
                    </button>
                    <button 
                        onClick={handleDelete}
                        className="btn btn-danger " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Delete item
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="btn btn-primary " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Submit
                    </button>
                </Form.Group>
            </Form>
        </div>

    )
}

export default EditInventory;