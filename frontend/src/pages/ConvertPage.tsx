import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ConvertPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const getTitle = () => {
    switch (type) {
      case 'lower': return 'Lower Case';
      case 'upper': return 'Upper Case';
      case 'camel': return 'Camel Case';
      case 'title': return 'Title Case';
      case 'inverse': return 'Inverse Case';
      case 'reverse': return 'Text Reverse';
      default: return 'Text Conversion';
    }
  };

  const handleConvert = async () => {
    try {
      const response = await fetch(`/api/convert/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
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
        {getTitle()}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 gold:bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white gold:border-gold-300"
            rows={5}
            placeholder="Enter text here..."
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Convert
        </button>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:border-gray-600 dark:text-white gold:bg-gold-50 gold:border-gold-300"
            rows={5}
            placeholder="Output will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertPage;
