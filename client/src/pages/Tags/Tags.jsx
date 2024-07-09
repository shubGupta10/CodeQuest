import React from 'react';
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar.jsx"
import Taglist from './Taglist';
import './Tags.css';
import { tagsList } from './tagslist';
import { useTranslation } from 'react-i18next';

// ***********Taken little chatgpt help******************88
//used little help of stack overflow and chatgpt to fix the issue and error in this code.
const Tags = ({ slidein }) => {
    const { t } = useTranslation();

    const translatedTagsList = tagsList.map(tag => ({
        tagName: tag.tagName,
        tagDesc: t(`tags.${tag.tagName.toLowerCase()}`, {
            defaultValue: tag.tagDesc,
        }),
    }));

    return (
        <div className="home-container-1">
            <Leftsidebar slidein={slidein} />
            <div className="home-container-2">
                <h1 className="tags-h1">{t('Tags.title')}</h1>
                <p className="tags-p">{t('Tags.tagdef')}</p>
                <p className="tags-p">{t('Tags.tagdefsecond')}</p>
                <div className="tags-list-container">
                    {translatedTagsList.map((tag, index) => (
                        <Taglist tag={tag} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tags;
