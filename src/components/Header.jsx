import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {FaHome, FaOdnoklassniki} from "react-icons/fa"

const Header = () => {
    const {user} = useContext(UserContext);
  return (
    <header className='flex justify-between'>
    <Link to={user? '/account':'/'} className='gap-1'>
     <span className='flex items-center font-bold text-xl'><FaHome />Animal Database</span> </Link> 
     <div className='flex border border-green-500 rounded-full py-2 px-4 shadow-md shadow-green-500 '>
    <div className='px-1'>Pets</div> 
    <div className="py-1 px-1 border-l border-green-500"></div>
    <div className='px-1'>Cattle</div>
    <div className="py-1 px-1 border-l border-green-500"></div>
    <div className='px-1 text-center'>Others</div>
    
   </div>

   <Link to={user?'/account':'/login'} className='flex items-center border border-green-500 rounded-full  py-2 px-4'>
      <div className="bg-green-500 rounded-full text-white overflow-hidden">
       <FaOdnoklassniki />
       </div> 
       {!!user &&(
        <div> 
            {user.lastname}
        </div>
       )} 
   </Link>
  
   </header>

  )
}

export default Header
