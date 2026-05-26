import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function NavBar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authtoken'));

    useEffect(() => {
        if (!isLoggedIn) return;

        const checkAdmin = async () => {
            try {
                const { data } = await axios.post('http://localhost:5000/decodejwt', {
                    token: localStorage.getItem('authtoken')
                });
                setIsAdmin(data.decoded.userstatus === "owner");
            } catch (error) {
                console.log(error);
            }
        };


        checkAdmin();
    }, [isLoggedIn]);

    return (
        <>
            <header>
                <nav>
                    <a href="/">Blog</a>
                    {isAdmin && <a href="/blogpanel">blogpanel</a>}
                    {isLoggedIn && <a href="/logout">logout</a>}
                </nav>
                {!isLoggedIn && (
                    <nav>
                        <a href="/signup">sign up</a>
                        <a href="/login">log in</a>
                    </nav>
                )}
            </header>
            <Outlet />
        </>
    );
}