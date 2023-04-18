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
  const [modalVisible, setModalVisible] = React.useState(false);

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

  // const logout = async () => {
  //   const response = await fetch('http://localhost:5005/admin/auth/logout', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   const data = await response.json();
  // }

  async function getQuizzes () {
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
    await getQuizzes();
  }, [quizBool]);

  React.useEffect(async () => {
    await getQuizzes();
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
    console.log(data)
    await getQuizzes();
  }

  React.useEffect(async () => {
    await getQuizzes();
  }, []);

  const navAdd = () => {
    setQuizBool(!quizBool);
    navigate('creator');
  }
  const navEdit = () => {
    setEditQuizBool(!editQuizBool)
  }

  const handleModalButton = () => {
    setModalVisible(true);
  };

  // const getQuizInfo = async () => {
  //   const response = await fetch(`http://localhost:5005/admin/quiz/${quizID}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   const data = await response.json();
  //   return data;
  // }

  const startGame = async (id) => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${id}/start`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log('startgame data:', data)

    // return data;
  }

  // active key
  // call after start game

  // const advanceGame = async (id) => {
  //   const response = await fetch(`http://localhost:5005/admin/quiz/${id}/advance`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   const data = await response.json();
  //   console.log('advancegame data:', data)
  //   // return data;
  // }

  const handleModalClick = (id) => {
    handleModalButton()
    startGame(id)
  }

  const Modal = () => {
    return (
      <div className='modal' style={{ display: 'block' }}>
      <div className='modal-content'>
        <h2>Copy this link!</h2>
        <p></p>
        <button onClick={() => setModalVisible(false)}>Close Modal</button>
      </div>
    </div>
    );
  };

  return (
    <div className='BodyStyle'>
      <h3>Dashboard!</h3>
      <div className='InnerBody'>
        <div style={ { verticalAlign: 'baseline', display: 'flex' } }>
            <div>
              <div className='AddQuizContainer'>
                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' } }>
                  <img src={bigbrainLogo} alt="bigbrain add quiz img" />
                </div>
                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }>
                  <button className='AddQuizBtn' onClick={navAdd}>
                      +
                  </button>
                </div>
                <div>
                  <h2>Create New Quiz</h2>
                </div>
                  { quizBool && <AddQuiz token={token}/>}
              </div>
            </div>
          <div style={ { verticalAlign: 'baseline', display: 'flex' } }>
            <div>
            {
                allQuizzes?.quizzes?.length > 0 && (allQuizzes?.quizzes?.map(q => (
                  <>
                    <div style={ { padding: '10px' } }>
                      <div className='QuizContainer'>
                        <div style={ { width: '100%', maxHeight: '120px' } }>
                            {
                              q.thumbnail != null
                                ? <div style={ { width: '100%', maxHeight: '120px' } }>
                                    <img src={q.thumbnail} alt="thumbnail" className='QuizImgContainer'/>
                                  </div>
                                : <div style={ { width: '100%', maxHeight: '120px' } }>
                                    <img src={bigbrainLogo} alt="thumbnail" className='QuizImgContainer'/>
                                  </div>
                            }
                          </div>
                        <div className='QuizContent'>
                          <br />
                          <b>{q.name}</b><br />
                          <button onClick={() => {
                            navEdit()
                            navigate(`edit-quiz/${q.id}`);
                          }}>
                            Edit
                          </button>
                          {
                            editQuizBool && <EditQuiz token={token}/>
                          }
                        </div>
                        <div>
                          <button className="modal-button" onClick={ () => handleModalClick(q.id) }>Start</button>
                          {modalVisible && <Modal />}
                        </div>
                        <div>
                        <button onClick={ () => deleteQuiz(q.id) }>Delete</button>
                        </div>
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
