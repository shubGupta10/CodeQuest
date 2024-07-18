import React, { useEffect } from 'react';
import './Users.css';
import User from './User';
import { useSelector } from 'react-redux';

const Userslist = () => {
  const currentLanguage = localStorage.getItem('i18nextLng');
  const users = useSelector((state) => state.usersreducer);

  useEffect(() => {
    const userList = document.querySelectorAll('.user-profile-link');
    userList.forEach((user) => {
      if (currentLanguage === 'fr') {
        user.style.color = 'black';
      } else if (currentLanguage === 'en-US') {
        user.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        user.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        user.style.color = 'white';
      } else {
        user.style.color = 'white';
      }
    });
  }, [currentLanguage]);

  useEffect(() => {
    const usersListbg = document.querySelectorAll('.user-profile-link h3');
    usersListbg.forEach((usersbg) => {
      if (currentLanguage === 'fr') {
        usersbg.style.backgroundColor = 'white';
      } else if (currentLanguage === 'en-US') {
        usersbg.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        usersbg.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        usersbg.style.color = 'white';
        usersbg.style.backgroundColor = 'black'
      } else {
        usersbg.style.color = 'white';
        usersbg.style.backgroundColor = 'black'
      }
    });
  }, [currentLanguage]);

  return (
    <div className="user-list-container">
      {users.map((user) => (
        <User user={user} key={user?._id} />
      ))}
    </div>
  );
};

export default Userslist;
