import { useContext, useEffect,useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import GridLoader from "react-spinners/GridLoader";
import AccountnavPage from "./AccountnavPage";
import axios from "axios";
import { UserContext } from "../UserContext";

const UserformPage = () => {
    const {user} = useContext(UserContext); 
    const {id} = useParams();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [occupation, setOccupation] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    
    const {refreshToken} = user;

    async function addNewuser(ev){
        ev.preventDefault();
        if(!id){
            return;
        }
        setLoading(true);
        try{

          const {data}=  await axios.post('user/adduser',{
            org : id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            occupation: occupation,
            password: password,
            mobile: mobile
        }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          });
          setLoading(false);
          setRedirect(true);


        }catch(e){

          setLoading(false);
          setError(e.message);

        }
     
    }
    if(redirect){
        return <Navigate to={'/account/org/'+id} />
    }


  return (
    <div>
         <AccountnavPage />
         
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
         <div className="mt-8 max-w-md mx-auto justify- border-green-500 border rounded-2xl">
                <h2 className="text-2xl mt-4 text-center font-bold">Add User Form</h2>
                <form className='py-2 px-4' onSubmit={addNewuser}>
                    <h2 className="text-xl mt-1">Firstname</h2>
                    <input value={firstname} onChange={ev => setFirstname(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Firstname" />
                    <h2 className="text-xl mt-1">Lastname</h2>
                    <input value={lastname} onChange={ev => setLastname(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Lastname" />
                    <h2 className="text-xl mt-1">Email</h2>
                    <input value={email} onChange={ev => setEmail(ev.target.value)} className="border-green-500" 
                    type="email" placeholder="Email" />
                    <h2 className="text-xl mt-1">Occupation</h2>
                    <input value={occupation} onChange={ev => setOccupation(ev.target.value)} className="border-green-500" 
                    type="text" placeholder="Occupation" />
                    <h2 className="text-xl mt-1">Password</h2>
                    <input value={password} onChange={ev => setPassword(ev.target.value)} className="border-green-500" 
                    type="password" placeholder="Password" />
                    <h2 className="text-xl mt-1">Mobile</h2>
                    <input value={mobile} onChange={ev => setMobile(ev.target.value)} className="border-green-500 w-full border my-2 py-2 px-2 rounded-2xl" 
                    type="number" placeholder="Contact number" />
                    <button  className="justify-center py-2 px-4 rounded-2xl">create</button>
                </form>
               </div>
}    
    </div>
  )
}

export default UserformPage
