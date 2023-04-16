import React from 'react';
// import { Link } from 'react-router-dom';

import '../styles/Dashboard.css';
import bigbrainLogo from '../assets/bigbrain_add_quiz_img.svg'
function Dashboard ({ token }) {
  const [addQuiz, setAddQuiz] = React.useState('');
  const [quizBool, setQuizBool] = React.useState(false);
  const [allQuizzes, setAllQuizzes] = React.useState([]);
  const [editQuizBool, setEditQuizBool] = React.useState(false);
  const [editQuizName, setQuizName] = React.useState('');
  // const [editQuizQuestions, setQuizQuestions] = React.useState([]);
  const [displayQuizQuestions, setDisplayQuizQuestions] = React.useState([]);
  // const [deleteQuizBool, setDeleteQuizBool] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState('');

  // const navigate = useNavigate();
  // const location = useLocation();

  const displayQuestions = () => {
    setDisplayQuizQuestions(displayQuizQuestions)
  }

  const getQuizes = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    setAllQuizzes(data);
  }
  React.useEffect(async () => {
    await getQuizes();
  }, [quizBool]);

  const addNewQuiz = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: addQuiz
      })
    });
    const data = await response.json();
    console.log(data);
    await getQuizes();
  }

  const editQuiz = async (id) => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: editQuizName,
        thumbnail: imgUrl,
        // questions: editQuizQuestions
        questions: [{
          question: 'What',
          questionType: 'single'
        }]
      })
    });
    const data = await response.json();
    console.log('editquiz id: ', id);
    console.log('editquiz data: ', data);
    await getQuizes();
  }

  React.useEffect(async () => {
    await getQuizes();
  }, [editQuizBool]);

  const deleteQuiz = async (id) => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log('deletequiz id: ', id);
    console.log('deletequiz data: ', data);
    await getQuizes();
  }

  React.useEffect(async () => {
    await getQuizes();
  }, []);

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
                allQuizzes?.quizzes?.length > 0 && (allQuizzes?.quizzes?.map(q => (
                  <>
                    <div className='QuizContainer'>
                      <div style={ { padding: '20px' } }>
                        <b>{q.name}</b><br />
                        <b>{q.questions} questions</b><br />
                        <b>{q.thumbnail}</b><br />
                        <b>10 minutes</b><br />
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
                              <label>Thumbnail</label>
                              <input type="button" value={imgUrl} onChange={val => setImgUrl(val.target.value)} placeholder="Choose File"/>
                              <button onClick={() => editQuiz(q.id)}>Create Question</button>
                              <br />
                              <button onClick={displayQuestions}>Show Questions</button>
                              <p>{displayQuizQuestions}</p>
                              <br />
                            </>
                          )
                        }
                      </div>
                      <div>
                      <button onClick={ () => deleteQuiz(q.id) }>Delete</button>
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
