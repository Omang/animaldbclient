import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import BarLoader from 'react-spinners/BarLoader'
import {FaTelegramPlane} from "react-icons/fa";
import { UserContext } from '../UserContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [handlerror, setHandlerror] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const {setUser, setReady} = useContext(UserContext);

    function closeerror(ev){
      ev.preventDefault();
      setHandlerror('');
    }
    async function handleSubmit(ev){
        ev.preventDefault();
        setLoading(true);
       try {
             
    const {data} = await axios.post('user/login', {email,password});
        setUser(data); 
        setReady(true);
       localStorage.setItem('token', data.refreshToken);
       localStorage.setItem('lays', data );
        alert('login successful');
        setLoading(false);
        setRedirect(true);
        
       } catch (e) {
          alert('login failed, try again')
          setLoading(false);
          //console.log(e.response.data.message);
          setHandlerror(e.response.data.message);
       }
    }
    if(redirect){
        return <Navigate to={'/account'} />
    }
  return (
    <div className='mt-12 grow flex items-center justify-around'>
    {
      loading ?
      <BarLoader color={'#7ED321'} loading={loading} size={100} />
      :
      <div className='mb-64 border border-spacing-2 rounded-2xl p-2 border-green-500'>
    <h1 className="text-4xl text-center mb-4">Login</h1>
     <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
      {!!handlerror && (
       <div className='inline-flex bg-red-400 rounded-md text-center gap-4'>
         <p className='px-4 text-white'>{handlerror}</p><button onClick={closeerror} className='bg-red-500 px-4 text-white'>X</button>
       </div>
      )}
        <input type="email" placeholder='your@email.com' value={email} onChange={ev =>setEmail(ev.target.value)} />
        <input type="password" placeholder='your password' value={password} onChange={ev=> setPassword(ev.target.value)} />
        <button className='flex  justify-center items-center primary hover:bg-green-300'><FaTelegramPlane />Login</button>
      
     </form>
    </div>
    }  
    </div>
  )
}

export default LoginPage
