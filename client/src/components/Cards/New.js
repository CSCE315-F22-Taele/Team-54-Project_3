import React from "react";
import {useNavigate} from "react-router-dom";

const LaunchPage = () => {
    let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
    };

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={()=>handleUpdate("Customer")}>Start new order bruh</button>
        </div>

    )
}

export default LaunchPage;