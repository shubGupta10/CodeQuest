import React, {useEffect} from 'react'
import Question from './Question'
function Questionlist({questionlist}) {
  // console.log(questionlist)

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
      if (currentLanguage === 'fr') {
          document.body.style.backgroundColor = 'yellow';
        } else if (currentLanguage === 'hi') {
          document.body.style.backgroundColor = 'blue';
          document.body.style.color = 'white'
        } else if (currentLanguage === 'zh') {
          document.body.style.backgroundColor = 'green';
        } else {
          document.body.style.backgroundColor = 'white';
        }
      }, [currentLanguage]);
  return (
    <>
    {questionlist.map((question)=>(
      <Question question={question} key ={question._id}/>
    ))}
    </>
  )
}

export default Questionlist