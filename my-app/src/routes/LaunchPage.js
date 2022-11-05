import React from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

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

            <Button type="button" class="btn btn-outline-danger" onClick={() => handleUpdate("Cashier")}>Cashier</Button>
            <Button type="button" class="btn btn-outline-danger" onClick={() => handleUpdate("Customer")}>Customer</Button>
            <Button type="button" class="btn btn-outline-danger" onClick={() => handleUpdate("Manager")}>Manager</Button>
        </div>

    )
}

export default LaunchPage;