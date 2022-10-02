import { useState, useEffect } from 'react';

interface DaycareWorker {
  address: String;
  children: [];
  experienceInYear: Number;
  firstName: String;
  fullName: String;
  id: Number;
  lastName: String;
  location: String;
  locationCode: Number;
  mobile: String;
  ssn: String;
}

const locations = [
  'Hafnarfjörður',
  'Garðabær',
  'Reykjavík',
  'Kópavogur',
  'Mosfellsbær',
  'Keflavík',
];

const link = 'http://localhost:8080';

const Home = () => {
  const [data, setData] = useState<DaycareWorker | []>([]);
  const [location, setLocation] = useState<String | undefined>(undefined);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    fetchDaycareWorkers();
  }, []);

  const fetchDaycareWorkers = async () => {
    const daycareWorkers = await fetch(
      `${link}/api/daycareworkers${location ? `?location=${location}` : ''}`
    );

    if (!daycareWorkers.ok) {
      console.error('Villa!');
    } else {
      const json = await daycareWorkers.json();
      setData(json);
    }
  };

  return (
    <>
      <h1>PETRA</h1>
      <p>
        Velkomin á PETRU, hér er haldið utan um allt sem varðar skráningu og
        utanumhald dagvistar hjá dagforeldri.
      </p>

      <div className="searchBox">
        <label htmlFor="fullName">Search by location: </label>
        <select
          onChange={(e) => setLocation(e.target.value)}
          name="cars"
          id="cars"
        >
          {locations.map((town: String, i: Number) => {
            return (
              <option key={i} value={`${town}`}>
                {town}
              </option>
            );
          })}
        </select>
      </div>

      <div className="daycareWorkers">
        {data.map((dcw: DaycareWorker, i: Number) => {
          return (
            <div key={i}>
              <h2>Nafn: {dcw.fullName}</h2>
              <h2>Staðdesning: {dcw.location}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
