import React, { Component } from 'react';
import { api } from 'api/base';
import LazadaApi from 'lazada-open-platform-sdk';

class App extends Component {
  // Initialize state
  state = { passwords: [] };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
    this.getLazadaRequest();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  };

  getLazadaRequest = async () => {
    // const lazadaApi = new LazadaApi(
    //   '116437',
    //   's07TFkZNuVslzMAc9GbgSQ6emxn0NrOK',
    //   'MALAYSIA'
    // );
    // lazadaApi
    //   .generateAccessToken({ code: 'auth_code' })
    //   .then(response => {
    //     const { access_token } = response; // JSON data from Lazada's API
    //     console.log(access_token);
    //   })
    //   .catch(err => console.log(err));

    const data = {
      url: 'https://buatpc.my',
      appKey: '116437',
      appSecret: 's07TFkZNuVslzMAc9GbgSQ6emxn0NrOK'
    };
    const response = await fetch(
      'https://auth.lazada.com/rest/auth/token/create',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    const a = await response.json();
    console.log(a);
  };

  render() {
    const { passwords } = this.state;
    return (
      <div className='App'>
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className='passwords'>
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) => (
                <li key={index}>{password}</li>
              ))}
            </ul>
            <button className='more' onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button className='more' onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
