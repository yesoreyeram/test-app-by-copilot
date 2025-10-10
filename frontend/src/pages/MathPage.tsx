import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button } from '@/components/design-system';

const MathPage: React.FC = () => {
  const { operation } = useParams<{ operation: string }>();
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | string>('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        {getTitle()}
      </h1>
      
      <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            label="First Number"
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
            fullWidth
          />

          <Input
            label="Second Number"
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
            fullWidth
          />
        </div>

        <Button
          onClick={handleCalculate}
          fullWidth
          loading={loading}
          className="mb-4"
        >
          Calculate
        </Button>

        {result !== '' && (
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Result:</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathPage;
