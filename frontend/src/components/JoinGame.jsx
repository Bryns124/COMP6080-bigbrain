import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/BigBrainLogo.png'
import '../styles/JoinGame.css'
function JoinGame () {
  const navigate = useNavigate()
  const [sessionId, setSessionId] = React.useState('')
  const [playerName, setPlayerName] = React.useState('')
  React.useEffect(() => {
    const URL = window.location.href;
    const id = URL.split('sessionId=')
    console.log(id);
    setSessionId(id[1])
  }, []);

  const joingame = async () => {
    const response = await fetch(`http://localhost:5005/play/join/${sessionId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: playerName,
      })
    });
    const data = await response.json();
    console.log('playerid', data)
    return data;
  }
  return (
    <>
      <header style={ { backgroundColor: '#FEAC88' } }>
            <nav>
                <div style={ { display: 'flex', justifyContent: 'space-between' } }>
                    <div style={ { padding: '2px' } }>
                      <img src={logo} style={ { width: 100, height: 40 } } alt="BigBrain Logo" />
                    </div>

                    <div style={ { display: 'flex' } }>
                      {
                        <>
                          <Link to="/signup" onClick={() => navigate('signup')}>Sign Up</Link>
                          &nbsp;|&nbsp;
                          <Link to="/signin" onClick={() => navigate('signin')}>Sign In</Link>
                        </>
                          }
                    </div>
                </div>
            </nav>
        <hr />
    </header>
    <div className='bodyStyle'>
      <div style={ { display: 'flex', flexDirection: 'column' } }>
        <div className='innerBody'>
          <div style={ { maxWidth: '320px' } }>
            <div style={ { height: '100px', width: '200px', margin: '4.25rem auto 32px' } }>
              <img src={logo} alt="Big brain logo" style={ { width: '100%', height: '100%' } }/>
            </div>
            <div className='mainContainer'>
              <div className='fieldsContainer'>
                <label><b>Session Id</b></label>
                <input type="text" value={sessionId} onChange={setSessionId}/>
              </div>
              <div className='fieldsContainer'>
                <label><b>Player name</b></label>
                <input type="text" value={playerName} onChange={val => setPlayerName(val.target.value)} />
              </div>
              <div className='fieldsContainer'>
                <button className='button' onClick={joingame}>Join Game</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default JoinGame
