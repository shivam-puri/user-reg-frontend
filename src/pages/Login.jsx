import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/slices/authSlice'
import { FaCircleChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/Auth';
import axios from 'axios';


function Login() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [auth] = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/verification`);
                console.log("res", res)
                if (res.data.ok) {
                    navigate("/home")
                }
            } catch (error) {
                console.error("Error during authentication check:", error);
            }
        };

        if (auth?.token) {
            authCheck();
        }

    }, [auth?.token]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        // New username validation
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/; // Should not start with special character or number, no spaces
        if (!usernameRegex.test(name)) {
            toast("Username must start with a letter and cannot contain spaces or special characters", { className: 'font-outfit text-sm' });
            setLoading(false);
            return;
        }

        if (name.length < 2) {
            toast("Name must be at least 2 characters long", { className: 'font-outfit text-sm' });
            setLoading(false);
            return;
        }
        if (password.length < 10) {
            toast("Password must be at least 10 characters long", { className: 'font-outfit text-sm' });
            setLoading(false);
            return;
        }
        try {
            await dispatch(loginUser({ name, password })).unwrap();
            navigate("/home", { replace: true });
            window.location.reload()
        } catch (error) {
            toast.error(error.message, { className: 'font-outfit text-sm' });
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className='flex w-full h-screen items-center justify-center bg-secondary flex-col p-4 md:p-8' >
                <h1 className='mb-6 text-4xl font-dynapuff text-center' >
                    Login
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col p-6 rounded-lg shadow-custom items-center bg-primary w-full max-w-sm' >
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='USER NAME'
                        className='w-full rounded-lg p-3 mb-4 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium'
                    />

                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='PASSWORD'
                        className='w-full outline-none rounded-lg p-3 mb-8 bg-input placeholder:text-xs placeholder:tracking-wide placeholder:font-medium'
                    />

                    <button className='flex items-center justify-center rounded-custom bg-white text-black p-3 w-full max-w-xs text-xs font-semibold' type='submit' >
                        {loading ? 'LOGGING IN...' : 'LOG IN'} &nbsp; <span className='text-md text-link' ><FaCircleChevronRight /></span>
                    </button>
                </form>

                <div className='flex w-full mt-9 justify-center text-xs text-link underline underline-offset-2' >
                    <Link to='/signup' >DONT HAVE AN ACCOUNT?  &nbsp; CREATE HERE</Link>
                </div>
            </div>
        </>
    )
}

export default Login
