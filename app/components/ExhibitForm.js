'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createExhibit } from "@/app/actions";

const ExhibitForm = () => {
  const [exhibitName, setExhibitName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateExhibit = async () => {
    if (!exhibitName) {
      console.error("Exhibit name is required");
      return;
    }

    setLoading(true);
    try {
      await createExhibit({
        exhibitName,
        description,
      });

      setExhibitName('');
      setDescription('');

      console.log("Exhibit created successfully");
      router.refresh();
    } catch (error) {
      console.error('Error creating exhibit:', error);
      console.error(error?.message || "Failed to create exhibit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-6 w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Create Exhibit</h2>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleCreateExhibit(); }}>
        <div>
          <label htmlFor="exhibitName" className="block text-sm font-medium text-gray-700 mb-1">
            Exhibit Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="exhibitName"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            value={exhibitName}
            onChange={(e) => setExhibitName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="funFact" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded px-3 py-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Create Exhibit'}
        </button>
      </form>
    </div>
  );
}

export default ExhibitForm;