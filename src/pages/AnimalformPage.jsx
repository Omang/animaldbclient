import { useContext, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import UsernavPage from "./UsernavPage";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import NotificationContext from "../NotificationContext";
import {
  FaPaw,
  FaMicrochip,
  FaDna,
  FaPalette,
  FaVenusMars,
  FaArrowLeft,
  FaPlusCircle,
  FaExclamationCircle
} from "react-icons/fa";

const AnimalformPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [animalname, setAnimalname] = useState('');
  const [animalchip, setAnimalchip] = useState('');
  const [animalbreed, setAnimalbreed] = useState('');
  const [animaltype, setAnimaltype] = useState('');
  const [animalcolor, setAnimalcolor] = useState('');
  const [animalsex, setAnimalsex] = useState('');
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notificationHandler } = useContext(NotificationContext);

  async function addNewanimal(ev) {
    ev.preventDefault();
    if (!id) return;
    const { refreshToken } = user;
    setLoading(true);

    try {
      await axios.post(
        '/api/animal/addanimal',
        {
          animal_name: animalname,
          animal_chip: animalchip,
          animal_breed: animalbreed,
          animal_type: animaltype,
          animal_color: animalcolor,
          animal_sex: animalsex,
          owner_id: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      setLoading(false);
      notificationHandler({ type: 'success', message: 'New Animal Added...Thanks' });
      setRedirect(<Navigate to={'/account/owners/owner/' + id} />);
    } catch (e) {
      setLoading(false);
      notificationHandler({ type: 'error', message: 'Oops!. Something wrong happened..Try again' });
      setError(e.message);
    }
  }

  if (redirect) {
    return redirect;
  }

  return (
    <div className="py-2">
      <UsernavPage />

      <div className="max-w-2xl mx-auto my-6">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to={'/account/owners/owner/' + id}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Owner Record</span>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
            <FaExclamationCircle className="text-rose-500 text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl border border-teal-100">
              <FaPaw />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Register New Animal Patient
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Record biometrics and microchip identification into the clinical database
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <GridLoader color={'#0d9488'} loading={loading} size={15} />
              <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
                Saving animal biometrics...
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={addNewanimal}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Animal Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaPaw className="text-teal-600 text-xs" />
                    <span>Animal Name</span>
                  </label>
                  <input
                    required
                    value={animalname}
                    onChange={(ev) => setAnimalname(ev.target.value)}
                    type="text"
                    placeholder="e.g. Bella, Max"
                  />
                </div>

                {/* Chip Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaMicrochip className="text-teal-600 text-xs" />
                    <span>Microchip Number</span>
                  </label>
                  <input
                    required
                    value={animalchip}
                    onChange={(ev) => setAnimalchip(ev.target.value)}
                    type="text"
                    placeholder="15-digit ISO microchip"
                  />
                </div>

                {/* Breed */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaDna className="text-teal-600 text-xs" />
                    <span>Breed / Subspecies</span>
                  </label>
                  <input
                    required
                    value={animalbreed}
                    onChange={(ev) => setAnimalbreed(ev.target.value)}
                    type="text"
                    placeholder="e.g. German Shepherd, Brahman"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <span>Species / Category</span>
                  </label>
                  <input
                    required
                    value={animaltype}
                    onChange={(ev) => setAnimaltype(ev.target.value)}
                    type="text"
                    placeholder="Canine, Feline, Bovine, Equine"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaPalette className="text-teal-600 text-xs" />
                    <span>Color / Markings</span>
                  </label>
                  <input
                    required
                    value={animalcolor}
                    onChange={(ev) => setAnimalcolor(ev.target.value)}
                    type="text"
                    placeholder="e.g. Black & Tan, Brindle"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaVenusMars className="text-teal-600 text-xs" />
                    <span>Biological Sex</span>
                  </label>
                  <input
                    required
                    value={animalsex}
                    onChange={(ev) => setAnimalsex(ev.target.value)}
                    type="text"
                    placeholder="Male, Female, Neutered"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Link
                  to={'/account/owners/owner/' + id}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FaPlusCircle />
                  <span>Save Animal Record</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalformPage;
