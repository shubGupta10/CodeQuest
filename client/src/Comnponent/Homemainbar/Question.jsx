import React from 'react'
import { Link } from 'react-router-dom'
import moment from "moment"
import { useTranslation } from 'react-i18next'

const Question = ({ question }) => {
    const {t}= useTranslation();
    return (
        <div className="display-question-container">
            <div className="display-votes-ans">
                <p>{t(question.upvote.length - question.downvote.length)}</p>
                <p>{t('QuestionHome.votes')}</p>
            </div>
            <div className="display-votes-ans">
            <p>{t('QuestionHome.answersCount', { count: question.noofanswers })}</p>
                <p>{t('QuestionHome.answers')}</p>
            </div>
            <div className="display-question-details">
                <Link to={`/Question/${question._id}`} className='question-title-link'>
                    {question.questiontitle.length > (window.innerWidth <= 400 ? 70 : 90)
                        ? question.questiontitle.substring(
                            0,
                            window.innerWidth <= 400 ? 70 : 90
                        ) + "..."
                        : question.questiontitle
                    }
                </Link>
                <div className="display-tags-time">
                    <div className="display-tags">
                        {question.questiontags.map((tag)=>(
                            <p key={tag}> {tag}</p>
                        ))}
                    </div>
                    <p className="display-time">
                        {t('QuestionHome.asked')} {moment(question.askedon).fromNow()} {question.userposted}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Question