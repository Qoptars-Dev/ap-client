import { createContext, useContext, useState, useEffect } from 'react';
import useSWR from 'swr';

// Create a context
const GlobalStateContext = createContext();

// Fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

// Create a provider component
// eslint-disable-next-line react/prop-types
export const GlobalStateProvider = ({ children }) => {
    const [selectedWard, setSelectedWard] = useState(localStorage.getItem('selectedWard') || '56');
    const [selectedDate, setSelectedDate] = useState(localStorage.getItem('selectedDate') || '2024-09-10');
    const [imageCounts, setImageCounts] = useState({ garbageCount: 0, mosquitoCount: 0 });


        // Load fetchedData from local storage or initialize as null
        const [fetchedData, setFetchedData] = useState(() => {
            const storedData = localStorage.getItem('fetchedData');
            return storedData ? JSON.parse(storedData) : null;
        });
    
        // Use SWR to fetch data if it's not already cached
        const { data: swrData, error: dataError } = useSWR(
            fetchedData ? null : 'https://ap-server-762430015584.asia-south1.run.app/data',
            fetcher
        );
    
        useEffect(() => {
            // If data is fetched from SWR and it's not already in local storage, store it
            if (swrData && !fetchedData) {
                localStorage.setItem('fetchedData', JSON.stringify(swrData));
                setFetchedData(swrData); // Update state to the newly fetched data
            }
        }, [swrData, fetchedData]);

    // Parse data from localStorage or use fetched data
    const storedData = localStorage.getItem('fetchedData');
    const data = storedData ? JSON.parse(storedData) : fetchedData;

    // Dynamically calculate image counts for the selected ward and date
    useEffect(() => {
        localStorage.setItem('selectedWard', selectedWard);
        localStorage.setItem('selectedDate', selectedDate);
        // let garbage = 0;
        // let mosquito = 0;
        if (data && Array.isArray(data)) {
            // Find the data for the selected ward
            const wardData = data.filter(item => item.ward === selectedWard); 
            if (wardData.length > 0) {
                // Now, find the data for the selected date within the selected ward
                const dateData = wardData.filter(item => item.date === selectedDate);
                const garbage = dateData.filter(item => item.type === "garbage");
                const mosquito = dateData.filter(item => item.type === "mosquito");
                const gCount = garbage.length;
                const mCount = mosquito.length;
                if (dateData) {
                    setImageCounts({ garbageCount: gCount, mosquitoCount: mCount})
                } else {
                    setImageCounts({ garbageCount: 0, mosquitoCount: 0 });
                }
            } else {
                setImageCounts({ garbageCount: 0, mosquitoCount: 0 });
            }
        }
    }, [selectedWard, selectedDate]);

    const loading = !data;
    const error = dataError;

    return (
        <GlobalStateContext.Provider
            value={{
                selectedWard,
                setSelectedWard,
                selectedDate,
                setSelectedDate,
                data: data || [], // Ensure it's an empty array if not loaded
                imageCounts,
                loading,
                error,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => {
    return useContext(GlobalStateContext);
};