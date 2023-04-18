import React from 'react';

function SignIn ({ onSuccess }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const mainBodyContainer = {
    backgroundColor: '#F9E3CE',
    width: '100%'
  }
  const InnerBody = {
    display: 'flex',
    paddingTop: '2rem',
    paddingBottom: '5.5rem',
    boxSizing: 'border-box',
    minWidth: '0px',
    margin: '0px auto',
    width: '100%',
    maxWidth: '1280px',
    flexWrap: 'nowrap',
    height: 'fit-content',
    minHeight: '100vh',
    backgroundColor: '#F9E3CE',

  }
  const bodyStyle = {
    backgroundColor: '#FEDBDB',
    borderRadius: 15,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '26rem',
    height: 460,
    alignItems: 'center',
    WebkitBoxAlign: 'center'
  }
  const mainBodyStyle = {
    display: 'flex',
    position: 'absolute',
    zIndex: 90,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    WebkitBoxAlign: 'center',
    boxSizing: 'border-box'
  }

  const sectionStyle = {
    display: 'flex',
    width: '100%',
    maxWidth: '22.5rem',
    padding: '1.5rem',
    flexDirection: 'column',
    alignItems: 'center',
    WebkitBoxAlign: 'center',
    justifyContent: 'center',
    WebkitBoxPack: 'center',

  }
  async function login (e) {
    e.preventDefault()
    const response = await fetch('http://localhost:5005/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json()
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data.token)
      onSuccess(data.token)
    }
  }

  return (
    <div style={mainBodyContainer}>
      <div style={InnerBody}>
      <div style={mainBodyStyle}>
        <div style={bodyStyle}>
          <section style={sectionStyle}>
            <h2 style={ { textAlign: 'center', lineHeight: '140%' } }>Log In</h2>
            <div style={ { width: '100%', display: 'flex', flexDirection: 'column' } }>
              <form style={ { margin: '1.5rem 0px' } } data-testid="login-form">
                <label>Email</label>
                <br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} style={ { width: '100%', minHeight: '2.75rem' } }/><br />
                <br />
                <label>Password</label>
                <br />
                <input value={password} onChange={(e) => setPassword(e.target.value)} style={ { width: '100%', minHeight: '2.75rem' } }/><br />
                <br />
                <button onClick={login} style={ { width: '100%', minHeight: '2.75rem' } }>Sign in</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignIn
