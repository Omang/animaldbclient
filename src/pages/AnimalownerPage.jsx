import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../UserContext"
import GridLoader from "react-spinners/GridLoader";
import { Link, useParams } from "react-router-dom"

const AnimalownerPage = () => {

    const {id} = useParams();
    
    const [owner , setOwner] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);

    const {ready, user, setUser} = useContext(UserContext);

    const getowner = async()=>{
      setLoading(true);
        const {data} = await axios.get('/animal/getanimalowner/'+id);
        setLoading(false);
      setOwner(data);
     
    }

    useEffect(()=>{

      if(!id){

        return;
      }

        getowner();
        setLoading(false);

    },[id])
  return (
    <div>
      {
      loading ?
      <div className="mt-8 justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={20} />
      </div>
      :
      <div>
        


        {owner && owner.length > 0 && owner.map(ownerx=>(
          <div key={ownerx._id} className="flex justify-center mt-8  ">
         <div className="text-2xl px-2 border-l border-b border-green-500 uppercase">
         {ownerx.first_name} {ownerx.last_name}
         </div>
         <div  className="text-2xl px-2 border-l border-b border-green-500 lowercase">
         {ownerx.email}
         </div>
         <div  className="text-2xl px-2 border-l border-b border-green-500 uppercase">
         {ownerx.mobile}
         </div>
         <div className="border-l border-green-500"></div>

        


         { user.role==="admin"&& (<div>

          <Link to={'/account/animals'} className="rounded-full ml-2 py-2 px-3 border hover:bg-green-500 border-green-500">
         GO BACK
         </Link>
        </div>)}
        {user.role==="user"&& (<div>
          <Link to={'/account/organimals'} className="rounded-full ml-2 py-2 px-3 border hover:bg-green-500 border-green-500">
         GO BACK
         </Link>
       </div>)}
        
            
          </div>
        ))}

      </div>
}
    </div>
  )
}

export default AnimalownerPage
