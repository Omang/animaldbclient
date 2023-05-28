import { Link, Navigate, useParams } from "react-router-dom";
import OrgformPage from "./OrgformPage";
import AccountnavPage from "./AccountnavPage";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader"
import {FaTelegramPlane, FaRenren, FaHouseUser, FaHospitalSymbol} from "react-icons/fa";
import { UserContext } from "../UserContext";
import axios from "axios";

const OrgsPage = ()=>{
  const {ready, user, setUser} = useContext(UserContext); 
    
    const [orgs, setOgrs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const {refreshToken} = user;
    const getstuff = ()=>{
      setLoading(true);
      axios.get('/org/getallorgs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}` 
        }
      }).then(({data})=>{
          
          setLoading(false);
          setOgrs(data);  
      }).catch(err=>{
        setLoading(false);
        setError(err.message);
       
       });
    }
   

    useEffect(()=>{


        getstuff();
       
        
      }, []);
    return (
        <div>
            <AccountnavPage />
       <div className="pt-16">
              
      {error && (
        <div className="mt-8 justify-center  text-center">
          <div className="rounded-full border-green-500">
            <h1 className="text-xl">
              {error}
            </h1>
          </div>
        </div>
      )}
           
              <div className="pt-32 text-center">
              <Link className="bg-green-400 text-white py-2 px-4 rounded-2xl" to={'/account/org/new'}>Add new Organisation</Link>
             </div>
             {
      loading ?
      <div className="mt-8 justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      :
          <div>
             <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4  justify-center">
           {orgs.length > 0 && orgs.map(org => (
            <div className="grid    
            py-2 px-2 border border-green-400
             shadow shadow-green-300 p-2 rounded-2xl w-[250px] h-[140px]" key={org._id}>
                <Link to={'/account/org/'+org._id} 
                 >
                    <h1 className="text-2xl flex items-center justify-center"><FaHospitalSymbol color="green"/>{org.org_name}</h1>
                    <p className="">{org.org_description}</p>
                   
                </Link>
                </div>
            ))}
           </div>
          </div>
       }
       </div>
           
        </div>
    )
}
export default OrgsPage;