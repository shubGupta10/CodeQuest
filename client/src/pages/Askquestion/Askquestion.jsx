import React, { useEffect, useState } from 'react'
import './Askquestion.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { askquestion } from '../../action/question'
import {useTranslation} from 'react-i18next'

const Askquestion = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const user = useSelector((state)=>state.currentuserreducer)
    const [questiontitle, setquestiontitle] = useState("");
    const [questionbody, setquestionbody] = useState("");
    const [questiontag, setquestiontags] = useState("")
    const {t}=  useTranslation();


    const currentLanguage = localStorage.getItem('i18nextLng');

    useEffect(() => {
        const questionsPage = document.querySelectorAll('.ask-question');
        questionsPage.forEach(question => {
            if (currentLanguage === 'fr') {
                question.style.backgroundColor = 'yellow'
                question.style.color = 'yellow';
              } else if (currentLanguage === 'en-US') {
                question.style.color = 'black';
                question.style.backgroundColor = 'white'
              } else if (currentLanguage === 'hi') {
                question.style.color = 'white';
                question.style.backgroundColor = 'blue';
              } else if (currentLanguage === 'zh') {
                question.style.color = 'white';
                question.style.backgroundColor = 'green';
              } else {
                question.style.color = 'white';
              }
        })
    },[currentLanguage])


    useEffect(() => {
        const askfrom = document.querySelectorAll('.ask-question');
        askfrom.forEach(form => {
            if (currentLanguage === 'fr') {
                form.style.color = 'black';
              } else if (currentLanguage === 'en-US') {
                form.style.color = 'black';
              } else if (currentLanguage === 'hi') {
                form.style.color = 'white';
              } else if (currentLanguage === 'zh') {
                form.style.color = 'white';
              } else {
                form.style.color = 'white';
              }
        })
    },[currentLanguage])

    const handlesubmit = (e) => {
        e.preventDefault();
        if (user) {
            if (questionbody && questiontitle && questiontag) {
                dispatch(askquestion({questiontitle,questionbody,questiontag,userposted:user.result.name},navigate))
                alert("you have successfuly posted a question")

            } else {
                alert("Please enter all the fields")
            }
        } else {
            alert("Login to ask question")
        }
    }
    const handleenter = (e) => {
        if (e.code === 'Enter') {
            setquestionbody(questionbody + "\n");
        }
    }

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>{t('askQuestion.headh1')}</h1>
                <form onSubmit={handlesubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>{t('askQuestion.QuestionTitle')}</h4>
                            <p>{t('askQuestion.questionPtag')}</p>
                            <input type="text" id="ask-ques-title"
                                onChange={(e) => {
                                    setquestiontitle(e.target.value);
                                }} placeholder={t('askQuestion.placeholder')} />
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>{t('askQuestion.askQuesBody')}</h4>
                            <p>{t('askQuestion.askQuesBodyPtag')}</p>
                            <textarea name="" id="ask-ques-body" onChange={(e) => {
                                setquestionbody(e.target.value);

                            }}
                                cols="30"
                                rows="10"
                                onKeyDown={handleenter}
                            ></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>{t('askQuestion.tags')}</h4>
                            <p>{t('askQuestion.addtags')}</p>
                            <input type="text" id='ask-ques-tags' onChange={(e) => {
                                setquestiontags(e.target.value.split(" "));
                            }}
                                placeholder={t('askQuestion.placeholdersecond')}
                            />
                        </label>
                    </div>
                    <input type="submit"
                        value={t('askQuestion.reviewButton')}
                        className='review-btn' />
                </form>
            </div>
        </div>
    )
}

export default Askquestion