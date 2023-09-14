import React, { useEffect, useState } from 'react';

import axios from "axios"

function App() {
  const [countries, setCountries] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState<any>("");
  const [groupOption, setGroupOption] = useState<any>("none");
  const [lastSelectedColor, setLastSelectedColor] = useState<string | null>(null);


  const COLORS = ['bg-red-400', 'bg-blue-400'];

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCountry(Math.min(9, countries.length - 1));
    }
  }, [countries]);

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


      const selectItem = (index: number) => {
        if (selectedCountry === index) {
          setSelectedCountry(null);
          setLastSelectedColor(null);
        } else {
          const nextColor = COLORS.find((color) => color !== lastSelectedColor) || COLORS[0];
          setSelectedCountry(index);
          setLastSelectedColor(nextColor);
        }
      };



  return (
    <div>
      <div className="m-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Countries</label>
        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={filtered}
          onChange={(e) => setFiltered(e.target.value)} placeholder="Filter by name..." />
      </div>
      <div className='m-6'>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select
          value={groupOption}
          onChange={(e) => setGroupOption(e.target.value)}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="none">None</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="Japanese">Japanese</option>
          <option value="Turkish">Turkish</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
        </select>
      </div>
      <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 p-4 mt-16">
        <h2 className="flex gap-3 items-center m-auto text-lg font-bold md:flex-col md:gap-2">
          Country List
        </h2>
        <ul className="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
          {groupedList.map((item, index) =>
            <li
              key={item.code}
              className={`p-4 cursor-pointer w-full rounded-md ${selectedCountry === index ? (lastSelectedColor || COLORS[0]) : 'bg-gray-100'
                }`}
              onClick={() => selectItem(index)}
            >
              {item.name}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;