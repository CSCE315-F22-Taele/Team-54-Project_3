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
import PaymentConfirmation from "../components/Cards/PaymentConfirmation";
import EditInventory from "../pages/Manager/Inventory/EditInventory";

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
                <Route exact path ="/Customer/PaymentConfirmation" element={<PaymentConfirmation/>}/>
                <Route exact path ="/Manager/Inventory/EditInventory" element={<EditInventory/>}/>
            </Routes>
        </Router>
    </div>;

};

export default App;