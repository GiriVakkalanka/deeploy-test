import './App.css';
import { useEffect, useState, useCallback } from 'react';
import './App.css';



const fetchData = async () => {
  const response = await fetch('https://deeploy-test.vercel.app/api');
  const data = await response.json();
  return data;
};

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      console.log('fetch is called')
      try {
        const fetchedData = await fetchData();
        console.log(fetchedData, 'FETCHED DATA')
        setData(fetchedData);
      } catch (e) {
        console.log(e, 'ERROR');
      }
    };

    fetchDataAndSetData();
  }, []);

  return (
    <div className="App">
      <h1>APP</h1>
      {data.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

//"proxy": "https://deeploy-test.vercel.app",