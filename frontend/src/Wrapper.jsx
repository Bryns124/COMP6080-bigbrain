import React from 'react';
import SignIn from './/components/SignIn'
import SignUp from './/components/SignUp'
import Dashboard from './/components/Dashboard'
import Site from './/components/Site'

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
function Wrapper () {
  const [token, setToken] = React.useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  // const [token, setToken] = React.useState(localStorage.getItem('token'))

  function manageTokenSet (token) {
    setToken(token);
    localStorage.setItem('token', token);
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      if (['/signup', '/signin'].includes(location.pathname)) {
        navigate('/dashboard')
      }
    } else {
      if (!['/signup', '/signin'].includes(location.pathname)) {
        navigate('/signin');
      }
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
