/**
 * This file implements the page to edit the inventory from the Manager user and have the changes reflect in the backend database.
 * @author Mohona Ghosh
 * @author Neha Sujith
 */
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { message } from 'antd';

const conn = "http://localhost:3001";

/**
 * Creates and displays the EditInventory page with form inputs to get information about the inventory item from the user
 * and buttons for adding, editing, and deleting the item with that information.
 * @returns an EditInventory page with the functionality described above.
 */
const EditInventory = () => {
  let navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [itemID, setID] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [expiry, setExpiry] = useState("");
  const [fridge, setFridge] = useState("");
  const [quantity, setQuantity] = useState(0.0);
  const [unit, setUnit] = useState("");

  /**
   * Sets the item ID to the user-inputted ID
   * @param {*} value the user input
   */
  const onInputID = ({ target: { value } }) => {
    console.log(value);
    setID(parseInt(value))
  }

  /**
   * Sets the item name to the user-inputted name
   * @param {*} value the user input
   */
  const onInputName = ({ target: { value } }) => {
    console.log(value);
    setName(value)
  }

  /**
   * Sets the item category to the user-inputted category
   * @param {*} value the user input
   */
  const onInputCategory = ({ target: { value } }) => {
    console.log(value);
    setCategory(value)
  }

  /**
   * Sets the item expiration date to the user-inputted date
   * @param {*} value the user input
   */
  const onInputExpiry = ({ target: { value } }) => {
    console.log(value);
    setExpiry(value)
  }

  /**
   * Sets the item fridge requirement status to the user-inputted attribute
   * @param {*} value the user input
   */
  const onInputFridge = ({ target: { value } }) => {
    console.log(value);
    setFridge(value)
  }

  /**
   * Sets the item's in-stock quantity to the user-inputted value
   * @param {*} value the user input
   */
  const onInputQuantity = ({ target: { value } }) => {
    console.log(value);
    setQuantity(parseFloat(value));
  }

  /**
   * Sets the item units to the user-inputted units
   * @param {*} value the user input
   */
  const onInputUnit = ({ target: { value } }) => {
    console.log(value);
    setUnit(value)
  }

  /**
   * Initalizes the Google Translate component to provide multiple language support on the webpage.
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

  /**
   * Prevents the page from refreshing every time the user changes a piece of information in any of the form inputs
   * @param {Event} e the triggering event, which in this case is a change in one of the form's input values.
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

      const response = fetch(conn + "/api/inventory/addInventoryItem", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "itemid": itemID,
          "name": name,
          "category": category,
          "expirationdate": expiry,
          "fridgerequired": fridge,
          "quantity": quantity,
          "unit": unit
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

      const response = fetch(conn + "/api/inventory/deleteInventoryItem", {
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
      console.log("Adding item NOWWWWWW");
      console.log("Sending via JSON...");

      const response = fetch(conn + "/api/inventory/addInventoryItem", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "itemid": itemID,
          "name": name,
          "category": category,
          "expirationdate": expiry,
          "fridgerequired": fridge,
          "quantity": quantity,
          "unit": unit
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

      const response = fetch(conn + "/api/inventory/deleteInventoryItem", {
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

  /**
   * When the "Submit" button is clicked, the user is automatically redirected to the Store Menu page.
   */
  const handleSubmit = async () => {
    try {
      const response = await fetch(conn + `/api/inventory/inventoryItems`);
      const jsonVals = await response.json();
      console.log("tableeee");
      console.log(jsonVals.data.table);
      navigate(`/Manager/Inventory`, { state: jsonVals.data.table });
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