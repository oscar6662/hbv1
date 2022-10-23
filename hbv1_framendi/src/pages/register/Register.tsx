import { useState, useEffect } from 'react';

import { Tabs } from 'antd';
import { DayCareWorkerSignup } from '../../components/DaycareWorkerSignUp/DayCareWorkerSignup';
import { ParentSignUp } from '../../components/ParentSignUp/ParentSignUp';

const link = 'http://localhost:8080';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLoactions = async () => {
      setLoading(true);
      const result = await fetch(`${link}/api/locations`);

      if (!result.ok) {
        console.error('Villa!');
      } else {
        const json = await result.json();
        setLocations(json);
        console.log(json);
      }
      setLoading(false);
    };

    fetchLoactions();
  }, []);

  return (
    <>
      <div className="loginSection">
        <div className="loginContainer">
          <Tabs centered style={{ width: '95%' }} defaultActiveKey="1">
            <Tabs.TabPane tab="Nýskráning dagforeldris" key="1">
              <h2>Búa til dagforeldri</h2>
              <DayCareWorkerSignup locations={locations} loading={loading} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Nýskráning foreldris" key="2">
              <h2>Búa til foreldri</h2>
              <ParentSignUp />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Register;
