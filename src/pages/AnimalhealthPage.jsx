import UsernavPage from "./UsernavPage";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FaNotesMedical,
  FaSyringe,
  FaUserMd,
  FaHospital,
  FaCalendarAlt,
  FaCalendarCheck,
  FaArrowLeft,
  FaPlusCircle,
  FaExclamationCircle
} from "react-icons/fa";
import { UserContext } from "../UserContext";
import { useParams, Navigate, Link } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import NotificationContext from "../NotificationContext";

const AnimalhealthPage = () => {
  const { animalid, ownerid } = useParams();
  const [animal, setAnimal] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [error, setError] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const { refreshToken } = user;
  const [diseasename, setDiseasename] = useState('');
  const [vaccinated, setVaccinated] = useState('');
  const [byname, setByname] = useState('');
  const [location, setLocation] = useState('');
  const [vaccinatedate, setVaccinatedate] = useState('');
  const [nextvaccination, setNextvaccination] = useState('');

  const { notificationHandler } = useContext(NotificationContext);

  const addhealth = async (ev) => {
    ev.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/animal/addpatientcard',
        {
          animal_id: animalid,
          disease_name: diseasename,
          vaccinated: vaccinated,
          by_name: byname,
          at_name: location,
          vaccinated_on: vaccinatedate,
          next_vaccination: nextvaccination,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      setLoading(false);
      if (data.message) {
        notificationHandler({ type: 'success', message: 'Patient health record added successfully...Thanks' });
        setRedirect(<Navigate to={`/account/owners/getanimal/${animalid}/${ownerid}`} />);
      } else {
        notificationHandler({ type: 'warning', message: 'Something went wrong...Please try again' });
      }
    } catch (e) {
      setLoading(false);
      notificationHandler({ type: 'error', message: 'Failed to record health entry.' });
    }
  };

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
            to={`/account/owners/getanimal/${animalid}/${ownerid}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Patient Chart</span>
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
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl border border-emerald-100">
              <FaSyringe />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Add Health & Vaccination Record
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Record medical treatment, immunization status, and follow-up appointment
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <GridLoader color={'#0d9488'} loading={loading} size={15} />
              <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
                Recording treatment details into patient chart...
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={addhealth}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Disease / Vaccine */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaNotesMedical className="text-teal-600 text-xs" />
                    <span>Disease / Immunization Name</span>
                  </label>
                  <input
                    required
                    value={diseasename}
                    onChange={(ev) => setDiseasename(ev.target.value)}
                    type="text"
                    placeholder="e.g. Rabies, Parvovirus, Anthrax, Foot-and-Mouth"
                  />
                </div>

                {/* Vaccinated status */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaSyringe className="text-teal-600 text-xs" />
                    <span>Vaccination Status</span>
                  </label>
                  <input
                    required
                    value={vaccinated}
                    onChange={(ev) => setVaccinated(ev.target.value)}
                    type="text"
                    placeholder="Yes or No"
                  />
                </div>

                {/* Doctor Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaUserMd className="text-teal-600 text-xs" />
                    <span>Attending Veterinarian</span>
                  </label>
                  <input
                    required
                    value={byname}
                    onChange={(ev) => setByname(ev.target.value)}
                    type="text"
                    placeholder="Dr. Full Name"
                  />
                </div>

                {/* Clinic Location */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaHospital className="text-teal-600 text-xs" />
                    <span>Clinic / Facility Name</span>
                  </label>
                  <input
                    required
                    value={location}
                    onChange={(ev) => setLocation(ev.target.value)}
                    type="text"
                    placeholder="e.g. Central Veterinary Hospital, Gaborone"
                  />
                </div>

                {/* Date Vaccinated */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-teal-600 text-xs" />
                    <span>Date Administered</span>
                  </label>
                  <input
                    required
                    value={vaccinatedate}
                    onChange={(ev) => setVaccinatedate(ev.target.value)}
                    type="date"
                  />
                </div>

                {/* Next Checkup Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaCalendarCheck className="text-teal-600 text-xs" />
                    <span>Next Scheduled Checkup</span>
                  </label>
                  <input
                    required
                    value={nextvaccination}
                    onChange={(ev) => setNextvaccination(ev.target.value)}
                    type="date"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Link
                  to={`/account/owners/getanimal/${animalid}/${ownerid}`}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FaPlusCircle />
                  <span>Save Health Record</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalhealthPage;