import React from 'react';
import SignIn from './/components/SignIn'
import SignUp from './/components/SignUp'
import Dashboard from './/components/Dashboard'
import logo from './/assets/logo.svg'
// import bodyStyle from './/styles/dashboard.css'
function App () {
  const [page, setPage] = React.useState('signup')
  const [token, setToken] = React.useState(null)
  // const [token, setToken] = React.useState(localStorage.getItem('token'))

  function manageTokenSet (token) {
    setToken(token);
    localStorage.setItem('token', token);
  }

  function logOut () {
    setToken(null);
    localStorage.removeItem('token');
    setPage('signin')
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);
  return (
    <>
      <header style={ { backgroundColor: '#F9E3CE' } }>
        <nav>
          <div style={ { display: 'flex', justifyContent: 'space-between' } }>
            <img src={logo} style={ { width: 100, height: 40 } } alt="BigBrain Logo" />
            {token
              ? <>
                  <a href="#" onClick={logOut}>Logout</a>
                </>
              : <>
                  <div style={ { display: 'flex', justifyContent: 'space-between' } }>
                    <a href="#" onClick={() => setPage('signup')}>Sign up</a>
                    &nbsp;|&nbsp;
                    <a href="#" onClick={() => setPage('signin')}>Sign in</a>
                  </div>
                </>
            }
          </div>
        </nav>
        <hr />
      </header>
      <main>
        <div style={ { backgroundColor: '#F9E3CE', width: '100%', height: '100%' } }>
          {token !== null
            ? <Dashboard />
            : page === 'signup'
              ? <SignUp onSuccess={manageTokenSet} />
              : <SignIn onSuccess={manageTokenSet} />
          }
        </div>
      </main>
    </>
  );
}

export default App;
