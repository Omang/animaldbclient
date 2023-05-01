import { Link, useParams } from "react-router-dom"
import UsernavPage from "./UsernavPage"
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader"
import axios from "axios";
import {FaTelegramPlane, FaRenren, FaIndent, FaHouseUser, FaHorse, FaHorseHead} from "react-icons/fa";
import { UserContext } from "../UserContext";
import Animalmodel from "../components/Animalmodel";

const OwnermainPage = () => {
    const {id} = useParams();

    const [openModal, setOpenModal] = useState(false);
    
    const [owner, Setowner] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
   
    const {ready, user, setUser} = useContext(UserContext);
    const {refreshToken} = user;  

    const getowneris = ()=>{
      setLoading(true);
        axios.get('/owner/owner/'+id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          }).then(({data})=>{
             setLoading(false);
             Setowner(data);
          }).catch(err=>{
            setLoading(false);
            setError(err.message);
           
           });
    }

    


    useEffect(()=>{
         
        if(!id){
            return;
        }
        getowneris();
        
    },[id])
      return (
    <div>
        <UsernavPage />
        
      {error && (
        <div className="mt-8 justify-center  text-center">
          <div className="rounded-full border-green-500">
            <h1 className="text-xl">
              {error}
            </h1>
          </div>
        </div>
      )}
        {
      loading ?
      <div className="mt-8 justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      :
        <div className=" flex overflow-hidden mb-4 border gap-2 border-green-300 shadow shadow-green-200 rounded-2xl m-8">
      <div className="w-28 h-84 grow text-center py-2 px-4">
        <h1 className="flex justify-center items-center text-xl text-center"><FaHouseUser />{owner.last_name} Details</h1> <br>
         </br><div className="inline-flex gap-2 border-green-500 border-b"><label className="py-2 px-1 font-bold">Fullname: </label><p className="py-2 ">{owner.first_name} {owner.last_name}</p></div><br />
         <div className="inline-flex gap-2 border-green-500 border-b"><label className="py-2 px-1 font-bold">Email: </label><p className="py-2 ">{owner.email}</p></div><br />
         <div className="inline-flex gap-2 border-green-500 border-b"><label className="py-2 px-1 font-bold">Contact Num:</label><p className="py-2 ">{owner.mobile}</p></div><br />
         <div className="inline-flex gap-2 border-green-500 border-b"><label className="py-2 px-1 font-bold">Location: </label><p className="py-2 ">{owner.address?.plot_num} {owner.address?.street_map} </p></div>
         
         <div className="mt-3 text-center">
         <Link className="flex rounded-full justify-center items-center bg-green-500 py-2 px-2 text-white " to={'/account/owners/updateowner/'+ owner._id}><FaTelegramPlane />Update</Link>
         </div>

       </div>
      <div className="border-left border-green-300 bg-green-300">.</div>
      <div className="w-32 h-32 grow  py-1 px-1">
        <h1 className="text-xl text-center flex items-center justify-center"><FaHorseHead />Animals</h1>
        <div className="mt-4">
        <Link to={'/account/owners/addanimal/'+ owner._id} className="rounded-sm bg-green-500 text-white items-center gap-1 justify-center flex">Add<FaHorse /></Link>
       </div>
       {owner.owner_animals && owner.owner_animals.length > 0 && owner.owner_animals.map(animal=>(
       
       <div key={animal._id}>
        <Link to={`/account/owners/getanimal/${animal._id}/${owner._id}`} className="inline-flex gap-1 border-green-500 border-b   mt-4 py-2 px-2 hover:bg-green-200">
            <p className="font-bold font-sm">{animal.animal_name}</p>,
            <p>{animal.animal_breed}</p>,
            <p>{animal.animal_color}</p>
            
        </Link>
       
       </div>

       ))}
      </div>
     </div>
}
    </div>
  )
}

export default OwnermainPage
