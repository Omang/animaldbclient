import { Link } from "react-router-dom"
import UsernavPage from "./UsernavPage"
import { useContext, useEffect, useState } from "react"
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { UserContext } from "../UserContext";
import OwnerTable from "../components/OwnerTable";

const OwnersPage = () => {
    const [owner, setOwner] = useState([]);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    
    const {user} = useContext(UserContext);

    const allowners = async()=>{
      setLoading(true);
      try{
       const {data} = await axios.get('/owner/allowners', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.refreshToken}` 
        }
      });
      setLoading(false);
      setOwner(data); 

      }catch(e){

        setLoading(false);
        setError(e.message);

      }
      

    }
   
    
     useEffect(()=>{
      
      allowners();
        
     },[])
  return (
    <div>
        <UsernavPage />
        
      {error && (
        <div className="mt-32 justify-center  text-center">
          <div className="rounded-full border-green-500">
            <h1 className="text-xl">
              {error}
            </h1>
          </div>
        </div>
      )}
        {
      loading ?
      <div className="mt-32 justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      :
        <div>
        <div className="mt-32 text-center">
        <Link className="bg-green-400 text-white py-2 px-4 rounded-2xl" to={'/account/owners/new'}>Add new Owner</Link>
             </div>
        <div className="relative w-auto flex flex-col shadow-lg mb-6 mt-4">
        <div className="block bg-transperant w-auto overflow-x-auto">
          <OwnerTable owners={owner} />
        </div>
        </div>
        </div>
}
    </div>
  )
}

export default OwnersPage
