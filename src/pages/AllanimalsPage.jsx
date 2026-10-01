import { useEffect, useState } from "react";
import AccountnavPage from "./AccountnavPage";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import Table from "../components/Table";
import { FaPaw, FaExclamationCircle } from "react-icons/fa";

const AllanimalsPage = () => {
  const [animal, setAnimal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAnimal = () => {
    setLoading(true);
    axios
      .get('/api/animal/getallanimals')
      .then(({ data }) => {
        setLoading(false);
        setError(null);
        if (!data) {
          throw Error('Could not fetch animal data');
        }
        setAnimal(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    getAnimal();
  }, []);

  return (
    <div className="py-2">
      <AccountnavPage />

      {/* Page Header */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
              <FaPaw className="text-lg" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Master Animal Registry
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global repository of microchipped animals, breeds, and clinical records
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <FaExclamationCircle className="text-rose-500 text-base shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <GridLoader color={'#0d9488'} loading={loading} size={15} />
          <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
            Querying clinical animal database...
          </p>
        </div>
      ) : (
        <Table datax={animal} />
      )}
    </div>
  );
};

export default AllanimalsPage;
