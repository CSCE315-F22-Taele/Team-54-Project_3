import React from "react";
import {useNavigate} from "react-router-dom";

const LaunchPage = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <div>
            <h1>
                Launch Page
            </h1>

            <button onClick={() => handleUpdate("Cashier")}>Cashier</button>
            <button onClick={() => handleUpdate("Customer")}>Customer</button>
            <button onClick={() => handleUpdate("Manager")}>Manager</button>
        </div>

    )
}

export default LaunchPage;