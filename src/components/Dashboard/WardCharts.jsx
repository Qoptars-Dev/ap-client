/* eslint-disable no-prototype-builtins */
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import { ClipLoader } from 'react-spinners';
import { useGlobalState } from '../../context/GlobalStateProvider.jsx';
import { useMemo } from 'react';

const dateOptions = ['2024-09-11', '2024-09-12', '2024-09-13', '2024-09-14', '2024-09-15','2024-09-16','2024-09-17', '2024-09-18', '2024-09-19', '2024-09-20', '2024-09-21']; // Define the complete set of dates

const WardCharts = () => {
    const { data, selectedWard, loading, error } = useGlobalState(); // Use global state

    const chartData = useMemo(() => {
        if (loading || error) return {};

        const garbageCounts = dateOptions.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        const mosquitoCounts = dateOptions.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        
        // data.forEach(item => {
        //     if (garbageCounts.hasOwnProperty(item.date)) {
        //         // Filter data to get only garbage type objects for the current date
        //         const garbageItems = data.filter(d => d.date === item.date && d.type === 'garbage');
                
        //         // Count the number of garbage items for the current date
        //         garbageCounts[item.date] = garbageItems.length;
        //     }
        
        //     if (mosquitoCounts.hasOwnProperty(item.date)) {
        //         // Filter data to get only mosquito type objects for the current date
        //         const mosquitoItems = data.filter(d => d.date === item.date && d.type === 'mosquito');
                
        //         // Count the number of mosquito items for the current date
        //         mosquitoCounts[item.date] = mosquitoItems.length;
        //     }
        // });

                // Now filter data by ward and date for garbage and mosquito counts
                data.forEach(item => {
                    // Check if the item belongs to the selected ward
                    if (item.ward === selectedWard) {
                        if (garbageCounts.hasOwnProperty(item.date)) {
                            // Filter data to get only garbage type objects for the current ward and date
                            const garbageItems = data.filter(d => d.date === item.date && d.ward === selectedWard && d.type === 'garbage');
                            
                            // Count the number of garbage items for the current ward and date
                            garbageCounts[item.date] = garbageItems.length;
                        }
                    
                        if (mosquitoCounts.hasOwnProperty(item.date)) {
                            // Filter data to get only mosquito type objects for the current ward and date
                            const mosquitoItems = data.filter(d => d.date === item.date && d.ward === selectedWard && d.type === 'mosquito');
                            
                            // Count the number of mosquito items for the current ward and date
                            mosquitoCounts[item.date] = mosquitoItems.length;
                        }
                    }
                });

        const garbageData = dateOptions.map(date => ({
            date,
            count: garbageCounts[date]
        }));

        const mosquitoData = dateOptions.map(date => ({
            date,
            count: mosquitoCounts[date]
        }));

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 14, // Increase x-axis labels size
                        },
                    },
                },
                y: {
                    ticks: {
                        font: {
                            size: 14, // Increase y-axis labels size
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 15, // Increase legend text size
                        },
                    },
                },
                tooltip: {
                    titleFont: {
                        size: 14, // Increase tooltip title size
                    },
                    bodyFont: {
                        size: 12, // Increase tooltip body size
                    },
                },
            },
        };

        return {
            garbageChart: {
                labels: garbageData.map(item => item.date),
                datasets: [
                    {
                        label: 'Garbage Count',
                        data: garbageData.map(item => item.count),
                        borderColor: 'orange',
                        backgroundColor: 'rgba(255, 165, 0, 0.2)',
                        fill: true,
                    }
                ]
            },
            mosquitoChart: {
                labels: mosquitoData.map(item => item.date),
                datasets: [
                    {
                        label: 'Mosquito Count',
                        data: mosquitoData.map(item => item.count),
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        fill: true,
                    }
                ]
            },
            chartOptions, // Add chart options to the chart data
        };
    }, [data, loading, error]);

    if (loading) {
        return (
            <div className="flex mt-10 justify-center items-center">
                <ClipLoader color={"#123abc"} loading={loading} size={50} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

if (loading) {
    return (
        <div className="flex mt-10 justify-center items-center">
            <ClipLoader color={"#123abc"} loading={loading} size={50} />
        </div>
    );
}

if (error) {
    return <div>Error: {error.message}</div>;
}


    return (
        <div className="p-2 flex justify-center items-center">
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Garbage Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-8">
                    <h3>Garbage</h3>
                    <Line data={chartData.garbageChart} />
                </div>

                {/* Mosquito Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-8">
                    <h3>Mosquito</h3>
                    <Line data={chartData.mosquitoChart} />
                </div>
            </div>
        </div>
    );
};

export default WardCharts;
