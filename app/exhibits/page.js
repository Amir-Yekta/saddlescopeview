'use client'

import { useState, useEffect } from 'react';
import { getExhibitsByName } from '@/app/actions';
import SearchBar from '../components/SearchBar';

export default function ExhibitList({ initialExhibits }) {
  const [exhibits, setExhibits] = useState(initialExhibits || []);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAllExhibits = async () => {
    const results = await getExhibitsByName('');
    setExhibits(results || []);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query); 

    if (query === '') {
      fetchAllExhibits(); 
      return;
    }

    const results = await getExhibitsByName(query);
    setExhibits(results || []);
  };

  useEffect(() => {
    fetchAllExhibits();

    const interval = setInterval(() => {
      fetchAllExhibits(); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <SearchBar onSearch={handleSearch} />

      {Array.isArray(exhibits) && exhibits.length > 0 ? (
        <ul className="space-y-4">
          {exhibits.map((exhibit) => (
            <li key={exhibit.id} className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800">{exhibit.exhibitName}</h3>
              <p className="text-sm text-gray-500 italic">Description: {exhibit.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No exhibits found.</p>
      )}
    </div>
  );
}
