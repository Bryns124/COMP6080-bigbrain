import React from 'react';
import SignIn from './/components/SignIn'
import SignUp from './/components/SignUp'
import Dashboard from './/components/Dashboard'

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
      <header>
        <nav>
          {token
            ? <>
                <a href="#" onClick={logOut}>Logout</a>
              </>
            : <>
                <a href="#" onClick={() => setPage('signup')}>Sign up</a>
                &nbsp;|&nbsp;
                <a href="#" onClick={() => setPage('signin')}>Sign in</a>
              </>
          }
        </nav>
        <hr />
      </header>
      <main>
        {token !== null
          ? <Dashboard />
          : page === 'signup'
            ? <SignUp onSuccess={manageTokenSet} />
            : <SignIn onSuccess={manageTokenSet} />
        }
      </main>
    </>
  );
}

export default App;
