import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditQuiz.css'
// import Dashboard from './Dashboard';
import correctLogo from '../assets/correct.png';
import wrongLogo from '../assets/Wrong-PNG-Image.png';
function EditQuiz ({ token }) {
  const quizID = useParams().quizID;
  // console.log(quizID)
  const navigate = useNavigate();
  const [editQuizName, setQuizName] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState({ file: null, preview: '' });
  const [showElement, setShowElement] = React.useState(false);
  const [currentQuizQuestions, setCurrentQuizQuestions] = React.useState([]);
  const [questionType, setQuestionType] = React.useState('');
  const [questionNew, setQuestionNew] = React.useState('')
  const [questionDuration, setQuestionDuration] = React.useState(0)
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
  const [questionURL, setQuestionURL] = React.useState('')
  const [questionIMG, setQuestionIMG] = React.useState({ file: null, preview: '' })
  const [expandedQuestion, setExpandedQuestion] = React.useState(null);

  const newQuestion = [{
    questionType,
    question: questionNew,
    duration: parseInt(questionDuration),
    options: questionOptions.map(option => option.text).filter(text => text !== ''),
    points: parseInt(questionPoints),
    correct: questionOptions.filter(option => option.isCorrect).map(option => option.text),
    url: questionURL,
    img: questionIMG
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
      setCurrentQuizQuestions(data.questions)
    })
  }, []);

  const editQuiz = async (updatedQuestions) => {
    const response = await fetch(`http://localhost:5005/admin/quiz/${quizID}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: editQuizName,
        thumbnail: imgUrl.preview,
        questions: updatedQuestions
      })
    });
    const data = await response.json();
    console.log(data)
    navigate('/dashboard');
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

  const handleQuestionURL = (value) => {
    setQuestionURL(value);
  }

  const handleQuestionImg = (event) => {
    const selectFile = event.target.files[0];
    const read = new FileReader();
    read.onloadend = () => {
      setQuestionIMG({
        file: selectFile,
        preview: read.result
      });
    };
    read.readAsDataURL(selectFile)
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
  const handleQuestionClick = (questionIndex) => {
    if (expandedQuestion === questionIndex) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionIndex);
    }
  }

  const handleAddQuestion = () => {
    editQuiz(currentQuizQuestions.concat(newQuestion));
    navigate(`/dashboard/edit-quiz/${quizID}`);
  }

  const handleDeleteQuestion = (questionIndex) => {
    currentQuizQuestions.splice(questionIndex, 1);
    editQuiz(currentQuizQuestions);
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
            <button onClick={displayFunc} className='Button'>Add Question</button>
            <br />
            <button onClick={() => editQuiz(null)} className='Button'>Update Quiz</button>
            <br />
            <br />
          </div>
        </div>
        <div style={ { display: 'flex', flexDirection: 'column', backgroundColor: '#FEDBDB', width: 'calc(100% - 23rem)' } }>
          {
            currentQuizQuestions.map((que, index) => (
              <div key={que.questionType} style={ { position: 'relative', borderStyle: 'groove', borderRadius: '3px' } }>
                {console.log(que)}
                <div style={ { width: '100%' } }>
                  <div style={ { display: 'flex', justifyContent: 'space-between', padding: '10px' } }>
                    <b onClick={() => handleQuestionClick(index)}>{que.question}</b>
                    <div>
                      <img src={que.img.preview} alt='question img' style={ { width: '125px', height: '82px' } }></img>
                    </div>
                  </div>
                  <div>
                    <div style={ { padding: '10px' } }>
                      {
                        que.options.map((op, i) => (
                          <div key={op.text}>
                            <div className='QuestionBox'>
                              {console.log(op)}
                              {op.includes(que.correct[i])
                                ? <div style={ { display: 'flex', justifyContent: 'space-between', height: '20px' } }>
                                    {op}
                                    <div>
                                      <img src={correctLogo} alt="correct" style={ { width: '20px', height: '20px' } }/>
                                    </div>
                                  </div>
                                : <div style={ { display: 'flex', justifyContent: 'space-between', height: '20px' } }>
                                  {op}
                                  <div>
                                      <img src={wrongLogo} alt="correct" style={ { width: '20px', height: '20px' } }/>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  <button onClick={() => handleDeleteQuestion(index)} className='Button'>Delete Question</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

      </div>
      <div className='InnerQueBody'>
        <div style={ { display: showElement ? 'block' : 'none' } }>
          <div className="QuestionContainer">
            <div style={ { padding: '10px' } }>
              <form id="add-question-form">
                <div style={ { display: 'flex', flexDirection: 'column' } }>
                  <label><b>Question type</b></label>
                  <input type="text" value={questionType} onChange={val => handleQuestionType(val.target.value)}/>
                  <br />
                  <label><b>Enter the Question!</b></label>
                  <input type="text" value={questionNew} onChange={val => handleQuestionNew(val.target.value)}/>
                  <br />
                  <label><b>Time limit to solve!</b></label>
                  <input type="number" value={questionDuration} onChange={val => handleQuestionDuration(val.target.value)}/>
                  <br />
                  <label><b>Options (Check correct answers)</b> </label>
                  <div>
                    {inputBoxes}
                    {numInputs < 6 && (
                      <button onClick={addInputBox} className='Button'>Add Input Box</button>
                    )}
                  </div>
                  <label><b>Points</b></label>
                  <input type="number" value={questionPoints} onChange={val => handleQuestionPoints(val.target.value)}/>
                  <br />
                  <label><b>URL for Image for question </b></label>
                  <input type="text" value={questionURL} onChange={val => handleQuestionURL(val.target.value)}/>
                  <br />
                  <label><b>Or Upload image!</b></label>
                  <input type="file" onChange={handleQuestionImg} />
                  <br />
                  <button onClick={handleAddQuestion} className='Button'>
                    Add question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditQuiz
