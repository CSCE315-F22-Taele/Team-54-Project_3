import React from "react";
import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';
import Form from "react-bootstrap/Form";

const conn = "http://localhost:3001";

const EditInventory = () => {
    let navigate = useNavigate()
    const [inventory, setInventory] = useState([]);

    const handleUpdate = async (page) => {
        let nav = "inventory/inventoryItems";

        try {
            console.log(`/api/${nav}`)
            const response = await fetch (conn + `/api/${nav}`);
            const jsonVals = await response.json();
            console.log("tableeee");
            console.log(jsonVals.data.table);
            setInventory(jsonVals.data.table);
            navigate(`/Manager/${page}`, {state:jsonVals.data.table});
        } catch (err) {
            console.log("ERROR!!!");
            console.log(err);
        }
    };

    const onInput = () => {

    };

    const handleAdd = () => {

    };

    const handleEdit = () => {

    };

    const handleDelete = () => {

    }

    const onFormSubmit = e => {
        e.preventDefault() // prevents the page from refreshing when you enter a quantity
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
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter item ID" 
                    onChange={onInput}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter name" 
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
                    placeholder="Enter quantity" 
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
                        Add Item
                    </button>
                    <button
                        onClick={handleEdit}
                        className="btn btn-secondary " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Edit Item
                    </button>
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Delete Item
                    </button>
                    <button
                        onClick={handleUpdate("Inventory")}
                        className="btn btn-danger " 
                        style={{alignSelf: 'center', justifyContent: 'center'}} 
                        type="submit">
                        Return to Inventory
                    </button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default EditInventory;