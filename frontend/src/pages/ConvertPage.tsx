import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button } from '@/components/design-system';

const ConvertPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ 
              backgroundColor: 'var(--bg-primary)', 
              color: 'var(--text-primary)',
              borderColor: 'var(--text-secondary)'
            }}
            rows={5}
            placeholder="Enter text here..."
          />
        </div>

        <Button
          onClick={handleConvert}
          fullWidth
          loading={loading}
          className="mb-4"
        >
          Convert
        </Button>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full p-3 border rounded-lg"
            style={{ 
              backgroundColor: 'var(--bg-primary)', 
              color: 'var(--text-primary)',
              borderColor: 'var(--text-secondary)'
            }}
            rows={5}
            placeholder="Output will appear here..."
          />
        </div>
      </div>
    </div>
  );
};

export default ConvertPage;
