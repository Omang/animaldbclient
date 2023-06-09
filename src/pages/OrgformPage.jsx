import axios from "axios";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";

import { UserContext } from "../UserContext"
import AccountnavPage from "./AccountnavPage";
import { Navigate, useParams } from "react-router-dom";

import NotificationContext from "../NotificationContext";


const OrgformPage = () => {
    const {id}= useParams();
    const [orgname, setOrgname] = useState('');
    const [orgdis, setOrgdis] = useState('');
    const [redirect, setRedirect] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const {user} = useContext(UserContext);
    const {notificationHandler} = useContext(NotificationContext);

    useEffect(()=>{
      if(!id){
        return;
      }
      const {refreshToken} = user;
      setLoading(true);
      axios.get('/api/org/getorg/'+id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}` 
        }
      }).then(({data})=>{
        if(data){
          setLoading(false);
          setOrgname(data.org_name);
          setOrgdis(data.org_description);
        }

      }).catch(err=>{
        setLoading(false);    
        setError(err.message);
       
       });
      

    },[id])
    
    async function addNeworg(ev){
        ev.preventDefault();
        setLoading(true);
        const {refreshToken} = user;

        if(id){
          
          axios.put('/api/org/updateorg',{
            id:id,
            org_name: orgname,
            org_description: orgdis
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          }).then(response=>{
            setLoading(false);
          notificationHandler({type:'warning', message:'Organisation Updated successfully...'});
          setRedirect(<Navigate to={'/account/org/'+id} />);
          }).catch(err=>{
            notificationHandler({type:'error', message:'Update Failed..Try again.'});
            throw err;
          });
          

        }else{

            axios.post('/api/org/createorg',{
            org_name: orgname,
            org_description: orgdis
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          }).then(response=>{
             setLoading(false);
             notificationHandler({type:'success', message:'Organisation created successfully.'});   
        setRedirect(<Navigate to={'/account/org/'+response.data._id} />);
          }).catch(err=>{
            notificationHandler({type:'error', message:'Update Failed..Try again.'});
            throw err;
          });;
       

        }
   

    }
    if(redirect){

     return redirect;
    }

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

        {
      loading ?
      <div className="mt-8 justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      :

    <div className="">
      <div className="mt-8 max-w-md mx-auto justify- border-green-500 border rounded-2xl">
                <h2 className="text-2xl mt-4 text-center font-bold">Organisation Form</h2>
                <form className='py-2 px-4' onSubmit={addNeworg}>
                    <h2 className="text-xl mt-4">Organisation name</h2>
                    <input value={orgname} onChange={ev => setOrgname(ev.target.value)} className="border-green-500" type="text" placeholder="Vet Clinic" />
                    <h2 className="text-xl mt-4">Organisation description</h2>
                    <textarea value={orgdis} onChange={ev => setOrgdis(ev.target.value)} className="w-full border border-green-500 my-2 py-2 px-2 rounded-2xl" type="text"></textarea>
                    <button  className="justify-center py-2 px-4 rounded-2xl">create</button>
                </form>
               </div>
    </div>
}
      </div>
               </div>
  )
}

export default OrgformPage
