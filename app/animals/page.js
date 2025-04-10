'use client'

import { useState, useEffect } from 'react';
import { getAnimalsByName } from '@/app/actions';
import SearchBar from '../components/SearchBar';

export default function AnimalList({ initialAnimals }) {
  const [animals, setAnimals] = useState(initialAnimals || []);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all animals from the API
  const fetchAllAnimals = async () => {
    const results = await getAnimalsByName('');
    setAnimals(results || []);
  };

  // Handle search functionality
  const handleSearch = async (query) => {
    setSearchQuery(query);
    
 // Reset to all animals if the query is empty
    if (query === '') {
      fetchAllAnimals();
      return;
    }

    const results = await getAnimalsByName(query);
    setAnimals(results || []);
  };

  // Fetch animals on component mount and refresh every 5 seconds
  useEffect(() => {
    fetchAllAnimals();

    const interval = setInterval(() => {
      fetchAllAnimals();
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Search bar for filtering animals */}
      <SearchBar onSearch={handleSearch} />

      {/* Display the list of animals or a fallback message */}
      {Array.isArray(animals) && animals.length > 0 ? (
        <ul className="space-y-4">
          {animals.map((animal) => (
            <li
              key={animal.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800">{animal.name}</h3>
              <p className="text-sm text-gray-500 italic">
                Scientific Name: {animal.scientificName}
              </p>
              <p className="text-sm text-gray-700">Exhibit: {animal.exhibit}</p>
              <p className="text-sm text-gray-700">Location: {animal.location}</p>
              <p className="text-sm text-gray-600">{animal.funFact}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No animals found.</p>
      )}
    </div>
  );
}