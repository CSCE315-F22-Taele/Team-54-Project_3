import React from "react";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';

const EditInventory = () => {
    let navigate = useNavigate()
    const [itemID, setID] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [expiry, setExpiry] = useState("");
    const [fridge, setFridge] = useState("");
    const [quantity, setQuantity] = useState(0.0);
    const [unit, setUnit] = useState("");

    const onInputID = ({target:{value}}) => {
        console.log(value);
        setID(value)
    }
    const onInputName = ({target:{value}}) => {
        console.log(value);
        setName(value)
    }
    const onInputCategory = ({target:{value}}) => {
        console.log(value);
        setCategory(value)
    }
    const onInputExpiry = ({target:{value}}) => {
        console.log(value);
        setExpiry(value)
    }
    const onInputFridge = ({target:{value}}) => {
        console.log(value);
        setFridge(value)
    }
    const onInputQuantity = ({target:{value}}) => {
        console.log(value);
        setQuantity(value)
    }
    const onInputUnit = ({target:{value}}) => {
        console.log(value);
        setUnit(value)
    }

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
                    onChange={onInputID}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter item name" 
                    onChange={onInputName}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter category" 
                    onChange={onInputCategory}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter expiration date" 
                    onChange={onInputExpiry}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter refrigeration requirement" 
                    onChange={onInputFridge}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter quantity in stock" 
                    onChange={onInputQuantity}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter unit" 
                    onChange={onInputUnit}
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