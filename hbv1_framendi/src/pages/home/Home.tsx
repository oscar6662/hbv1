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
  const [data, setData] = useState<DaycareWorker[] | []>([]);
  const [location, setLocation] = useState<String | undefined>(undefined);
  const [loading, setLoading] = useState<Boolean>(false);
  const [noContent, setNoContent] = useState<Boolean>(false);

  useEffect(() => {
    fetchDaycareWorkers();
  }, [location]);

  const fetchDaycareWorkers = async () => {
    setLoading(true)
    const daycareWorkers = await fetch(
      `${link}/api/daycareworkers${location ? `?location=${location}` : ''}`
    );

    if (!daycareWorkers.ok) {
      console.error('Villa!');}
    else {
      if (daycareWorkers.status === 204) {
        setNoContent(true);}
      else {
        const json = await daycareWorkers.json();
        setData(json);
        setNoContent(false)
      }
    }
    setLoading(false)
  };

  const handleSearchByLocation = async () => {
    setLoading(true);
    await fetchDaycareWorkers();
    setLoading(false);
  };

  return (
    <>
      <h1>PETRA</h1>
      <p>
        Velkomin á PETRU, hér er haldið utan um allt sem varðar skráningu og
        utanumhald dagvistar hjá dagforeldri.
      </p>

      <div className="searchBox">
        <label htmlFor="fullName">Leita eftir staðsetningu: </label>
        <select
          onChange={(e) => setLocation(e.target.value)}
          name="location"
          id="location"
        >
          {locations.map((town: String, i: Number) => {
            return (
              <option key={`option-town-${i}`} value={town.toString()}>
                {town}
              </option>
            );
          })}
        </select>

        {/*<div>*/}
        {/*  <input type="submit" onClick={handleSearchByLocation} />*/}
        {/*</div>*/}
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="daycareWorkers">
          {noContent ? (
            <h2>Ekkert dagforeldri fannst á þessari staðsetningu</h2>
          ) : (
            data.map((dcw: DaycareWorker, i: Number) => {
              return (
                <div key={`daycare-worker-item-${i}`}>
                  <h2>Nafn: {dcw.fullName}</h2>
                  <h2>Staðsetning: {dcw.location}</h2>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default Home;
