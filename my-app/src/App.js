import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LaunchPage from "./routes/LaunchPage";
import Cashier from "./routes/Cashier";
import Customer from "./routes/Customer";
import Manager from "./routes/Manager";
import Inventory from "./routes/Inventory";
import MenuEditor from "./routes/MenuEditor";

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