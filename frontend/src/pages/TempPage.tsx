import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const TempPage: React.FC = () => {
  const { conversion } = useParams<{ conversion: string }>();
  const { isAuthenticated } = useAuth();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<number | string>('');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const isCtoF = conversion === 'c-to-f';
  const title = isCtoF ? 'Celsius to Fahrenheit' : 'Fahrenheit to Celsius';

  const handleConvert = async () => {
    try {
      const from = isCtoF ? 'c' : 'f';
      const to = isCtoF ? 'f' : 'c';
      
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/temp/${from}/${to}/${input}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOutput(data.output);
      } else {
        setOutput('Error occurred');
      }
    } catch (error) {
      setOutput('Error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white gold:text-gold-900">
        {title}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 gold:bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Temperature ({isCtoF ? '°C' : '°F'})
          </label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white gold:border-gold-300"
            placeholder={`Enter temperature in ${isCtoF ? 'Celsius' : 'Fahrenheit'}`}
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Convert
        </button>

        {output !== '' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 gold:bg-gold-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Result:</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white gold:text-gold-900">
              {output} {isCtoF ? '°F' : '°C'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TempPage;
