import React from 'react';

function SignUp ({ onClick, onSuccess }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const bodyStyle = {
    backgroundColor: '#F9E3CE',
    borderRadius: 15,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '26rem',
    height: 525,
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
  async function register (e) {
    e.preventDefault()
    const response = await fetch('http://localhost:5005/admin/auth/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name
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
    <div style={mainBodyStyle}>
      <div style={bodyStyle}>
        <section style={sectionStyle}>
          <h2 style={ { textAlign: 'center', lineHeight: '140%' } }>Sign Up</h2>
          <div style={ { width: '100%', display: 'flex', flexDirection: 'column' } }>
            <form style={ { margin: '1.5rem 0px' } } data-testid="register-form">
              <label>Email</label>
              <br />
              <input value={email} onChange={(e) => setEmail(e.target.value)} style={ { width: '100%', minHeight: '2.75rem' } }/><br />
              <br />
              <label>Password</label>
              <br />
              <input value={password} onChange={(e) => setPassword(e.target.value)} style={ { width: '100%', minHeight: '2.75rem' } }/><br />
              <br />
              <label>Name</label>
              <br />
              <input value={name} onChange={(e) => setName(e.target.value)} style={ { width: '100%', minHeight: '2.75rem' } }/><br />
              <br />
              <button onClick={register} style={ { width: '100%', minHeight: '2.75rem' } }>Register</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SignUp
