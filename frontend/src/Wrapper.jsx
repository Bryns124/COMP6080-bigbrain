import React from 'react';
import SignIn from './/components/SignIn'
import SignUp from './/components/SignUp'
import Dashboard from './/components/Dashboard'
import Site from './/components/Site'
import JoinGame from './components/JoinGame';
import ResultPage from './components/Results';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AddQuiz from './components/AddQuiz';
import EditQuiz from './components/EditQuiz';

function Wrapper () {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = React.useState(localStorage.getItem('token'))

  function manageTokenSet (token) {
    setToken(token);
    localStorage.setItem('token', token);
    navigate('/dashboard')
  }

  React.useEffect(() => {
    if (localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== null) {
      setToken(localStorage.getItem('token'));
      if (['/signup', '/signin', '/dashboard/creator'].includes(location.pathname)) {
        navigate('/dashboard')
      } else if (['/dashboard/creator'].includes(location.pathname)) {
        navigate('/creator');
      } else if (['/dashboard/edit-quiz/:quizID'].includes(location.pathname)) {
        navigate('/edit-quiz/:quizID');
      } else if (['/dashboard/results'].includes(location.pathname)) {
        navigate('/dashboard/results');
      }
    } else if (['/home'].includes(location.pathname)) {
      setToken(localStorage.getItem('token'));
      navigate('/home');
    } else {
      setToken(localStorage.getItem('token'));
      navigate('/home');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Site setToken = {setToken}/>}>
          <Route path='/dashboard' element= {<Dashboard token={token}/>}/>
          <Route path='/dashboard/creator' element= {<AddQuiz token={token}/>}/>
          <Route path='/dashboard/edit-quiz/:quizID' element= {<EditQuiz token={token}/>}/>
          <Route path='/dashboard/results' element= {<ResultPage token={token}/>}/>
          <Route path='/signup' element= {<SignUp onSuccess={manageTokenSet} />}/>
          <Route path='/signin' element= {<SignIn onSuccess={manageTokenSet} />}/>
        </Route>
        <Route path='/home' element= {<JoinGame token={token}/>}/>
      </Routes>
    </>
  );
}

export default Wrapper;
