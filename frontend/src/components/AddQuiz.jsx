import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/AddQuiz.css';
// import bigBrainImg from '../assets/bigbrain_add_quiz_img.svg';
function AddQuiz ({ token }) {
  const navigate = useNavigate();
  const [addQuiz, setAddQuiz] = React.useState('');
  const addNewQuiz = async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: addQuiz,
      })
    });
    const data = await response.json();
    console.log(data);
  }
  function returnFunc () {
    addNewQuiz();
    navigate('/dashboard');
  }

  return (
    <div className='BodyStyle'>
        {
          (
            <div className='InnerBody'>
              <h2>Create your new quiz here!</h2>
              <div className='MainContainer'>
                <div className='FieldsContainer'>
                  <label><b>Title for the Quiz</b></label><br />
                  <input type="text" value={addQuiz} onChange={val => setAddQuiz(val.target.value)} />
                  <br />
                  <button onClick={returnFunc}>Create Quiz</button>
                </div>
              </div>
            </div>
          )
        }
    </div>
  );
}

export default AddQuiz
