import React from 'react'
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';
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
        name: addQuiz
      })
    });
    const data = await response.json();
    console.log(data);
    await Dashboard.getQuizzes();
  }
  function returnFunc () {
    addNewQuiz();
    navigate('/dashboard');
  }
  return (
    <div>
        {
          (
            <>
              <br />
              Create your new quiz here! <br />
              <br />
              <label>Name</label>
              <input type="text" value={addQuiz} onChange={val => setAddQuiz(val.target.value)} />
              <br />
              <button onClick={returnFunc}>Create Quiz</button>
            </>
          )
        }
    </div>
  );
}

export default AddQuiz
