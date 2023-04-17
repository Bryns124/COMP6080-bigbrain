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
  const [currentQuizQuestions, setCurrentQuizQuestions] = React.useState([]);
  const [questionType, setQuestionType] = React.useState('');
  const [questionNew, setQuestionNew] = React.useState('')
  const [questionDuration, setQuestionDuration] = React.useState(0)
  // const [questionOptions, setQuestionOptions] = React.useState([])
  const [questionOptions, setQuestionOptions] = React.useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [numInputs, setNumInputs] = React.useState(2);
  const [questionPoints, setQuestionPoints] = React.useState(0)

  const zz = [{
    questionType,
    question: questionNew,
    duration: parseInt(questionDuration),
    options: questionOptions.map(option => option.text).filter(text => text !== ''),
    points: parseInt(questionPoints),
    correct: questionOptions.map(option => option.text).filter(option => option.isCorrect),
    questionImg: ''
  }]
  const editQuizQuestions = currentQuizQuestions.concat(zz)
  console.log(editQuizQuestions)

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
      setCurrentQuizQuestions(data.questions)
    })
  }, []);

  console.log('currentQuizQuestions: ', currentQuizQuestions)

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

  const handleQuestionType = (value) => {
    setQuestionType(value);
  }

  const handleQuestionNew = (value) => {
    setQuestionNew(value);
  }

  const handleQuestionDuration = (value) => {
    setQuestionDuration(value);
  }

  const handleQuestionOptions = (newOptions) => {
    setQuestionOptions(newOptions);
  }

  const addInputBox = (event) => {
    event.preventDefault();
    if (numInputs < 6) {
      setNumInputs(numInputs + 1);
    }
  }

  const handleCheckboxChange = (event, index) => {
    const newOptions = [...questionOptions];
    newOptions[index].isCorrect = event.target.checked;
    setQuestionOptions(newOptions);
  }

  const inputBoxes = [];
  for (let i = 0; i < numInputs; i++) {
    inputBoxes.push(
      <div key={i}>
        <input type="text" value ={questionOptions[i].text}onChange={(e) => handleQuestionOptions([
          ...questionOptions.slice(0, i),
          { ...questionOptions[i], text: e.target.value },
          ...questionOptions.slice(i + 1),
        ])}
        />
        <input
          type="checkbox"
          checked={questionOptions[i].isCorrect}
          onChange={(event) => handleCheckboxChange(event, i)}
        />
        <br />
      </div>
    );
  }

  const handleQuestionPoints = (value) => {
    setQuestionPoints(value);
  }

  const handleSubmit = () => {
    console.log('Form submitted');
    navigate(`/dashboard/edit-quiz/${quizID}`)
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
            <button onClick={() => editQuiz()}>Update Quiz</button>
            <br />
            <br />
          </div>
        </div>
        <div>
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
      <form style={ { display: showElement ? 'block' : 'none' } } onSubmit={handleSubmit} id="add-question-form">
        <label>Question type: </label>
        {/* <input type="checkbox" id="checkBoxSC" checked={checked === 'checkBoxSC'} onClick={() => setChecked('checkBoxSC')}/> Single choice */}
        {/* <input type="checkbox" id="checkBoxMC" checked={checked === 'checkBoxMC'} onClick={() => setChecked('checkBoxMC')}/> Multiple choice */}
        <input type="text" value={questionType} onChange={val => handleQuestionType(val.target.value)}/>
        <br />
        <label>Question: </label>
        <input type="text" value={questionNew} onChange={val => handleQuestionNew(val.target.value)}/>
        <br />
        <label>Question duration: </label>
        <input type="number" value={questionDuration} onChange={val => handleQuestionDuration(val.target.value)}/>
        <br />
        <label>Options (Check correct answers): </label>
        <div>
          {inputBoxes}
          {numInputs < 6 && (
            <button onClick={addInputBox}>Add Input Box</button>
          )}
        </div>
        <label>Points: </label>
        <input type="number" value={questionPoints} onChange={val => handleQuestionPoints(val.target.value)}/>
        <br />
        <button type="submit" form="add-question-form">
          Add question
        </button>
      </form>
    </div>
  )
}

export default EditQuiz
