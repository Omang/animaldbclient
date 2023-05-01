import axios from "axios";
import { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { useParams } from "react-router-dom"

const AnimalownerPage = () => {

    const {id} = useParams();
    
    const [owner , setOwner] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);

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
        Owner

      </div>
}
    </div>
  )
}

export default AnimalownerPage
