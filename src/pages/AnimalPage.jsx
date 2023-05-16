import { Link, useParams } from "react-router-dom"
import GridLoader from "react-spinners/GridLoader";
import UsernavPage from "./UsernavPage"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {FaTelegramPlane, FaHorseHead, FaMedkit, FaHistory} from "react-icons/fa";
import { UserContext } from "../UserContext";

const AnimalPage = () => {
  const {animalid, ownerid} = useParams();
  const [animal, setAnimal] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(null);
  const {ready, user, setUser} = useContext(UserContext);
     const {refreshToken} = user;  

     const getanimaly = ()=>{
      setLoading(true);
      axios.get('animal/getanimal/'+animalid, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}` 
        }
      }).then(({data})=>{
        setLoading(false);
        setAnimal(data);
      }).catch(err=>{
        setLoading(false);
        setError(err.message);
       
       });
     }

  useEffect(()=>{
    if(!animalid){
      return;
  }

  getanimaly();
  
  },[animalid])

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
       {animal && (
  <div>

       <div className="mt-32 flex overflow-hidden mb-4 border gap-2 border-green-300 shadow shadow-green-200 rounded-2xl m-8">
      <div className="w-28 h-84 grow text-center py-2 px-4">
        <h1 className="flex text-xl items-center justify-center"><FaHorseHead />{animal.animal_name}</h1> <br>
         </br><div className="inline-flex items-center gap-2 border-green-500 border-b"><label className="py-2 px-1 text-xl">Animal_name: </label><p className="py-2 ">{animal.animal_name}</p></div><br />
   <div className="inline-flex items-center gap-2 border-green-500 border-b"><label className="py-2 px-1 text-xl">Animal_chip: </label><p className="py-2 ">{animal.animal_chip}</p></div><br />
 <div className="inline-flex items-center gap-2 border-green-500 border-b"><label className="py-2 px-1 text-xl">Animal_breed: </label><p className="py-2 ">{animal.animal_breed}</p></div><br />
 <div className="inline-flex items-center gap-2 border-green-500 border-b"><label className="py-2 px-1 text-xl">Animal_type:</label><p className="py-2 ">{animal.animal_type}</p></div><br />
 <div className="inline-flex items-center gap-2 border-green-500 border-b"><label className="py-2 px-1 text-xl">Animal_color: </label><p className="py-2 ">{animal.animal_color}</p></div><br />
 <div className="inline-flex items-center gap-2 border-green-500 border-b"><label className="py-2 px-1 text-xl">Animal_sex: </label><p className="py-2 ">{animal.animal_sex}</p></div>
 
         <div className="mt-3 text-center">
         <Link className="rounded-full flex items-center justify-center text-white bg-green-500  " to={`/account/owners/updateanimal/${animal._id}/${ownerid}`}><FaTelegramPlane/>Update</Link>
         </div>

       </div>
      <div className="border-left border-green-300 bg-green-300">.</div>
      <div className="w-32 h-32 grow  py-1 px-1">
        <h1 className=" flex justify-center text-xl items-center"><FaMedkit/> Card</h1>
        <div className="mt-4">
        <Link to={'/account/owners/owner/'+ownerid} className=" bg-green-500 "><FaHistory color="green" /></Link>
       </div>
       <h3 className="text-center font-serif font-bold mt-6 ">No data</h3>
       {animal.vaccinationdata && animal.vaccinationdata.length > 0 && animal.vaccinationdata.map(animal=>(
       
       <div>
        <Link to={`/account/owners/getanimal/${animal._id}/${owner._id}`} className="inline-flex gap-1 rounded-2xl border border-green-400 mt-4 py-2 px-2">
            <p className="font-bold font-sm">{animal.animal_name}</p>,
           
            
        </Link>
       
       </div>

       ))}
      </div>
     </div>
     
       


      </div> )} </div>
}
       </div>)
}











        
  


export default AnimalPage
