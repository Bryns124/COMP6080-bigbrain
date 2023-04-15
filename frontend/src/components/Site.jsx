import React from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';

import logo from '../assets/logo.svg'
function Site ({ setToken }) {
  const navigate = useNavigate();
  const location = useLocation();
  function logout () {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/signin');
  }

  return (
    <>
        <header style={ { backgroundColor: '#F9E3CE' } }>
            <nav>
                <div style={ { display: 'flex', justifyContent: 'space-between' } }>
                    <img src={logo} style={ { width: 100, height: 40 } } alt="BigBrain Logo" />

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
