import React from 'react';
import AddQuiz from './/AddQuiz';
import '../styles/Dashboard.css';
import bigbrainLogo from '../assets/bigbrain_add_quiz_img.svg'
function Dashboard () {
  const [addQuiz, setAddQuiz] = React.useState('add-quiz')
  const [token, setToken] = React.useState(null)
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);
  function addQuizFunction (token) {
    if (token !== null) {
      <AddQuiz/>
    } else {
      <div>
        Something went wrong!
      </div>
    }
  }
  return (
    <div className='BodyStyle'>
      <h3>Dashboard!</h3>
      <div className='InnerBody'>
        <div style={ { verticalAlign: 'baseline' } }>
          <div style={ { verticalAlign: 'baseline', display: 'flex' } }>
            <div className='QuizContainer'>
              <a href="#" onClick={ () => setAddQuiz('add-quiz') }>Add New Quiz</a>
              <img src={bigbrainLogo} alt="bigbrain add quiz img" />
            </div>
          </div>
        </div>
        {
          addQuiz === 'add-quiz'
            ? addQuizFunction(token)
            : <div>Something went wrong!</div>
        }
      </div>
    </div>
  )
}

export default Dashboard
