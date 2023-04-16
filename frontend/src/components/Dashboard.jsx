import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddQuiz from './AddQuiz';
import EditQuiz from './EditQuiz';
import '../styles/Dashboard.css';
import bigbrainLogo from '../assets/bigbrain_add_quiz_img.svg'
function Dashboard ({ token }) {
  const navigate = useNavigate();
  const [quizBool, setQuizBool] = React.useState(false);
  const [allQuizzes, setAllQuizzes] = React.useState([]);
  const [editQuizBool, setEditQuizBool] = React.useState(false);

  // const [deleteQuizBool, setDeleteQuizBool] = React.useState(false);
  // const ques = {
  //   'question_type': question_type,
  //   'question_name': question_name,
  //   'time_limit': time_limit,
  //   'points': points,
  //   'options': options,
  //   'question_image': question_image ,
  //   'correct_options': (question_type === 'multiple_Choice' ? multiple_correct : single_ccorrect)
  // }
  // const navigate = useNavigate();
  // const location = useLocation();

  async function getQuizes () {
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

  const navAdd = () => {
    setQuizBool(!quizBool);
    navigate('creator');
  }
  const navEdit = () => {
    setEditQuizBool(!editQuizBool)
    navigate('edit-quiz');
  }

  return (
    <div className='BodyStyle'>
      <h3>Dashboard!</h3>
      <div className='InnerBody'>
        <div style={ { verticalAlign: 'baseline' } }>
          <div style={ { verticalAlign: 'baseline', display: 'flex' } }>
            <div className='QuizContainer'>
              <img src={bigbrainLogo} alt="bigbrain add quiz img" />
                <button onClick={navAdd}>
                  +
                </button>
                { quizBool && <AddQuiz token={token}/>}
            </div>
            <div>
            {
                allQuizzes?.quizzes?.length > 0 && (allQuizzes?.quizzes?.map(q => (
                  <>
                    <div className='QuizContainer'>
                      <div style={ { padding: '20px' } }>
                        <b>{q.name}</b><br />
                        <b>{q.questions} questions</b><br />
                        <b>10 minutes</b><br />
                        <button onClick={navEdit}>
                          Edit
                        </button>
                        {
                          editQuizBool && <EditQuiz id={q.id} token={token}/>
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
