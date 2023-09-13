import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios"

function App() {
  const [countries, setCountries] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any>("");

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const options = {
      method: 'POST',
      url: 'https://countries.trevorblades.com/graphql',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        query: `{
          countries {
            code
            name
          }
        }`
      }
    };

    try {
      const response = await axios.request(options);
      const res = response.data;
      setCountries(res.data.countries);
      console.log("res:", res);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredList = countries.filter((country) =>
    country.name.toLowerCase().includes(filtered.toLowerCase())
  )

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Filter by name..."
        value={filtered}
        onChange={(e) => setFiltered(e.target.value)} />
      {filteredList.map((item) => (
        <div key={item.code}>{item.name}</div>
      ))}
    </div>
  );
}

export default App;