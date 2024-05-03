import './App.css';
import { useEffect, useState, useCallback } from 'react';
import './App.css';



const fetchData = async () => {
  // const response = await fetch('https://deeploy-test.vercel.app/api');
  // const response = await fetch(`${process.env.REACT_APP_DEEPLOY_SERVER_URL}/api`);
  const response = await fetch('/api');
  const data = await response.json();
  return data;
};

//Delete this function
const fetchOtherData = async () => {
  const response = await fetch('/api/posts');
  const data = await response.json();
  return data;
}

function App() {
  const [data, setData] = useState([{}]);
  const [otherData, setOtherData] = useState([{}]);

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      console.log('fetch is called')
      console.log(process.env.REACT_APP_DEEPLOY_SERVER_URL, 'DEEPLOY_SERVER_URL')
      try {
        const fetchedData = await fetchData();
        console.log(fetchedData, 'FETCHED DATA')
        setData(fetchedData);
      } catch (e) {
        console.log(e, 'ERROR');
      }
    };

    //Delete this function
    const fetchOtherDataAndSetOtherData = async () => {
      console.log('fetch is called')
      console.log(process.env.REACT_APP_DEEPLOY_SERVER_URL, 'DEEPLOY_SERVER_URL')
      try {
        const fetchedData = await fetchOtherData();
        console.log(fetchedData, 'FETCHED DATA')
        setOtherData(fetchedData);
      } catch (e) {
        console.log(e, 'ERROR');
      }
    };


    fetchDataAndSetData();
    //Delete this function call
    fetchOtherDataAndSetOtherData();
  }, []);

  return (
    <div className="App">
      <h1>APP</h1>
      {data.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
      <p>Other Data</p>
      {otherData.map((post) => (
        <div key={post.id}>
          <p>{post.post}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

//"proxy": "https://deeploy-test.vercel.app",


// {
//   "version": 2,
//   "builds": [
//       {
//           "src": "./index.js",
//           "use": "@vercel/node"
//       }
//   ],
//   "routes": [
//       {
//           "src": "/(.*)",
//           "dest": "index.js"
//       }
//   ]
// }