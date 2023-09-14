import React, { useEffect, useState } from 'react';

import axios from "axios"

function App() {
  const [countries, setCountries] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [groupOption, setGroupOption] = useState<any>("none");
  const [isActive, setIsActive] = useState<any>(false);

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
            emoji
            languages {
              name
              code
            }
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

  // const groupedList = filteredList.filter((country) => country.languages.includes(groupOption))

  const groupedList =
    groupOption === 'none'
      ? filteredList
      : filteredList.filter((country) =>
        country.languages.some((language: any) => language.name === groupOption)
      );

  const handleClick = (arg:any) => {
    if (selectedCountry === arg) {
      setSelectedCountry('');
    } else {
      setSelectedCountry(arg)
    }
  }



  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name..."
        value={filtered}
        onChange={(e) => setFiltered(e.target.value)} />
      <select
        value={groupOption}
        onChange={(e) => setGroupOption(e.target.value)}
      >
        <option value="none">None</option>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="Japanese">Japanese</option>
        <option value="Turkish">Turkish</option>
        <option value="French">French</option>
        <option value="Arabic">Arabic</option>
      </select>
      {groupedList.map((item) => (
        <div className={`cursor-pointer ${selectedCountry === item.name ? "bg-slate-900" : ""}`} onClick={()=>handleClick(item.name)} key={item.code}>{item.name}</div>

      ))}
    </div>
  );
}

export default App;