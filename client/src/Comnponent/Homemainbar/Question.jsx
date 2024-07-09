import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';

const translationCache = {};

const Question = ({ question }) => {
  const { t, i18n } = useTranslation();
  const [translatedTitle, setTranslatedTitle] = useState(question.questiontitle);

  const translateTitle = useCallback(async () => {
    const storedLang = localStorage.getItem('i18nextLng') || 'en';
    if (storedLang === 'en') {
      setTranslatedTitle(question.questiontitle);
      return;
    }

    const cacheKey = `${question.questiontitle}|${storedLang}`;
    if (translationCache[cacheKey]) {
      setTranslatedTitle(translationCache[cacheKey]);
      return;
    }

    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(question.questiontitle)}&langpair=en|${storedLang}`);
      const data = await response.json();
      if (data.responseStatus === 200) {
        const newTranslation = data.responseData.translatedText;
        translationCache[cacheKey] = newTranslation;
        setTranslatedTitle(newTranslation);
      } else {
        setTranslatedTitle(question.questiontitle);
      }
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslatedTitle(question.questiontitle);
    }
  }, [question.questiontitle]);

  useEffect(() => {
    translateTitle();
  }, [translateTitle, i18n.language]);

  const voteCount = (question.upvote?.length || 0) - (question.downvote?.length || 0);

  return (
    <div className="display-question-container">
      <div className="display-votes-ans">
        <p>{voteCount}</p>
        <p>{t("QuestionHome.votes")}</p>
      </div>
      <div className="display-votes-ans">
        <p>{t("QuestionHome.answersCount", { count: question.noofanswers || 0 })}</p>
        <p>{t("QuestionHome.answers")}</p>
      </div>
      <div className="display-question-details">
        <Link to={`/Question/${question._id}`} className="question-title-link">
          {translatedTitle.length > (window.innerWidth <= 400 ? 70 : 90)
            ? translatedTitle.substring(0, window.innerWidth <= 400 ? 70 : 90) + "..."
            : translatedTitle}
        </Link>
        <div className="display-tags-time">
          <div className="display-tags">
            {question.questiontags?.map((tag) => (
              <p key={tag}>{t(`tags.${tag}`, tag)}</p>
            ))}
          </div>
          <p className="display-time">
            {t("QuestionHome.asked")} {formatDistanceToNow(new Date(question.askedon))}{" "}
            {question.userposted}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Question;