import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/user-Info');
        setUserInfo(response.data);
        const data = response.data;
        if(data.ipAddress === '::1'){
            data.ipAddress = '127.0.0.1';
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>User Info</h2>
      {userInfo ? (
        <div>
          <p>Browser: {userInfo.browser}</p>
          <p>OS: {userInfo.os}</p>
          <p>Device: {userInfo.device}</p>
          <p>IP Address: {userInfo.ipAddress}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserInfo;
