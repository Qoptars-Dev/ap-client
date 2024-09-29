import { useNavigate } from 'react-router-dom';
import 'chart.js/auto';
import WardCharts from './WardCharts.jsx'; 
import Navbar from '../Navbar/Navbar.jsx';
import { ClipLoader } from 'react-spinners';
import { useGlobalState } from '../../context/GlobalStateProvider.jsx';

const wardOptions = ['30', '32', '56', '57', '58', '59', '60', '61','62','63'];
const dateOptions = ['2024-09-10', '2024-09-11', '2024-09-12', '2024-09-13','2024-09-14','2024-09-15','2024-09-16','2024-09-17', '2024-09-18', '2024-09-19', '2024-09-20', '2024-09-21'];

const iconMapping = {
    'garbage': <img className='w-20 h-20' src="../assets/icons/garbage.png" alt="" />,
    'vehicle': <img className='w-20 h-20' src="../assets/icons/submergedvehicle.png" alt="" />,
    'building': <img className='w-20 h-20' src="../assets/icons/garbage.png" alt="" />,
    'mosquito': <img className='w-20 h-20' src="../assets/icons/mosquito.png" alt="" />,
    'silt': <img className='w-20 h-20' src="../assets/icons/silt.png" alt="" />
};

const Dashboard = () => {
    const navigate = useNavigate();
    const { selectedWard, setSelectedWard, selectedDate, setSelectedDate, imageCounts, loading, error } = useGlobalState(); // Use global state

    const handleCardClick = (category) => {
        console.log('Navigating to details with imageUrl:');
        navigate('/details', {
            state: { 
                category, 
                ward: selectedWard, 
                date: selectedDate 
            }
        });
    };
    

    return (
        <>
            <Navbar />
            <div className="mx-auto px-10">
                <div className="w-full flex justify-center items-center mb-6">
                    {/* Dropdowns */}
                    <div className="flex space-x-8 justify-center items-center mx-auto">
                        <div className="flex flex-col justify-center items-center">
                            <label htmlFor="ward" className="block text-lg font-semibold mb-2">
                                Select Ward
                            </label>
                            <select
                                id="ward"
                                value={selectedWard}
                                onChange={(e) => setSelectedWard(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            >
                                {wardOptions.map((ward, index) => (
                                    <option key={index} value={ward}>
                                        {ward}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <label htmlFor="date" className="block text-lg font-semibold mb-2">
                                Select Date
                            </label>
                            <select
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            >
                                {dateOptions.map((date, index) => (
                                    <option key={index} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Top cards */}
                <div className="lg:max-w-[900px] mx-auto p-4">
                    {loading ? (
                        <div className="flex mt-10 justify-center items-center">
                            <ClipLoader color={"#123abc"} loading={loading} size={50} />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500">
                            <p>Error loading data. Please try again later.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                            {/* Card contents based on fetched data */}
                            <div className={`bg-[#f0f4fc] w-60 h-68 shadow-lg rounded-lg p-10 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
                            onClick={() => handleCardClick('garbage', null, null, null)}
                            >
                                <div className="flex justify-center mb-4">{iconMapping['garbage']}</div>
                                <p className="text-2xl font-bold mb-2">GVP Count</p>
                                <p>{imageCounts?.garbageCount || 'N/A'}</p>
                            </div>
                            <div className={`bg-[#f0f4fc] w-60 h-68 shadow-lg rounded-lg p-10 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
                            onClick={() => handleCardClick('mosquito', null, null, null)}
                            >
                                <div className="flex justify-center mb-4">{iconMapping['mosquito']}</div>
                                <p className="text-3xl font-bold mb-2">MBP Count</p>
                                <p>{imageCounts?.mosquitoCount || 'N/A'}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* WardCharts */}
                <div className="container mx-auto p-4">
                    <WardCharts/>
                </div>
                <div className='text-gray-700 text-sm'>
                    <p><sup>*</sup>GVP = Garbage Vulnerable Points</p>
                    <p><sup>*</sup>MBP = Mosquito Breeding Points</p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;