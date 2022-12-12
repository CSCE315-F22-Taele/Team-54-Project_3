/**
 * This file describes the routing used on the frontend of this webapp but enabling navigation between the different subpages of 
 * each user.
 * @author Mohona Ghosh
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "../pages/MainPage/LaunchPage";
import Cashier from "../pages/Cashier/Cashier";
import Customer from "../pages/Customer/Customer";
import Manager from "../pages/Manager/Manager";
import Inventory from "../pages/Manager/Inventory/Inventory";
import MenuEditor from "../pages/Manager/MenuEditor/MenuEditor";
import MapContainer from "../pages/Customer/MapContainer";
import SalesReport from "../pages/Manager/SalesReport";
import ExcessReport from "../pages/Manager/ExcessReport";
import RestockReport from "../pages/Manager/RestockReport";
import PaymentConfirmationCustomer from "../components/Cards/PaymentConfirmationCustomer";
import PaymentConfirmationCashier from "../components/Cards/PaymentConfirmationCashier";
import EditInventory from "../pages/Manager/Inventory/EditInventory";
import EditMenu from "../pages/Manager/MenuEditor/EditMenu";
import CashierManagerLogin from "../pages/MainPage/CashierManagerLogin";

/**
 * Creates and enables the frontend routing
 * @returns an App object describing navigation routes for various pages on the web app
 */
const App = () => {
    return <div>
        <Router>
            <Routes>
                <Route exact path ="/" element={<LaunchPage/>}/>
                <Route exact path ="/Cashier" element={<Cashier/>}/>
                <Route exact path ="/Customer" element={<Customer/>}/>
                <Route exact path ="/Manager" element={<Manager/>}/>
                <Route exact path ="/Manager/Inventory" element={<Inventory/>}/>
                <Route exact path ="/Manager/MenuEditor" element={<MenuEditor/>}/>
                <Route exact path ="/Customer/MapContainer" element={<MapContainer/>}/>
                <Route exact path ="/Manager/Reports/Sales" element={<SalesReport/>}/>
                <Route exact path ="/Manager/Reports/Excess" element={<ExcessReport/>}/>
                <Route exact path ="/Manager/Reports/Restock" element={<RestockReport/>}/>
                <Route exact path ="/Customer/PaymentConfirmationCustomer" element={<PaymentConfirmationCustomer/>}/>
                <Route exact path ="/Cashier/PaymentConfirmationCashier" element={<PaymentConfirmationCashier/>}/>
                <Route exact path ="/Manager/Inventory/EditInventory" element={<EditInventory/>}/>
                <Route exact path ="/Manager/MenuEditor/EditMenu" element={<EditMenu/>}/>
                <Route exact path ="/CashierManagerLogin" element={<CashierManagerLogin/>}/>
            </Routes>
        </Router>
    </div>;

};

export default App;