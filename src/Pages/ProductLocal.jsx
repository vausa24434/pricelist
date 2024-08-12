import Nav from "../Components/Nav";
import NavUser from "../Components/NavUser";
import { useAuth } from "../Components/Auth/AuthProvider";
import React from 'react';
import ProductLocal from "../Components/Product/ProductLocal";


export default function ProductLocalPage() {
    const {user} = useAuth();
    return (
        <>
            {user ? <NavUser /> : <Nav />}
            <ProductLocal />
        </>
    );  
}
