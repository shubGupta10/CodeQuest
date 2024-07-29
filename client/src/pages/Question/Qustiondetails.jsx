import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import copy from "copy-to-clipboard";
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import './Question.css';
import Avatar from '../../Comnponent/Avatar/Avatar';
import Displayanswer from './Displayanswer';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { deletequestion, votequestion, postanswer } from '../../action/question';
import { useTranslation } from 'react-i18next';

//taken help with claude.AI for an issue to resolve
const translationCache = {};

const Qustiondetails = () => {
    const [answer, setanswer] = useState("");
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const questionlist = useSelector((state) => state.questionreducer);
    const { id } = useParams();
    const user = useSelector((state) => state.currentuserreducer);
    const location = useLocation();
    const navigate = useNavigate();
    const url = "https://codequest-emf6.onrender.com";
    const [translatedQuestionBody, setTranslatedQuestionBody] = useState('');

    const currentLanguage = localStorage.getItem('i18nextLng') || 'en';

    const translateQuestionBody = useCallback(async (questionBody) => {
        if (currentLanguage === 'en') {
            setTranslatedQuestionBody(questionBody);
            return;
        }

        const cacheKey = `${questionBody}|${currentLanguage}`;
        if (translationCache[cacheKey]) {
            setTranslatedQuestionBody(translationCache[cacheKey]);
            return;
        }

        
        //************ Taken help with ChatGpt for backend translation ***************
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(questionBody)}&langpair=en|${currentLanguage}`);
            const data = await response.json();
            if (data.responseStatus === 200) {
                const newTranslation = data.responseData.translatedText;
                translationCache[cacheKey] = newTranslation;
                setTranslatedQuestionBody(newTranslation);
            } else {
                setTranslatedQuestionBody(questionBody);
            }
        } catch (error) {
            console.error('Translation failed:', error);
            setTranslatedQuestionBody(questionBody);
        }
    }, [currentLanguage]);

    useEffect(() => {
        if (questionlist.data) {
            const question = questionlist.data.find((q) => q._id === id);
            if (question) {
                translateQuestionBody(question.questionbody);
            }
        }
    }, [questionlist.data, id, translateQuestionBody]);

    const handlepostans = (e, answerlength) => {
        e.preventDefault();
        if (user === null) {
            alert("Login or Signup to answer a question");
            navigate('/Auth');
        } else {
            if (answer === "") {
                alert("Enter an answer before submitting");
            } else {
                dispatch(postanswer({
                    id,
                    noofanswers: answerlength + 1,
                    answerbody: answer,
                    useranswered: user.result.name
                }));
                setanswer("");
            }
        }
    }

    const handleshare = () => {
        copy(url + location.pathname);
        alert("Copied url: " + url + location.pathname);
    }

    const handledelete = () => {
        dispatch(deletequestion(id, navigate));
    }

    const handleupvote = () => {
        if (user === null) {
            alert("Login or Signup to answer a question");
            navigate('/Auth');
        } else {
            dispatch(votequestion(id, "upvote"));
        }
    }

    const handledownvote = () => {
        if (user === null) {
            alert("Login or Signup to answer a question");
            navigate('/Auth');
        } else {
            dispatch(votequestion(id, "downvote"));
        }
    }

    return (
        <div className="question-details-page">
            {questionlist.data === null ? (
                <h1>{t('QuestionDetails.loadingtext')}</h1>
            ) : (
                <>
                    {questionlist.data.filter((question) => question._id === id).map((question) => (
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questiontitile}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvote} alt="" width={18} className='votes-icon' onClick={handleupvote} />
                                        <p>{question.upvote.length - question.downvote.length}</p>
                                        <img src={downvote} alt="" width={18} className='votes-icon' onClick={handledownvote} />
                                    </div>
                                    <div style={{ width: "100%" }}>
                                        <p className='question-body'>{translatedQuestionBody}</p>
                                        <div className="question-details-tags">
                                            {question.questiontags.map((tag) => (
                                                <p key={tag}>{tag}</p>
                                            ))}
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type='button' onClick={handleshare}>
                                                    {t('QuestionDetails.shareText')}
                                                </button>
                                                {user?.result?._id === question?.userid && (
                                                    <button type='button' onClick={handledelete}>{t('QuestionDetails.deleteText')}</button>
                                                )}
                                            </div>
                                            <div>
                                                <p>{t('QuestionDetails.askedtext')} {moment(question.askedon).fromNow()}</p>
                                                <Link to={`Users/${question.userid}`} className='user-link' style={{ color: "#0086d8" }}>
                                                    <Avatar backgroundColor="orange" px="8px" py="5px" borderRadius="4px">
                                                        {question.userposted?.charAt(0)?.toUpperCase()}
                                                    </Avatar>
                                                    <div>{question.userposted}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {question.noofanswers !== 0 && (
                                <section>
                                    <h3>{question.noofanswers} {t('QuestionDetails.answerText')}</h3>
                                    <Displayanswer key={question._id} question={question} handleshare={handleshare} />
                                </section>
                            )}
                            <section className="post-ans-container">
                                <h3>{t('QuestionDetails.yourAnstext')}</h3>
                                <form onSubmit={(e) => {
                                    handlepostans(e, question.answer.length)
                                }}>
                                    <textarea name="" id="" cols="30" rows="10" value={answer} onChange={(e) => setanswer(e.target.value)}></textarea>
                                    <br />
                                    <input type="submit" className="post-ans-btn" value={t('QuestionDetails.postAnsBtn')} />
                                </form>
                                <p>{t('QuestionDetails.browserOtherQues')}
                                    {question.questiontags.map((tag) => (
                                        <Link to="/Tags" key={tag} className='ans-tag'>
                                            {" "}
                                            {tag}{" "}
                                        </Link>
                                    ))}{" "}
                                    or
                                    <Link to="/Askquestion" style={{ textDecoration: "none", color: "#009dff" }}>
                                        {" "}
                                        {t('QuestionDetails.askYourQues')}
                                    </Link>
                                </p>
                            </section>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Qustiondetails;
