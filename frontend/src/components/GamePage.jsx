import React from 'react';
import '../styles/JoinGame.css'
function GamePage (props) {
  // const token = localStorage.getItem('token')
  // const [answersAvailable, setAnswersAvailable] = React.useState(false);
  // const [answers, setAnswers] = React.useState([]);
  const [secondsRemaining, setSecondsRemaining] = React.useState(10);
  const [isRunning, setIsRunning] = React.useState(false);
  const [timerFinished, setTimerFinished] = React.useState(false);
  // const currentQuestionIndex = 0
  const playerData = props.playerData;
  // const questions = {}

  React.useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setSecondsRemaining((prevSeconds) => {
          if (prevSeconds === 0) {
            setIsRunning(false);
            setTimerFinished(true);
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  React.useEffect(() => {
    if (secondsRemaining === 0) {
      setTimerFinished(true);
    }
  }, [secondsRemaining]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // const getPlayerStatus = async () => {
  //   const response = await fetch(`http://localhost:5005/play/${playerId}/status`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //     });
  //     const data = await response.json();
  // }

  // const getPlayerQuestion = async () => {
  //   const response = await fetch(`http://localhost:5005/play/${playerId}/question`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //     });
  //     const data = await response.json();
  // }

  // const getPlayerAnswer = async () => {
  //   const response = await fetch(`http://localhost:5005/play/${playerId}/answer`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //     });
  //     const data = await response.json();
  // }

  // const getPlayerAnswerUpdate = async () => {
  //   const response = await fetch(`http://localhost:5005/play/${playerId}/answer`, {
  //     method: 'PUT',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: {
  //       answerIds: answers
  //     }
  //     });
  //     const data = await response.json();
  // }

  // const getPlayerResults = async () => {
  //   const response = await fetch(`http://localhost:5005/play/${playerId}/results`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //     });
  //     const data = await response.json();
  // }

  // const getGameResults = async () => {
  //   const response = await fetch(`http://localhost:5005/admin/session/${sessionId}/results`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //     }
  //   });
  //   const data = await response.json();
  //   return data;
  // }

  // React.useEffect(() => {
  //   getGameResults().then((data) => {
  //     console.log('the data for results', data)
  //   })
  // }, []);

  return (
    <>
      <div className='bodyStyle'>
        {console.log('lol' + props.gameStarted)}
        {console.log(props.token)}
        <div className='innerBody'>
          {
            props.gameStarted
              ? <div>
                  <div>
                  <div>
                  {/* {console.log(questions[currentQuestionIndex])}
                    {questions[currentQuestionIndex].img.preview !== '' &&
                      <img src={questions[currentQuestionIndex].img.preview} alt="question image" />
                    } */}
                  </div>
                  </div>
                  <div>
                    {/* <h1>{questions[currentQuestionIndex].questionType}</h1> */}
                  </div>
                  <div>
                    {/* <h2>{questions[currentQuestionIndex].question}</h2> */}
                  </div>
                  <div>
                    {/* {questions[currentQuestionIndex].options.map((option) => (
                      <label key={option.id}>
                        <div>
                          <input type="checkbox" name="option" value={option.id} />
                          <span>{option}</span>
                        </div>
                      </label>
                    ))} */}
                  </div>
                  <div>
                    <h1>{formatTime(secondsRemaining)}</h1>
                    {console.log('time remaining', secondsRemaining)}
                    {!isRunning && (
                      <button onClick={startTimer}>Start timer</button>
                    )}
                    {isRunning && (
                      <button onClick={stopTimer}>Stop timer</button>
                    )}
                  </div>
                  <div>
                  {timerFinished && (
                    <div>
                      <h2>Time&apos;s up! The answer/s are:</h2>
                      {/* <div>
                        {questions[currentQuestionIndex].correct.map((answer, index) => (
                          <span key={index}>{answer}</span>
                        ))}
                      </div> */}
                    </div>
                  )}
                  </div>
              </div>
              : <div className='loadingContainer'>
                <h1>Loading...</h1>
                {console.log(playerData)}
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default GamePage
