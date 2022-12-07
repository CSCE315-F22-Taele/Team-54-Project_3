/**
 * This file implements functionality for the Manager to edit the store menu. Changes will reflect in the database.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { message } from 'antd';

// const conn = "http://localhost:3001";
const conn = "https://chick-fil-a-backend.onrender.com";


/**
 * Constructs a menu editor that contains form inputs that add, delete, or edit the desired item. Changes reflect on the backend
 * database and will be shown as soon as the Manager navigates to the store menu page.
 * @returns An EditInventory page that allows the Manager to edit the store inventory
 */
const EditInventory = () => {
  let navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [itemID, setID] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");

  /**
   * Sets the menu item ID to the user-inputted value
   * @param {*} value the user input 
   */
  const onInputID = ({ target: { value } }) => {
    console.log(value);
    setID(parseInt(value))
  }

  /**
   * Sets the menu item name to the user-inputted value
   * @param {*} value the user input 
   */
  const onInputName = ({ target: { value } }) => {
    console.log(value);
    setName(value)
  }

  /**
   * Sets the menu item category to the user-inputted value
   * @param {*} value the user input 
   */
  const onInputCategory = ({ target: { value } }) => {
    console.log(value);
    setCategory(value)
  }

  /**
   * Sets the menu item price to the user-inputted value
   * @param {*} value the user input 
   */
  const onInputPrice = ({ target: { value } }) => {
    console.log(value);
    setPrice(value)
  }

  /**
   * Sets the menu item ingredients to the user-inputted value
   * @param {*} value the user input 
   */
  const onInputIngredients = ({ target: { value } }) => {
    console.log(value);
    setIngredients(value)
  }

  /**
   * Initalizes the Google Translate element for the menu editor page to allow multiple languages support
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
   * Deploys the Google Translate element
   */
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  /**
   * Prevents the page from refreshing every time the user updates a value in one of the text fields.
   * @param {Event} e the event triggering the submit function; in this case, the user inputting values in the form text fields
   */
  const onFormSubmit = e => {
    e.preventDefault();
  }

  /**
     * When the user clicks the "Add Item" button, makes an API call to add the item in the backend database. This change will
     * be reflected client-side whenever the user next tries to access the inventory page.
     */
  const handleAdd = () => {
    try {
      console.log("Sending via JSON...");

      const response = fetch(conn + "/api/menu/addMenuItem", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "menuid": itemID,
          "name": name,
          "price": price,
          "category": category,
          "ingredients": ingredients
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

  /**
   * When the "Edit Item" button is clicked, makes an API call to edit the inputted item in the backend database. Change
   * is reflected immediately.
   */
  const handleEdit = () => {
    try {
      console.log("Sending via JSON...");

      const response = fetch(conn + "/api/menu/deleteMenuItem", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "itemID": itemID
        })
      });

      console.log("Finished API call");

      console.log("Reached reload location");
    }
    catch (err) {
      console.log("ERROR");
      console.error(err.message);
    }

    try {
      console.log("Sending via JSON...");

      const response = fetch(conn + "/api/menu/addMenuItem", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "menuid": itemID,
          "name": name,
          "price": price,
          "category": category,
          "ingredients": ingredients
        })
      });

      console.log("Finished API call");

      console.log("Reached reload location");
    }
    catch (err) {
      console.log("ERROR");
      console.error(err.message);
    }

  }

  /**
   * When the "Delete Item" button is clicked, makes an API call to delete the item from the backend database using the user-
   * inputted name. Change is reflected immediately.
   */
  const handleDelete = () => {
    try {
      console.log("Sending via JSON...");

      const response = fetch(conn + "/api/menu/deleteMenuItem", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "itemID": itemID
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
      const response = await fetch(conn + `/api/menu/menuItems`);
      const jsonVals = await response.json();
      console.log("tableeee");
      console.log(jsonVals.data.table);
      navigate(`/Manager/MenuEditor`, { state: jsonVals.data.table });
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
        style={{ alignSelf: 'center', justifyContent: 'center' }}
        type="submit">
        Add item
      </button>
      <button
        onClick={handleEdit}
        className="btn btn-secondary "
        style={{ alignSelf: 'center', justifyContent: 'center' }}
        type="submit">
        Edit item
      </button>
      <button
        onClick={handleDelete}
        className="btn btn-danger "
        style={{ alignSelf: 'center', justifyContent: 'center' }}
        type="submit">
        Delete item
      </button>
      <button
        onClick={handleSubmit}
        className="btn btn-primary "
        style={{ alignSelf: 'center', justifyContent: 'center' }}
        type="submit">
        Submit
      </button>
    </div>

  )
}

export default EditInventory;