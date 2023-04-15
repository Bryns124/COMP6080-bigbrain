import React from 'react';
// import { Link } from 'react-router-dom';

import '../styles/Dashboard.css';
import bigbrainLogo from '../assets/bigbrain_add_quiz_img.svg'
function Dashboard ({ token }) {
  const [addQuiz, setAddQuiz] = React.useState('');
  const [quizBool, setQuizBool] = React.useState(false);
  const [allQuizes, setAllQuizes] = React.useState([]);
  const [editQuizBool, setEditQuizBool] = React.useState(false);
  const [editQuizName, setQuizName] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const getQuizes = async () => {
    const url = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const response = await url.json();
    setAllQuizes(response);
  }
  React.useEffect(async () => {
    await getQuizes();
  }, [quizBool]);

  const addNewQuiz = async () => {
    await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: addQuiz
      })
    });
    await getQuizes();
  }

  const editQuiz = async (id) => {
    await fetch(`http://localhost:5005/admin/quiz/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: editQuizName,
        thumbnail: imgUrl
      })
    });
    await getQuizes();
  }

  React.useEffect(async () => {
    await getQuizes();
  }, [editQuizBool]);

  return (
    <div className='BodyStyle'>
      <h3>Dashboard!</h3>
      <div className='InnerBody'>
        <div style={ { verticalAlign: 'baseline' } }>
          <div style={ { verticalAlign: 'baseline', display: 'flex' } }>
            <div className='QuizContainer'>
              <img src={bigbrainLogo} alt="bigbrain add quiz img" />
                <button onClick={() => { setQuizBool(!quizBool) }}>
                  {quizBool
                    ? 'Back to Dashboard'
                    : <div>
                        <span>+</span>
                      </div>
                  }
                </button>
                {
                  quizBool && (
                    <>
                      <br />
                      Create your new quiz here! <br />
                      <label>Name</label>
                      <input type="text" value={addQuiz} onChange={val => setAddQuiz(val.target.value)} />
                      <button onClick={addNewQuiz}>Create Quiz</button>
                    </>
                  )
                }
            </div>
            <div>
            {
                allQuizes?.quizzes?.length > 0 && (allQuizes?.quizzes?.map(q => (
                  <>
                    <div className='QuizContainer'>
                      <div style={ { padding: '20px' } }>
                        <b>{q.name}</b><br />
                        <button onClick={ () => { setEditQuizBool(!editQuizBool) } }>
                          {
                            editQuizBool
                              ? 'Back to Dashboard'
                              : <div>
                                  <span>Edit</span>
                                </div>
                          }
                        </button>
                        {
                          editQuizBool && (
                            <>
                              <br />
                              <label>Name</label>
                              <input type="text" value={editQuizName} onChange={val => setQuizName(val.target.value)}/>
                              <br />
                              <input type="button" value={imgUrl} onChange={val => setImgUrl(val.target.value)} placeholder="Choose File"/>
                              <button onClick={editQuiz}>Create Question</button>
                            </>
                          )
                        }
                      </div>
                      <div>
                        {
                          q.thumbnail != null
                            ? <div style={ { padding: '20px' } }>
                                <img src={q.thumbnail} alt="thumbnail" />
                              </div>
                            : <div style={ { padding: '20px' } }>
                                <img src={bigbrainLogo} alt="thumbnail" />
                              </div>
                        }
                      </div>
                    </div>
                  </>
                )))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
