import React from 'react';
import { useNavigate } from 'react-router-dom';

import Dashboard from './Dashboard';
function EditQuiz ({ id, token }) {
  const navigate = useNavigate();
  const [editQuizName, setQuizName] = React.useState('');
  const [editQuizQuestions, setQuizQuestions] = React.useState([]);
  const [imgUrl, setImgUrl] = React.useState();
  const [displayQuizQuestions, setDisplayQuizQuestions] = React.useState([]);
  const editQuiz = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: editQuizName,
        thumbnail: imgUrl,
        questions: editQuizQuestions
        // questions: [{
        //   question: 'asljdhaskjd',
        //   questionType: 'single'
        // }]
      })
    });
    const data = await response.json();
    console.log('editquiz id: ', id);
    console.log('editquiz data: ', data);
    await Dashboard.getQuizes();
    navigate('/dashboard');
  }
  const displayQuestions = () => {
    setDisplayQuizQuestions(displayQuizQuestions)
  }
  return (
    <div>
      <>
        <br />
        <label>Questions</label>
        <br />
        <input type="text" value={editQuizQuestions} onChange={val => setQuizQuestions(val.target.value)}/>
        <label>Name</label>
        <input type="text" value={editQuizName} onChange={val => setQuizName(val.target.value)}/>
        <br />
        <label>Thumbnail</label>
        <br />
        <input type="file" value={imgUrl} onChange={val => setImgUrl(val.target.files[0])} title="Choose File"/>
        <br />
        <button onClick={() => editQuiz()}>Create Question</button>
        <br />
        <button onClick={displayQuestions}>Show Questions</button>
        <p>{displayQuizQuestions}</p>
        <br />
      </>
    </div>
  )
}

export default EditQuiz
