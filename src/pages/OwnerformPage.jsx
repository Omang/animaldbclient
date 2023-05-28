import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader"
import UsernavPage from "./UsernavPage"
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import NotificationContext from "../NotificationContext";

const OwnerformPage = () => {
  const {id} = useParams();
    const {user} = useContext(UserContext); 
   
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [plotnum, setPlotnum] = useState('');
    const [town, setTown] = useState('');
   
    const [redirect, setRedirect] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const {notificationHandler} = useContext(NotificationContext);


   const {refreshToken} = user;

   const getstuffy =()=>{
    setLoading(true);
    axios.get('/api/owner/owner/'+id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}` 
      }
    }).then(({data})=>{
       if(data){
       setLoading(false);
       setFirstname(data.first_name);
       setLastname(data.last_name);
       setEmail(data.email);
       setMobile(data.mobile);
       setPlotnum(data.address.plot_num);
       setTown(data.address.street_map);

       }
    }).catch(err=>{
      setLoading(false);
      setError(err.message);
     
     });

   }

   useEffect(()=>{
    if(!id){
      return;
    }
    getstuffy();
    
   },[id])

    async function addNewowner(ev){

       ev.preventDefault();
       setLoading(true);
      try{

        if(id){
        
          await axios.put('/api/owner/updateowner',{
            owner_id:id,
            first_name:firstname, last_name: lastname,
            email: email, mobile: mobile, 
            plot_num:plotnum, street_map: town 
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          });
          setLoading(false);
          notificationHandler({type:'warning', message:'Owner updated success...Thanks'});
        
          setRedirect(<Navigate to={'/account/owners/owner/'+id} />);
  
        }else{
          const {data} = await axios.post('/api/owner/createowner', {
            first_name:firstname, last_name: lastname,
             email: email, mobile: mobile, 
             plot_num:plotnum, street_map: town
            
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          })
          setLoading(false);
          notificationHandler({type:'success', message:'New Owner Created successfully...Thanks'});
        
          setRedirect(<Navigate to={'/account/owners/owner/'+data._id} />)
        
        }

      }catch(e){

        setLoading(false);
        notificationHandler({type:'error', message:'Oops!.Something wrong happend..Try again'});
        
        setError(e.message);

      }
    }
    if(redirect){
        return redirect;
    }
  return (
    <div>
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
      :
        <div>
          <div className="mt-8 max-w-md mx-auto justify- border-green-500 border rounded-2xl">
                <h2 className="text-2xl mt-4 text-center font-bold">Owner Form</h2>
                <form className='py-2 px-4' onSubmit={addNewowner}>
                    <h2 className="text-xl mt-1">Firstname</h2>
                    <input required value={firstname} onChange={ev => setFirstname(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Firstname" />
                    <h2 className="text-xl mt-1">Lastname</h2>
                    <input required value={lastname} onChange={ev => setLastname(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Lastname" />
                    <h2 className="text-xl mt-1">Email</h2>
                    <input required value={email} onChange={ev => setEmail(ev.target.value)} className="border-green-500" 
                    type="email" placeholder="Email" />
                    <h2 className="text-xl mt-1">Plot Number</h2>
                    <input required value={plotnum} onChange={ev => setPlotnum(ev.target.value)} className="border-green-500" 
                    type="number" placeholder="Location plot number" />
                    <h2 className="text-xl mt-1">Village / Town</h2>
                    <input required value={town} onChange={ev => setTown(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Town" />
                    <h2 className="text-xl mt-1">Mobile</h2>
                    <input required value={mobile} onChange={ev => setMobile(ev.target.value)} className="border-green-500 w-full border my-2 py-2 px-2 rounded-2xl" 
                    type="number" placeholder="Contact number" />
                    <button type="submit" className="hover:bg-green-500 border border-green-500 justify-center py-2 px-4 rounded-2xl">Create</button>
                </form>
               </div>
        </div>
}
       </div>
    </div>
  )
}

export default OwnerformPage
