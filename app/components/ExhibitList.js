'use client';

import { useState, useEffect } from 'react';
import { getExhibitsByName } from '@/app/actions';

export default function ExhibitList({ initialExhibits }) {
  const [exhibits, setExhibits] = useState(initialExhibits || []);

  // Refresh the exhibit list every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const refreshed = await getExhibitsByName('');
      setExhibits(refreshed || []);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Update the exhibit list when the initialExhibits prop changes
  useEffect(() => {
    setExhibits(initialExhibits || []);
  }, [initialExhibits]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Display the list of exhibits or a fallback message */}
      {Array.isArray(exhibits) && exhibits.length > 0 ? (
        <ul className="space-y-4">
          {exhibits.map((exhibit) => (
            <li
              key={exhibit.id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800">{exhibit.exhibitName}</h3>
              <p className="text-sm text-gray-500 italic">
                Description: {exhibit.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No exhibits found.</p>
      )}
    </div>
  );
}
