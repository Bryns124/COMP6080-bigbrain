import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// import Dashboard from './Dashboard';

function EditQuiz ({ token }) {
  const quizID = useParams().quizID;
  console.log(quizID)
  // const navigate = useNavigate();
  const [editQuizName, setQuizName] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState();
  const [editQuizQuestions, setQuizQuestions] = React.useState([]);

  const getQuizInfo = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizID}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }

  React.useEffect(() => {
    getQuizInfo().then((data) => {
      console.log(data)
      console.log(data.questions)
      setQuizQuestions(data.questions)
    })
  }, []);

  const editQuiz = async () => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizID}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: editQuizName,
        thumbnail: imgUrl,
        questions: editQuizQuestions
      })
    });
    const data = await response.json();
    console.log(data)
    // await Dashboard.getQuizzes();
    // navigate('/dashboard');
  }
  return (
    <div>
      <>
        <br />
        <label>Name: </label>
        <input type="text" value={editQuizName} onChange={val => setQuizName(val.target.value)}/>
        <br />
        <label>Thumbnail: </label>
        <input type="file" value={imgUrl} onChange={val => setImgUrl(val.target.files[0])} title="Choose File"/>
        <br />
        <label>Questions</label>
        <br />
        {/* <ul> */}
          {editQuizQuestions.map((question) => (
            <p key={question.num}>{question.question}</p>
          ))}
        {/* </ul> */}
        <button onClick={() => editQuiz()}>Create Question</button>
        <br />
        <input type="text" value={editQuizQuestions} onChange={val => setQuizQuestions(val.target.value)}/>
        <br />
      </>
    </div>
  )
}

export default EditQuiz
