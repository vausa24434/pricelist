import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/AuthProvider";
import React from 'react';
import PriceList from "../Components/PriceList";


export default function HomePage() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <PriceList/>
        </>
    );  
}
