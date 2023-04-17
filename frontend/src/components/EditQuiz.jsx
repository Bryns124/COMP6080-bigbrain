import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditQuiz.css'
// import Dashboard from './Dashboard';

function EditQuiz ({ token }) {
  const quizID = useParams().quizID;
  console.log(quizID)
  const navigate = useNavigate();
  const [editQuizName, setQuizName] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState({ file: null, preview: '' });
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
        thumbnail: imgUrl.preview,
        questions: editQuizQuestions
      })
    });
    const data = await response.json();
    console.log(data)
    // await Dashboard.getQuizzes();
    navigate('/dashboard');
  }
  const handleImgChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl({
        file: selectedFile,
        preview: reader.result
      });
    };
    reader.readAsDataURL(selectedFile)
  }
  return (
    <div className='BodyStyle'>
      <div className='InnerBody'>
        <div className="MainContainer">
          <label><b>Change Quiz Title</b> </label>
          <input type="text" value={editQuizName} onChange={val => setQuizName(val.target.value)}/>
          <br />
          <label><b>Change Cover Image for Quiz</b></label>
          <input type="file" onChange={handleImgChange} title="Choose File"/>
          <br />
          <button onClick={() => editQuiz()}>Add Question</button>
          <br />
          <form>
            <label>Title</label>
            <input type="text" value={newQTitle} onChange={(e) => setEmail(e.target.value)} style={ { width: '100%', minHeight: '2.75rem' } }/><br />
          </form>
          <button onClick={() => editQuiz()}>Save changes</button>
          <br />
          {/* <input type="text" value={editQuizQuestions} onChange={val => setQuizQuestions(val.target.value)}/>
          <br /> */}
        </div>
        <label>Questions</label>
        {editQuizQuestions.map((question) => (
          <div key={question.num}>{question.num}: {question.question}</div>
        ))}
      </div>
    </div>
  )
}

export default EditQuiz
