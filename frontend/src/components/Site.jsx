import React from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
// import { logoutReq } from './Dashboard';

import logo from '../assets/BigBrainLogo.png'
function Site ({ setToken }) {
  const navigate = useNavigate();
  const location = useLocation();
  function logout () {
    // logoutReq();
    setToken(null);
    localStorage.removeItem('token');
    navigate('/signin');
  }

  return (
    <>
        <header style={ { backgroundColor: '#FEAC88' } }>
            <nav>
                <div style={ { display: 'flex', justifyContent: 'space-between' } }>
                    <div style={ { padding: '2px' } }>
                      <img src={logo} style={ { width: 100, height: 40 } } alt="BigBrain Logo" />
                    </div>
                    <div style={ { display: 'flex' } }>
                      {!['/signup', '/signin'].includes(location.pathname)
                        ? <>
                            <Link to="/signin" onClick={logout}>Logout</Link>
                          </>
                        : <>
                            <Link to="/signup" onClick={() => navigate('signup')}>Sign Up</Link>
                            &nbsp;|&nbsp;
                            <Link to="/signin" onClick={() => navigate('signin')}>Sign In</Link>
                          </>
                      }
                    </div>
                </div>
            </nav>
        <hr />
    </header>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Site
