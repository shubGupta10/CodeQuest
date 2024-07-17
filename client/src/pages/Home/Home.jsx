import React, { useEffect } from 'react'
import Leftsidebar from '../../Comnponent/Leftsidebar/Leftsidebar'
import Rightsidebar from '../../Comnponent/Rightsidebar/Rightsidebar'
import Homemainbar from '../../Comnponent/Homemainbar/homemainbar'
import '../../App.css'

const Home = ({slidein}) => {

  const currentLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    const homePage = document.querySelectorAll('.home-container-2');
  homePage.forEach(Home => {
    if (currentLanguage === 'fr') {
      Home.style.color = 'yellow';
    } else if (currentLanguage === 'en-US') {
      Home.style.color = 'black';
    } else if (currentLanguage === 'hi') {
      Home.style.color = 'white';
    } else if (currentLanguage === 'zh') {
      Home.style.color = 'white';
    } else {
      Home.style.color = 'white';
    }
  })
  },[currentLanguage])
  

  return (
    <div className="home-container-1">
      <Leftsidebar slidein={slidein}/>
      <div className="home-container-2">
        <Homemainbar/>
        <Rightsidebar/>
      </div>
    </div>
  )
}

export default Home