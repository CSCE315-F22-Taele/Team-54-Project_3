import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LaunchPage from "./pages/MainPage/LaunchPage";
import Cashier from "./pages/CashierCustomer";
import Customer from "./pages/Customer";
import Manager from "./pages/Manager";
import Inventory from "./pages/Manager/Inventory";
import MenuEditor from "./pages/MenuEditor";

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
            </Routes>
        </Router>
    </div>;

};

export default App;