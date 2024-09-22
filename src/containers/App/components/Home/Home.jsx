import Button from "../../../../components/Button/Button";
import { useNavigate } from 'react-router-dom'; 
import React from "react";

function Home() {
    const navigate = useNavigate(); 
   
    const handleLogOut = () => {
        navigate('/login');
    };
    
    return ( 
        <div>
            <h1>Home</h1>
            <Button label="Logout" onClick={handleLogOut}/>
        </div>
    );
}

export default Home;