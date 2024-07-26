import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import Avatar from '../../Comnponent/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteanswer } from '../../action/question';
import { useTranslation } from 'react-i18next';

const translationCache = {};

const Displayanswer = ({ question, handleshare }) => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.currentuserreducer);
  const { id } = useParams();
  const dispatch = useDispatch();

  const [translatedAnswers, setTranslatedAnswers] = useState({});

  const currentLanguage = localStorage.getItem('i18nextLng') || 'en';

  const translateAnswerBody = useCallback(async (answerBody, answerId) => {
    if (currentLanguage === 'en') {
      setTranslatedAnswers((prev) => ({ ...prev, [answerId]: answerBody }));
      return;
    }

    const cacheKey = `${answerBody}|${currentLanguage}`;
    if (translationCache[cacheKey]) {
      setTranslatedAnswers((prev) => ({ ...prev, [answerId]: translationCache[cacheKey] }));
      return;
    }

    //************ Taken help with ChatGpt for backend translation ***************
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(answerBody)}&langpair=en|${currentLanguage}`);
      const data = await response.json();
      if (data.responseStatus === 200) {
        const newTranslation = data.responseData.translatedText;
        translationCache[cacheKey] = newTranslation;
        setTranslatedAnswers((prev) => ({ ...prev, [answerId]: newTranslation }));
      } else {
        setTranslatedAnswers((prev) => ({ ...prev, [answerId]: answerBody }));
      }
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedAnswers((prev) => ({ ...prev, [answerId]: answerBody }));
    }
  }, [currentLanguage]);

  useEffect(() => {
    question.answer.forEach((ans) => {
      translateAnswerBody(ans.answerbody, ans._id);
    });
  }, [question.answer, translateAnswerBody]);

  const handledelete = (answerid, noofanswers) => {
    dispatch(deleteanswer(id, answerid, noofanswers - 1));
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{translatedAnswers[ans._id] || ans.answerbody}</p>
          <div className="question-actions-user">
            <div>
              <button type='button' onClick={handleshare}>{t('displayAnswer.shareText')}</button>
              {user?.result?._id === ans?.userid && (
                <button type='button' onClick={() => handledelete(ans._id, question.noofanswers)}>{t('displayAnswer.deleteText')}</button>
              )}
            </div>
            <div>
              <p>{t('displayAnswer.answeredText')} {moment(ans.answeredon).fromNow()}</p>
              <Link to={`Users/${ans.userid}`} className='user-link' style={{ color: "#0086d8" }}>
                <Avatar backgroundColor="lightgreen" px="2px" py="2px" borderRadius="2px">
                  {ans.useranswered?.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.useranswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Displayanswer;
