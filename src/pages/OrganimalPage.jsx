import { useEffect, useState } from "react"
import axios from "axios"
import GridLoader from "react-spinners/GridLoader";
import Table from "../components/Table";
import UsernavPage from "./UsernavPage";

const OrganimalPage = () => {
  const [animal, setAnimal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(null);

  const getAnimal = async()=>{
    setLoading(true);
    axios.get('/api/animal/getallanimals')
         .then(({data})=>{
             setLoading(false);
             setAnimal(data);
             
         }).catch(err=>{
          setLoading(false);
          setError(err.message);
         
         });
         //setLoading(false);
    

  }

  useEffect(()=>{
   
    getAnimal()

  },[])
  return (
    <div>
      <UsernavPage />

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
     <div >
       <Table datax={animal} />
     </div>
}
     </div>
    </div>
  )
}

export default OrganimalPage
