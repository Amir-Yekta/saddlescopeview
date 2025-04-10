'use client'

import { useState, useEffect } from 'react';
import { getAnimalsByName } from '@/app/actions';
import SearchBar from '../components/SearchBar';

export default function AnimalList({ initialAnimals }) {
  const [animals, setAnimals] = useState(initialAnimals || []);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllAnimals = async () => {
    const results = await getAnimalsByName('');
    setAnimals(results || []);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query); 

    if (query === '') {
      fetchAllAnimals(); 
      return;
    }

    const results = await getAnimalsByName(query);
    setAnimals(results || []);
  };

  useEffect(() => {
    fetchAllAnimals();

    const interval = setInterval(() => {
      fetchAllAnimals(); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <SearchBar onSearch={handleSearch} />

      {Array.isArray(animals) && animals.length > 0 ? (
        <ul className="space-y-4">
          {animals.map((animal) => (
            <li key={animal.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800">{animal.name}</h3>
              <p className="text-sm text-gray-500 italic">Scientific Name: {animal.scientificName}</p>
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
