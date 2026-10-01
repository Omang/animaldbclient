import { Link, useParams } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import UsernavPage from "./UsernavPage";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FaPaw,
  FaNotesMedical,
  FaMicrochip,
  FaCalendarAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaEdit,
  FaArrowLeft,
  FaPlus,
  FaVenusMars,
  FaCheckCircle,
  FaExclamationTriangle,
  FaExclamationCircle
} from "react-icons/fa";
import { UserContext } from "../UserContext";
import VetBadge3D from "../components/VetBadge3D";

const AnimalPage = () => {
  const { animalid, ownerid } = useParams();
  const [animal, setAnimal] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { refreshToken } = user;

  const getanimaly = () => {
    setLoading(true);
    axios
      .get('/api/animal/getanimal/' + animalid, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setAnimal(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (!animalid) return;
    getanimaly();
  }, [animalid]);

  return (
    <div className="py-2">
      <UsernavPage />

      {error && (
        <div className="my-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <FaExclamationCircle className="text-rose-500 text-base shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <GridLoader color={'#0d9488'} loading={loading} size={15} />
          <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
            Accessing patient medical chart & microchip records...
          </p>
        </div>
      ) : (
        animal && (
          <div className="my-6 space-y-6">
            {/* Top Navigation & Quick Actions Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <Link
                  to={'/account/owners/owner/' + ownerid}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-600 transition-colors"
                  title="Return to Owner Profile"
                >
                  <FaArrowLeft className="text-sm" />
                </Link>
                <div>
                  <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <span>{animal.animal_name || 'Patient Chart'}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 uppercase">
                      Active Patient
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    ID: {animal._id || animalid} • Owner: {ownerid}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/account/owners/updateanimal/${animal._id}/${ownerid}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  <FaEdit />
                  <span>Edit Biometrics</span>
                </Link>
                <Link
                  to={`/account/owners/animalhealth/${animal._id}/${ownerid}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
                >
                  <FaPlus className="text-xs" />
                  <span>Add Health Record</span>
                </Link>
              </div>
            </div>

            {/* Grid Layout: Biometrics Card & Medical History Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Biometrics & Microchip Identification */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl font-black border border-teal-100">
                        <FaPaw />
                      </div>
                      <div>
                        <h2 className="font-black text-slate-900 text-base">{animal.animal_name}</h2>
                        <span className="text-[11px] text-slate-400 capitalize">
                          {animal.animal_type || 'Domestic Species'}
                        </span>
                      </div>
                    </div>
                    <VetBadge3D size={32} />
                  </div>

                  {/* Microchip Badge */}
                  <div className="my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaMicrochip className="text-teal-600 text-base" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          ISO Microchip
                        </span>
                        <span className="font-mono font-bold text-xs text-slate-800">
                          {animal.animal_chip || 'NOT CHIPPED'}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">
                      VERIFIED
                    </span>
                  </div>

                  {/* Biometrics List */}
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Breed</span>
                      <span className="font-bold text-slate-800">{animal.animal_breed || '—'}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Color / Coat</span>
                      <span className="font-bold text-slate-800">{animal.animal_color || '—'}</span>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-500 font-medium">Sex</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <FaVenusMars className="text-teal-600 text-xs" />
                        <span>{animal.animal_sex || '—'}</span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500 font-medium">Species Classification</span>
                      <span className="font-bold text-slate-800 capitalize">{animal.animal_type || '—'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Health, Vaccination & Clinical Card */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <FaNotesMedical className="text-base" />
                      </span>
                      <div>
                        <h3 className="font-black text-lg text-slate-900">
                          Clinical Health & Immunization Ledger
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Vaccinations, veterinary attendances, and diagnostic visits
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Health Records Table */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Disease / Treatment</th>
                          <th className="px-4 py-3">Immunized</th>
                          <th className="px-4 py-3">Attending Vet</th>
                          <th className="px-4 py-3">Clinic Facility</th>
                          <th className="px-4 py-3">Administered</th>
                          <th className="px-4 py-3">Next Scheduled</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {animal.vaccinationdata && animal.vaccinationdata.length > 0 ? (
                          animal.vaccinationdata.map((item) => (
                            <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="px-4 py-3.5 font-bold text-slate-900">
                                {item.disease_name}
                              </td>
                              <td className="px-4 py-3.5">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    String(item.vaccinated).toLowerCase() === 'yes'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                                  }`}
                                >
                                  {String(item.vaccinated).toLowerCase() === 'yes' ? (
                                    <FaCheckCircle className="text-[9px]" />
                                  ) : (
                                    <FaExclamationTriangle className="text-[9px]" />
                                  )}
                                  <span>{item.vaccinated || 'Recorded'}</span>
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-slate-600 flex items-center gap-1.5">
                                <FaUserMd className="text-teal-600 text-xs shrink-0" />
                                <span>{item.by_name || '—'}</span>
                              </td>
                              <td className="px-4 py-3.5 text-slate-600">
                                <span className="flex items-center gap-1.5">
                                  <FaMapMarkerAlt className="text-slate-400 text-xs shrink-0" />
                                  <span>{item.at_name || '—'}</span>
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-slate-600 font-medium">
                                {item.vaccinated_on || '—'}
                              </td>
                              <td className="px-4 py-3.5 font-semibold text-teal-700">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200/60">
                                  <FaCalendarAlt className="text-[10px]" />
                                  <span>{item.next_vaccination || 'No date set'}</span>
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                              <FaNotesMedical className="mx-auto text-3xl text-slate-300 mb-2" />
                              <p className="font-bold text-slate-600 text-sm">
                                No health records on file
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                Click "Add Health Record" above to record vaccinations or treatments.
                              </p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AnimalPage;
