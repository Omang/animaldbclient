import { useContext, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import UsernavPage from "./UsernavPage"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import NotificationContext from "../NotificationContext";

const AnimalformPage = () => {

    const {id} = useParams();
    const {user} = useContext(UserContext);
    
    const [animalname, setAnimalname] = useState('');
    const [animalchip, setAnimalchip] = useState('');
    const [animalbreed, setAnimalbreed] = useState('');
    const [animaltype, setAnimaltype] = useState('');
    const [animalcolor, setAnimalcolor] = useState('');
    const [animalsex, setAnimalsex] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const {notificationHandler} = useContext(NotificationContext);


    async function addNewanimal(ev){
        ev.preventDefault();
        if(!id){
           return;
        }
        const {refreshToken} = user;
        setLoading(true);

        try{

         await axios.post('/animal/addanimal',{
           animal_name: animalname, animal_chip: animalchip,
           animal_breed: animalbreed, animal_type: animaltype,
           animal_color: animalcolor,
           animal_sex: animalsex, owner_id: id
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          })
        setLoading(false);
        
        notificationHandler({type:'success', message:'New Animal Added...Thanks'});
       
        setRedirect(<Navigate to={'/account/owners/owner/'+id} />) 
          
        }catch(e){

          setLoading(false);
          
        notificationHandler({type:'error', message:'Oops!.Somthing wrong happend..Try again'});
       
          setError(e.message);

        }
        
      }
      if(redirect){
         return redirect;
      }
    
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
        
        <div className="mt-32 max-w-md mx-auto justify- border-green-500 border rounded-2xl">
                <h2 className="text-2xl mt-4 text-center font-bold">Animal Form</h2>
                <form className='py-2 px-4' onSubmit={addNewanimal}>
                    <h2 className="text-xl mt-1">Animal name</h2>
                    <input required value={animalname} onChange={ev => setAnimalname(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="name" />
                     <h2 className="text-xl mt-1">Chip Number</h2>
                    <input required value={animalchip} onChange={ev => setAnimalchip(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="chip" />
                     <h2 className="text-xl mt-1">Animal breed</h2>
                    <input required value={animalbreed} onChange={ev => setAnimalbreed(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="breed" />
                     <h2 className="text-xl mt-1">Animal type</h2>
                    <input required value={animaltype} onChange={ev => setAnimaltype(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="type" />
                     <h2 className="text-xl mt-1">Animal color</h2>
                    <input required value={animalcolor} onChange={ev => setAnimalcolor(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="color" />
                     <h2 className="text-xl mt-1">Animal gender</h2>
                    <input required value={animalsex} onChange={ev => setAnimalsex(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="sex" />
                    
                    <button type="submit"  className="border border-green-500 hover:bg-green-500 justify-center py-2 px-4 rounded-2xl">Create</button>
                </form>
               </div>
}
    </div>
  )
}

export default AnimalformPage
