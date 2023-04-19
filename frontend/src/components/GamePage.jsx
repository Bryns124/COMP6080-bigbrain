import React from 'react';
import '../styles/JoinGame.css'
function GamePage (props) {
  return (
    <>
      <div className='bodyStyle'>
        {console.log('lol' + props.gameStarted)}
        <div className='innerBody'>
          {
            props.gameStarted
              ? <div>
                  <div>
                    questions img
                  </div>
                  <div>
                    question
                  </div>
                  <div>
                    options and check box
                  </div>
                  <div>
                    timer
                  </div>
                  <div>
                    answer when time = 0
                  </div>
                  <button>advance</button>
              </div>
              : <div className='loadingContainer'>
                <h1>Loading...</h1>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default GamePage
