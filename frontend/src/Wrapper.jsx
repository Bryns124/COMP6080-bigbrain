import React from 'react';
import SignIn from './/components/SignIn'
import SignUp from './/components/SignUp'
import Dashboard from './/components/Dashboard'
import Site from './/components/Site'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
      if (['/signup', '/signin'].includes(location.pathname)) {
        console.log(location.pathname);
        navigate('/dashboard')
      } else {
        navigate('/signin');
      }
    } else {
      navigate('/signin');
      localStorage.removeItem('token');
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Site setToken = {setToken}/>}>
          <Route path='/dashboard' element= {<Dashboard token={token}/>}/>
          <Route path='/signup' element= {<SignUp onSuccess={manageTokenSet} />}/>
          <Route path='/signin' element= {<SignIn onSuccess={manageTokenSet} />}/>
        </Route>
      </Routes>
    </>
  );
}

export default Wrapper;
