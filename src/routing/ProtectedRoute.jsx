import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axios from "axios";
import Login from "../pages/Login";
import '../styles/loader.css'

const ProtectedRoute = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [auth] = useAuth();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const location = useLocation()

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${baseURL}/api/v1/auth/verification`);
                if (res.data.ok) {
                    setIsVerified(true);
                }
            } catch (error) {
                console.error("Error during authentication check:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (auth?.token) {
            authCheck();
        }
        else {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    }, [auth?.token, location]);

    if (true) {
        return <div className="flex items-center justify-center w-full h-screen" >
            <div className="loader" > </div>
        </div>;
    }

    return isVerified ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
