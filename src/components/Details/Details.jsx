import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader from react-spinners

const DetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const { category, ward, date } = location.state || {};

  const [loading, setLoading] = useState(true); // Loading state
  const [data, setData] = useState([]);
  const [filteredLoading, setFilteredLoading] = useState(true); // New state for filtered data loading
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from local storage
    setLoading(true); // Set loading to true when data fetching starts
    const storedData = localStorage.getItem("fetchedData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
        setLoading(false); // Set loading to false when data fetching is done
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
        setLoading(false); // Set loading to false if there is an error
      }
    } else {
      console.error("No data found in local storage.");
      setLoading(false); // Set loading to false if no data is found in local storage
    }
  }, []);

  const filteredData = useMemo(() => {
    const result = data.filter(
      (item) =>
        item.ward === ward && item.date === date && item.type === category
    );
    setFilteredLoading(false); // Set filtered loading to false once filtering is complete
    return result;
  }, [data, ward, date, category]);

  const cardData = useMemo(() => {
    if (!Array.isArray(filteredData)) return [];
    return filteredData.map((item) => ({
      category: item.type,
      latitude: item.latitude,
      longitude: item.longitude,
      imageUrl: item.imageUrl,
    }));
  }, [filteredData]);

  useEffect(() => {
    // Simulate loading or fetching process for the image
    const timer = setTimeout(() => {
      setLoading(false); // Turn off the loading state once data is ready
    }, 2000); // Adjust the delay as needed for your actual loading time

    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, []);

  const handleImageLoaded = () => {
    setIsLoading(false); // Once the image is loaded, hide the skeleton
  };

  const handleImageClick = (item) => {
    setSelectedImage(item);
    setIsModalOpen(true); // Open the modal when an image is clicked
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const openGoogleMaps = (latitude, longitude) => {
    if (latitude && longitude) {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(googleMapsUrl, "_blank");
    } else {
      alert("Location coordinates are not available.");
    }
  };
  // Manage the scrolling behavior of the body
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  // Conditionally render loader or details page based on the loading state
  if (loading || filteredLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={"#123abc"} loading={loading} size={100} />{" "}
        {/* Loader component */}
      </div>
    );
  }

  return (
    <div className="container mt-9 mx-auto flex flex-col gap-9 p-4">
      {/* Back Button */}
      <button
        className="absolute top-4 left-7 text-blue-600 text-3xl font-extrabold hover:text-blue-800"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        ⬅️
      </button>

      {/* Ward and Date */}
      <div className="text-center">
        <span className="text-blue-600 bg-blue-100 px-6 border border-blue-700 py-2 rounded-full text-xl">
          Ward {ward} | {date}
        </span>
      </div>

      {/* Category Title */}
      <h1 className="text-center text-3xl font-bold text-gray-800">
        {category === "garbage"
          ? "Garbage Vulnerable Points"
          : "Mosquito Breeding Hotspots"}
      </h1>


      <div className="flex flex-wrap justify-center gap-4">
        {cardData.length > 0 ? (
          cardData.map((item, index) => (
            <div
              key={index}
              className="relative bg-white p-4 rounded-xl shadow-xl cursor-pointer"
              style={{ width: "320px", height: "240px" }} // Set a fixed size to avoid layout shifts
            >
              {isLoading && (
                <div className="absolute inset-0 bg-gray-100 rounded-xl flex justify-center items-center">
                  <svg
                    className="text-gray-300 animate-spin"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-900"
                    ></path>
                  </svg>
                </div>
              )}
              <img
                src={item.imageUrl}
                alt={`for ${category}`}
                className={`w-full h-full object-cover rounded-xl transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onClick={() => handleImageClick(item)}
                onLoad={handleImageLoaded}
                loading="lazy" // Enable lazy loading
                style={{ display: "block" }} // Ensure images are block elements to prevent inline gaps
              />
            </div>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
          <button
            className="absolute top-4 right-10 text-white text-2xl hover:text-white/50"
            onClick={closeModal}
          >
            &#10005; {/* Close (X) symbol */}
          </button>
          <div className="relative p-10 pt-20 rounded-xl max-w-3xl w-full">
            <div className="flex justify-center items-center">
              <img
                src={selectedImage.imageUrl}
                alt={`Large view of ${category}`}
                className="w-full max-h-screen object-contain"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() =>
                  openGoogleMaps(
                    selectedImage.latitude,
                    selectedImage.longitude
                  )
                }
              >
                Go to Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
