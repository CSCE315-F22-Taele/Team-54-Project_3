import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LaunchPage from "../pages/MainPage/LaunchPage";
import Cashier from "../pages/Cashier/Cashier";
import Customer from "../pages/Customer/Customer";
import Manager from "../pages/Manager/Manager";
import Inventory from "../pages/Manager/Inventory/Inventory";
import MenuEditor from "../pages/Manager/MenuEditor/MenuEditor";
import MapContainer from "../pages/Customer/MapContainer";

const App = () => {
    return <div>
        <Router>
            <Routes>
                <Route exact path ="/" element={<LaunchPage/>}/>
                <Route exact path ="/Cashier" element={<Cashier/>}/>
                <Route exact path ="/Customer" element={<Customer/>}/>
                <Route exact path ="/Manager" element={<Manager/>}/>
                <Route exact path ="/Inventory" element={<Inventory/>}/>
                <Route exact path ="/MenuEditor" element={<MenuEditor/>}/>
                <Route exact path ="/MapContainer" element={<MapContainer/>}/>
            </Routes>
        </Router>
    </div>;

};

export default App;