import './App.css';
import { useEffect, useState, useCallback } from 'react';
import './App.css';



const fetchData = async () => {
  const response = await fetch('/api');
  const data = await response.json();
  return data;
};

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataAndSetData();
  }, []);

  return (
    <div className="App">
      App
    </div>
  );
}

export default App;