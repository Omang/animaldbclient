import UsernavPage from "./UsernavPage"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {FaTelegramPlane, FaHorseHead, FaMedkit, FaHistory} from "react-icons/fa";
import { UserContext } from "../UserContext";
import { useParams, Navigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

import NotificationContext from "../NotificationContext"

const AnimalhealthPage = () => {
   
    const {animalid, ownerid} = useParams();
    const [animal, setAnimal] = useState({});
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const [error, setError] =useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    const {refreshToken} = user; 
    const [diseasename, setDiseasename] = useState('');
    const [vaccinated, setVaccinated] = useState('');
    const [byname, setByname] = useState('');
    const [location, setLocation] = useState('');
    const [vaccinatedate, setVaccinatedate] = useState('');
    const [nextvaccination, setNextvaccination] = useState('');
    
    const {notificationHandler} = useContext(NotificationContext);


    
    const addhealth = async(ev)=>{
          ev.preventDefault();
        try{
            setLoading(true);
            const {data} = await axios.post('/api/animal/addpatientcard', {
                animal_id : animalid, disease_name: diseasename, vaccinated: vaccinated, by_name: byname, 
                at_name: location, vaccinated_on: vaccinatedate, next_vaccination: nextvaccination
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}` 
                  } 
            });
            setLoading(false);
            if(data.message){
                notificationHandler({type:'success', message:'Patient health added successful...Thanks'});
                setRedirect(<Navigate to={`/account/owners/getanimal/${animalid}/${ownerid}`} />);
            }else{
                notificationHandler({type:'warning', message:'Something bad happend...Try again'});
            }
            

        }catch(e){
            
            setLoading(false);
            console.log(e);
        }

    }

    if(redirect){
        return redirect;
     }
  

  return (
    <>
      <UsernavPage />
      <div className="pt-16">
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
      : <div className="pt-16">

<div >
          <div className="mt-8 max-w-md mx-auto justify- border-green-500 border rounded-2xl">
                <h2 className="text-2xl mt-4 text-center font-bold">Health Form</h2>
                <form className='py-2 px-4' onSubmit={addhealth}>
                    <h2 className="text-xl mt-1">Disease Name</h2>
                    <input required value={diseasename} onChange={ev => setDiseasename(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Disease Name" />
                     <h2 className="text-xl mt-1">Attendent</h2>
                    <input required value={vaccinated} onChange={ev => setVaccinated(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Yes or No" />
                     <h2 className="text-xl mt-1">Doctor Name</h2>
                    <input required value={byname} onChange={ev => setByname(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Doctor's Fullnames" />
                     <h2 className="text-xl mt-1">Clinic Name</h2>
                    <input required value={location} onChange={ev => setLocation(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="type" />
                     <h2 className="text-xl mt-1">Date</h2>
                    <input required value={vaccinatedate} onChange={ev => setVaccinatedate(ev.target.value)} className="border-green-500" 
                    type="date" placeholder="date" />
                     <h2 className="text-xl mt-1">Next Check Up</h2>
                    <input required value={nextvaccination} onChange={ev => setNextvaccination(ev.target.value)} className="border-green-500" 
                    type="date" placeholder="checkup date" />
                    
                    <button type="submit"  className="border border-green-500 hover:bg-green-500 justify-center py-2 px-4 rounded-2xl">Save</button>
                </form>
               </div>
        </div>

      </div>}
      </div>

    </>
  )
}

export default AnimalhealthPage