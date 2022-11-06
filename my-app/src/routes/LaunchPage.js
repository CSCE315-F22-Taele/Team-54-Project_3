import React from "react";
import {useNavigate} from "react-router-dom";
import logo from "./chicken-logo.jpg";

const LaunchPage = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <div>
            <img width="200" className="rounded mx-auto d-block" src={logo} />
            <h1 className="font-weight-light display-1 text-center">
                Chick-fil-A
            </h1>
            <br></br>

            <button onClick={() => handleUpdate("Cashier")} type="button" class="btn btn-outline-danger btn-block">Cashier</button>
            <button onClick={() => handleUpdate("Customer")} type="button" class="btn btn-outline-danger btn-block">Customer</button>
            <button onClick={() => handleUpdate("Manager")} type="button" class="btn btn-outline-danger btn-block">Manager</button>
        </div>

    )
}

export default LaunchPage;