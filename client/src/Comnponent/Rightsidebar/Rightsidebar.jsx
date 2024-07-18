import React, {useEffect} from 'react'
import './Rightsidebar.css'
import Widget from './Widget'
import Widgettag from './Widgettag'
const Rightsidebar = () => {

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
      if (currentLanguage === 'fr') {
          document.body.style.backgroundColor = 'yellow';
        } else if (currentLanguage === 'hi') {
          document.body.style.backgroundColor = 'blue';
        } else if (currentLanguage === 'zh') {
          document.body.style.backgroundColor = 'green';
        } else{
          document.body.style.color = 'black'
        }
      }, [currentLanguage]);

  return (
    <aside className="right-sidebar">
      <Widget/>
      <Widgettag/>
    </aside>
  )
}

export default Rightsidebar