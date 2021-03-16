/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** GoogleBtn.js
*/

import React from 'react'
import GoogleLogin from 'react-google-login';

const CLIENT_ID = '1065341075883-ai3bp8cagjv0e96ig0phkkng2fovorru.apps.googleusercontent.com';

export default function GoogleBtnLogin(props) {

  const login = (response) => {
    if (response.accessToken) {
      props.setAuthGoogle(response.accessToken)
    }
  }

  const handleLoginFailure = (response) => {
    alert('Failed to log in')
    console.log(response);
  }

  return (
    <div>
       <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login with google'
          onSuccess={ login }
          onFailure={ handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
    </div>
  )
}

//class GoogleBtn extends Component {
//   constructor(props) {
//    super(props);
//
//    this.state = {
//      isLogined: false
//      //accessToken: ''
//    };
//
//    this.login = this.login.bind(this);
//    this.handleLoginFailure = this.handleLoginFailure.bind(this);
//    this.logout = this.logout.bind(this);
//    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
//  }
//
//  login (response) {
//    if(response.accessToken){
//      this.setState(state => ({
//        isLogined: true,
//        setAuthGoogle: response.accessToken
//      }));
//    }
//  }
//
//  logout (response) {
//    this.setState(state => ({
//      isLogined: false,
//      setAuthGoogle: ''
//    }));
//  }
//
//  handleLoginFailure (response) {
//    alert('Failed to log in')
//  }
//
//  handleLogoutFailure (response) {
//    alert('Failed to log out')
//  }
//
//  render() {
//    return (
//    <div>
//      { this.state.isLogined ?
//        <GoogleLogout
//            clientId={ CLIENT_ID }
//            buttonText='Logout'
//            onLogoutSuccess={ this.logout }
//            onFailure={ this.handleLogoutFailure}
//        >
//        </GoogleLogout>: <GoogleLogin
//          clientId={ CLIENT_ID }
//          buttonText='Login with google'
//          onSuccess={ this.login }
//          onFailure={ this.handleLoginFailure }
//          cookiePolicy={ 'single_host_origin' }
//          responseType='code,token'
//        />
//      }
//      { setAuthGoogle ? <Dashboard authUser={this.state.accessToken} /> : null}
//
//    </div>
//    )
//  }
//}

//export default GoogleBtn