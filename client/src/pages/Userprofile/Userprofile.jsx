import React, { useEffect, useState } from 'react';
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Avatar from '../../Comnponent/Avatar/Avatar';
import Editprofileform from './Edirprofileform';
import Profilebio from './Profilebio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const Userprofile = ({ slidein }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [Switch, setswitch] = useState(false);

  const users = useSelector((state) => state.usersreducer);
  const currentprofile = users.find((user) => user._id === id);
  const currentuser = useSelector((state) => state.currentuserreducer);

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const textElements = document.querySelectorAll('.joinedText');
    textElements.forEach((textElement) => {
      if (currentLanguage === 'fr') {
        textElement.style.color = 'yellow';
      } else if (currentLanguage === 'en-US') {
        textElement.style.color = 'black';
      } else if (currentLanguage === 'hi') {
        textElement.style.color = 'white';
      } else if (currentLanguage === 'zh') {
        textElement.style.color = 'white';
      } else {
        document.body.style.color = 'white';
      }
    });
  }, [currentLanguage]);

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="30px">
                {currentprofile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentprofile?.name}</h1>
                <p className="joinedText">
                  <FontAwesomeIcon icon={faBirthdayCake} /> {t('userprofilepage.joinedtext')} {moment(currentprofile?.joinedon).fromNow()}
                </p>
              </div>
            </div>
            {currentuser?.result?._id === id && (
              <button className="edit-profile-btn" type="button" onClick={() => setswitch(true)}>
                <FontAwesomeIcon icon={faPen} /> {t('userprofilepage.editprofilebutton')}
              </button>
            )}
          </div>
          {Switch ? (
            <Editprofileform currentuser={currentuser} setswitch={setswitch} />
          ) : (
            <Profilebio currentprofile={currentprofile} />
          )}
        </section>
      </div>
    </div>
  );
};

export default Userprofile;
