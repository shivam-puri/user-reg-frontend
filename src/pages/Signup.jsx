import React, { useState, } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import '../styles/calendar.css'

function Signup() {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [about, setAbout] = useState('');
  const [genderOptions, setGenderOptions] = useState(['Male', 'Female', 'Other']);

  const validatePassword = (password) => {
    const minLength = 10;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasDigit = /\d/.test(password);
    return password.length >= minLength && hasLetter && hasDigit;
  };

  const validateName = (name) => {
    const hasInvalidStart = /^[^A-Za-z]/.test(name);
    const hasSpaces = /\s/.test(name);
    return !hasInvalidStart && !hasSpaces;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateName(name)) {
      toast('Name must not start with a special character or number and should not contain spaces.', { className: 'text-sm font-outfit text-black opacity-100' });
      return;
    }
    if (!validatePassword(password)) {
      toast('Password must be at least 10 characters long, contain both letters and numbers, and include at least one digit.', { className: 'text-sm font-outfit text-black opacity-100' });
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`, {
        name,
        age,
        date_of_birth: dob,
        password,
        gender,
        about,
      });
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='flex w-full min-h-screen items-center justify-center bg-secondary flex-col  md:p-0 p-4'>
      <h1 className='mb-6 text-4xl font-dynapuff max-[500px]:text-3xl' >
        Signup
      </h1>
      <form className='flex flex-col p-6 rounded-lg shadow-custom items-center bg-primary ' onSubmit={handleSubmit}>

        <div className='flex w-full' >
          <input
            className='w-full rounded-lg p-3 mb-4 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium mr-3'
            type="text"
            value={name}
            placeholder='USER NAME'
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
          />
          <input
            className='rounded-lg p-3 mb-4 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium w-20'
            type="number"
            value={age}
            placeholder='AGE'
            onChange={(e) => setAge(e.target.value)}
            required
            min={0}
            max={120}
            style={{ appearance: 'none', MozAppearance: 'textfield' }}
          />
        </div>

        <div className='flex w-full'>
          <div className='w-full rounded-lg p-3 mb-4 bg-input text-xs outline-none tracking-wider font-medium mr-3 text-xs flex items-center' >
            <select
              className='w-full rounded-lg bg-input text-xs outline-none tracking-wider font-medium m text-xs'
              value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">GENDER</option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className='w-full rounded-lg p-3 mb-4 bg-input text-xs outline-none tracking-wider font-medium text-xs flex items-center'>
            <input
              className='w-full rounded-lg    bg-input text-xs outline-none tracking-wider font-medium text-sm placeholder:uppercase placeholder:text-white custom-date-input'
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              placeholder='DD-MM-YYYY'
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

        </div>


        <input
          className='w-full rounded-lg p-3 mb-4 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium'
          type="password"
          value={password}
          placeholder='PASSWORD'
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={10}
        />

        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength={5000}
          placeholder='ABOUT'
          className='w-full rounded-lg p-3 mb-4 bg-input placeholder:text-xs outline-none placeholder:tracking-wide placeholder:font-medium'
        />
        <button className='flex items-center justify-center rounded-custom bg-white text-black p-3 w-40 text-xs font-semibold' type="submit">SUBMIT &nbsp; <span className='text-md text-link' ><FaCheckCircle /></span></button>
      </form>

      <div className='flex w-full mt-9 justify-center text-xs text-link underline underline-offset-2' >
        <Link to='/login' >ALREADY HAVE AN ACCOUNT?  &nbsp; LOGIN HERE</Link>
      </div>
    </div>
  );
}

export default Signup;