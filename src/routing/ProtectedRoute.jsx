import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axios from "axios";
import Login from "../pages/Login";

const ProtectedRoute = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [auth] = useAuth();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

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
    }, [auth?.token]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isVerified ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
