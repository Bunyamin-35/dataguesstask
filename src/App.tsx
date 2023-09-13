import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
  const [continents, setContinents] = useState<any[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const options = {
      method: 'POST',
      url: 'https://countries.trevorblades.com/',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        query: `{
          continents {
            name
            code
          }
        }`
      }
    };
    
    try {
      const response = await axios.request(options);
      const res = response.data;
      setContinents(res.data.continents);
      console.log("res:", res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      {continents.map((item) => (
        <div key={item.code}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
