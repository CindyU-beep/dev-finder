import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDog = () => {
      fetch('https://dog.ceo/api/breeds/image/random/3') // Fetch 3 dog images
        .then((response) => response.json())
        .then((data) => setDogs(data.message));
    };

    fetchDog();
    const interval = setInterval(fetchDog, 3000); // Fetch new dog images every 3 secs

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="hero flex flex-col justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4">404 Error</h1>
        <p className="text-2xl">
          Oops! It seems like the page you're looking for doesn't exist.
        </p>
        <p className="text-2xl">
          But don't worry, we've got some cute dogs to keep you company!
        </p>
      </div>
      <div className="flex justify-center mt-8">
        {dogs.map((dog, index) => (
          <img key={index} src={dog} alt="Dog" className="w-64 h-64 mx-2" />
        ))}
      </div>
      <Link to="/" className="btn btn-neutral btn-lg mt-10">
        <FaHome />
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
