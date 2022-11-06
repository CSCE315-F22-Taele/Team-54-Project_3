import React from "react";
import {useNavigate} from "react-router-dom";

const LaunchPage = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <div>
            <h1 className="font-weight-light display-1 text-center">
                Welcome!
            </h1>

            <h2 className="font-weight-light display-5 text-center">
                Select user below:
            </h2>

            <button onClick={() => handleUpdate("Cashier")} type="button" class="btn btn-outline-danger btn-block">Cashier</button>
            <button onClick={() => handleUpdate("Customer")} type="button" class="btn btn-outline-danger btn-block">Customer</button>
            <button onClick={() => handleUpdate("Manager")} type="button" class="btn btn-outline-danger btn-block">Manager</button>
        </div>

    )
}

export default LaunchPage;