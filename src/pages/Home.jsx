import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { fetchUserDetails, updateUserDetails, updateUserPassword } from '../redux/slices/userSlice';
import { toast } from 'react-toastify';
import { IoIosWarning } from "react-icons/io";
import { deleteUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/Modal';


function Home() {
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.user);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        about: userDetails?.user?.about || '',
        age: userDetails?.user?.age || '',
        date_of_birth: userDetails?.user?.date_of_birth || '',
        gender: userDetails?.user?.gender || '',
        name: userDetails?.user?.name || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    useEffect(() => {
        if (userDetails?.user) {
            setFormData({
                about: userDetails.user.about || '',
                age: userDetails.user.age || '',
                date_of_birth: userDetails.user.date_of_birth || '',
                gender: userDetails.user.gender || '',
                name: userDetails.user.name || ''
            });
        }
    }, [userDetails]);

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [dispatch]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await dispatch(updateUserDetails({ formData }));
        if (res.payload.message) toast(res.payload.message);
        setDisabled(true);
    };

    const handleChange = (e) => {
        setDisabled(false);
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const res = await dispatch(updateUserPassword({ passwordData }));
        if (res.payload.message) {
            toast(res.payload.message);
            setPasswordData({ currentPassword: '', newPassword: '' });
        }
    };

    const handleDeleteAccount = async () => {
        const res = await dispatch(deleteUser());
        if (res?.payload?.success) {
            toast("Account deleted successfully");
            dispatch(logoutUser());
            navigate('/login');
        }
        setIsModalOpen(false);
    };

    return (
        <div className='flex w-full min-h-screen items-center justify-center bg-secondary flex-col p-4'>
            <h1
                title={userDetails?.user?.about?.substring(0, 1000)}
                className='flex w-full justify-center items-center mb-2 lg:text-4xl text-3xl font-dynapuff mt-10'>Welcome {userDetails?.user?.name}</h1>

            <div className="flex flex-col lg:flex-row items-start ">
                <div className='flex flex-col p-6 rounded-lg shadow-custom items-center bg-primary max-w-96'>
                    <h1 className='mb-6 text-sm tracking-wider  font-outfit flex justify-start w-full'>UPDATE DETAILS</h1>
                    <form onSubmit={handleUpdate} className='w-full space-y-4'>
                        <input autoFocus type='text' name='name' value={formData.name} onChange={handleChange} placeholder='NAME'
                            className='w-full rounded-lg p-3 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium' />
                        <input type='number' name='age' value={formData.age} onChange={handleChange} placeholder='AGE'
                            className='w-full rounded-lg p-3 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium' />
                        <input type='date' name='date_of_birth' value={formData.date_of_birth ? formData.date_of_birth.split('T')[0] : ''} onChange={handleChange}
                            className='w-full rounded-lg p-3 bg-input outline-none' />
                        <input type='text' name='about' value={formData.about} onChange={handleChange} placeholder='ABOUT'
                            className='w-full rounded-lg p-3 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium' />
                        <select name='gender' value={formData.gender} onChange={handleChange}
                            className='w-full rounded-lg p-3 bg-input outline-none'>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                            <option value='Other'>Other</option>
                        </select>
                        <button disabled={disabled} type='submit'
                            className='flex items-center justify-center rounded-custom bg-white text-black p-3 w-full text-xs font-semibold hover:bg-opacity-90 transition'>UPDATE</button>
                    </form>
                </div>

                <div className='flex flex-col  items-center max-w-96 mt-5 lg:mt-0 lg:ml-5' >
                    <div className='flex flex-col bg-primary rounded-lg shadow-custom p-6' >
                        <h1 className='mb-6 text-sm tracking-wider  font-outfit flex justify-start w-full'>CHANGE PASSWORD</h1>

                        <form onSubmit={handlePasswordChange} className='w-full space-y-4'>
                            <input type='password' name='currentPassword' value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                placeholder='CURRENT PASSWORD' className='w-full rounded-lg p-3 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium' />
                            <input type='password' name='newPassword' value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                placeholder='NEW PASSWORD' className='w-full rounded-lg p-3 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium' />
                            <button type='submit'
                                className='flex items-center justify-center rounded-custom bg-white text-black p-3 w-full text-xs font-semibold hover:bg-opacity-90 transition'>CHANGE PASSWORD</button>
                        </form>
                    </div>

                    <div className="flex flex-col bg-primary rounded-lg shadow-custom p-6 w-full mt-5">
                        <h1 className='mb-6 text-sm tracking-wider font-outfit flex justify-start w-full flex items-center'><IoIosWarning size={16} /> &nbsp; DANGER ZONE</h1>


                        <button onClick={() => setIsModalOpen(true)} className='flex items-center justify-center rounded-custom bg-white text-black p-3 w-full text-xs font-semibold hover:bg-red-600 transition'>DELETE MY ACCOUNT</button>

                        <div className='flex w-full mt-3 justify-center text-xs text-white underline underline-offset-2 tracking-wide' >
                            <span >THIS ACTION IS IRREVERSIBLE</span>
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleLogout} className='mt-6 flex items-center justify-center rounded-custom bg-white text-black p-3 w-40 text-xs font-semibold hover:bg-red-600 transition'>LOGOUT</button>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteAccount}
            />
        </div >
    );
}

export default Home;
