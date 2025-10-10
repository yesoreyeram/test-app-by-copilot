import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MathPage: React.FC = () => {
  const { operation } = useParams<{ operation: string }>();
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | string>('');

  const getTitle = () => {
    switch (operation) {
      case 'add': return 'Addition';
      case 'subtract': return 'Subtraction';
      case 'multiply': return 'Multiplication';
      case 'divide': return 'Division';
      default: return 'Math Operation';
    }
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch(`/api/math/${operation}/${num1}/${num2}`);

      if (response.ok) {
        const data = await response.json();
        setResult(data.output);
      } else {
        const error = await response.json();
        setResult(error.meta?.reason || 'Error occurred');
      }
    } catch (error) {
      setResult('Error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white gold:text-gold-900">
        {getTitle()}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 gold:bg-white rounded-lg shadow-md p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              First Number
            </label>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white gold:border-gold-300"
              placeholder="Enter first number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Second Number
            </label>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white gold:border-gold-300"
              placeholder="Enter second number"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-4"
        >
          Calculate
        </button>

        {result !== '' && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 gold:bg-gold-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Result:</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white gold:text-gold-900">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathPage;
