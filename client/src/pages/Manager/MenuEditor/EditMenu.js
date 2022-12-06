import React from "react";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {message} from 'antd';

const conn = "http://localhost:3001";
const EditInventory = () => {
    let navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [itemID, setID] = useState(0);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");

    const onInputID = ({target:{value}}) => {
        console.log(value);
        setID(parseInt(value))
    }
    const onInputName = ({target:{value}}) => {
        console.log(value);
        setName(value)
    }
    const onInputCategory = ({target:{value}}) => {
        console.log(value);
        setCategory(value)
    }
    const onInputPrice = ({target:{value}}) => {
        console.log(value);
        setPrice(value)
    }
    const onInputIngredients = ({target:{value}}) => {
        console.log(value);
        setIngredients(value)
    }

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
        try {
            console.log("Sending via JSON...");
      
            const response = fetch(conn + "/api/menu/addMenuItem", {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({
                "menuid": itemID,
                "name":name,
                "price": price,
                "category":category,
                "ingredients":ingredients
              })
            });
      
            console.log("Finished API call");
      
            console.log("Reached reload location");
            messageApi.open({
              type: 'success',
              content: `Added ${name} successfully :)`,
            });
          }
          catch (err) {
              console.log("ERROR");
              messageApi.open({
                type: 'error',
                content: 'Add inventory item again :(',
              });
              console.error(err.message);
          }
    }
    const handleEdit = () => {

    }
    const handleDelete = () => {
        try {
            console.log("Sending via JSON...");
      
            const response = fetch(conn + "/api/menu/deleteMenuItem", {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              headers: {
                'Content-Type': 'application/json'
              },
              body : JSON.stringify({
                "itemName":name
              })
            });
      
            console.log("Finished API call");
      
            console.log("Reached reload location");
            messageApi.open({
              type: 'success',
              content: `Deleted ${name} successfully :)`,
            });
          }
          catch (err) {
              console.log("ERROR");
              messageApi.open({
                type: 'error',
                content: 'Delete inventory item again :(',
              });
              console.error(err.message);
          }
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch (conn + `/api/menu/menuItems`);
            const jsonVals = await response.json();
            console.log("tableeee");
            console.log(jsonVals.data.table);
            navigate(`/Manager/MenuEditor`, {state:jsonVals.data.table});
          } catch (err) {
            console.log("ERROR!!!");
            console.log(err);
          }

    }

    return (
        <div>
            {contextHolder}
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
                    placeholder="Enter price" 
                    onChange={onInputPrice}
                    />
                    <Form.Control 
                    type="text" 
                    placeholder="Enter ingredients" 
                    onChange={onInputIngredients}
                    />
                </Form.Group>
            </Form>
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
        </div>

    )
}

export default EditInventory;