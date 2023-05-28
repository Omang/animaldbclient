import { useEffect, useState } from "react"
import AccountnavPage from "./AccountnavPage"
import axios from "axios"
import GridLoader from "react-spinners/GridLoader";
import Table from "../components/Table";

const AllanimalsPage = () => {
  const [animal, setAnimal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] =useState(null);

  const getAnimal = ()=>{
    setLoading(true);
   
    axios.get('/animal/getallanimals')
         .then(({data})=>{
             setLoading(false);
             setError(null);
             if(!data){
               throw Error('Could not fetch data');
             }
             setAnimal(data);
         }).catch(err=>{
          setLoading(false);
          setError(err.message);
         
         });
        // setLoading(false);

  }

  useEffect(()=>{
     

    getAnimal()

  },[])
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

     <div>
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
    </div>
  )
}

export default AllanimalsPage
