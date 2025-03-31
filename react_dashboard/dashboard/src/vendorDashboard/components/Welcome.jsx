import React from 'react'

const Welcome = () => {
    const firmName = localStorage.getItem("firmName")

  return (
    <div className='welcomeSection'>
        <div className="landingImage">
          <img src='Farmer Images\farmer.jpeg' alt='welcome' />
        </div>
        <div><h2>Welcome {firmName}!!</h2></div>
    </div>
    
  )
}

export default Welcome