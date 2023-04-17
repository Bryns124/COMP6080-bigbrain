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
  const [showElement, setShowElement] = React.useState(false);
  // const [editQuizQuestions, setQuizQuestions] = React.useState([{}])
  // const [editQuizQuestions, setQuizQuestions] = React.useState(JSON.stringify[{
  //   questionType: 'MC',
  //   question: 'Are Elephants big?',
  //   duration: '10',
  //   options: {
  //     option1: 'Yes',
  //     option2: 'NO'
  //   },
  //   points: parseInt(2),
  //   correct: 'Yes',
  //   questionImg: ''
  // }]);
  // const options = {
  //   option1: 'Yes',
  //   option2: 'No'
  // }
  const editQuizQuestions = [{
    questionType: 'MC',
    question: 'Are Elephants big?',
    duration: '10',
    options: ['yes', 'no'],
    points: parseInt(2),
    correct: 'Yes',
    questionImg: ''
  }, {
    questionType: 'MC',
    question: 'Are Elephants big?',
    duration: '10',
    options: ['yes', 'no'],
    points: parseInt(2),
    correct: 'Yes',
    questionImg: ''
  }]
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
      // setQuizQuestions(data.questions)
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

  const displayFunc = () => {
    setShowElement(!showElement);
  }
  return (
    <div className='BodyStyle'>
      <div className='InnerBody' style={ { display: !showElement ? 'flex' : 'none' } }>
        <div className="MainContainer">
          <div className="FieldsContainer">
            <label><b>Change Quiz Title</b> </label>
            <br />
            <input type="text" value={editQuizName} onChange={val => setQuizName(val.target.value)}/>
            <br />
            <label><b>Change Cover Image for Quiz</b></label>
            <input type="file" onChange={handleImgChange} title="Choose File"/>
            <br />
            <label>Questions</label>
            <button onClick={displayFunc}>Add Question</button>
            <br />
            {/* </ul> */}
            <button onClick={() => editQuiz()}>Update Quiz</button>
            <br />
            {/* <input type="text" value={editQuizQuestions} onChange={val => setQuizQuestions(val.target.value)}/> */}
            <br />
          </div>
        </div>
        <div>
          {/* {Object.keys(editQuizQuestions).map((question) => (
              <p key={question}>{editQuizQuestions[question]}</p>
          ))} */}
          {
            editQuizQuestions.map(que => (
              <div key={que.questionType}>
                <p>{que.question}</p>
                <p>{que.options}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div style={ { display: showElement ? 'block' : 'none' } }>
          Add Question div
      </div>
    </div>
  )
}

export default EditQuiz
