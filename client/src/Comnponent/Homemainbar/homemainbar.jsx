import React, {useEffect} from 'react';
import './Homemainbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Questionlist from './Questionlist';
import { useTranslation } from 'react-i18next';

function Homemainbar() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.currentuserreducer);
  const location = useLocation();
  const navigate = useNavigate();
  const questionlist = useSelector((state) => state.questionreducer);

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
      if (currentLanguage === 'fr') {
          document.body.style.backgroundColor = 'yellow';
        }
        else if(currentLanguage === 'en-US'){
          document.body.style.color = 'black'
        }
        else if (currentLanguage === 'hi') {
          document.body.style.backgroundColor = 'blue';
          document.body.style.color = 'white'
        } else if (currentLanguage === 'zh') {
          document.body.style.backgroundColor = 'green';
        } else {
          document.body.style.backgroundColor = 'white';
        }
      }, [currentLanguage]);




      useEffect(() => {
        const questions = document.querySelectorAll('.main-bar');
        questions.forEach(questionslist => {
          if(currentLanguage === 'fr'){
            questionslist.style.color = 'black';
          } else if(currentLanguage === 'hi'){
            questionslist.style.color = 'white';
          } else if(currentLanguage === 'zh'){
            questionslist.style.color = 'white';
          } else{
            questionslist.style.color = 'black';
          }
        })
      },[])
  
  const checkauth = () => {
    if (user === null) {
      alert(t('homemainbar.usernullAlert'));
      navigate("/Auth");
    } else {
      navigate("/Askquestion");
    }
  };

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (
          <h1>{t('homemainbar.mainHeader.topQuestions')}</h1>
        ) : (
          <h1>{t('homemainbar.mainHeader.allQuestions')}</h1>
        )}
        <button className="ask-btn" onClick={checkauth}>{t('homemainbar.askQuestionBtn')}</button>
      </div>
      <div>
        {questionlist.data === null ? (
          <h1>{t('homemainbar.h1loading')}</h1>
        ) : (
          <>
            <p className='questionTag'>{questionlist.data.length} {t('homemainbar.questions')}</p>
            {questionlist.data.length === 0 ? (
              <p>{t('homemainbar.noQuestions')}</p>
            ) : (
              <Questionlist questionlist={questionlist.data} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Homemainbar;
