/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** SignOutGoogle.js
*/

import React from 'react'
import GoogleLogout from 'react-google-login';

const CLIENT_ID = '1065341075883-ai3bp8cagjv0e96ig0phkkng2fovorru.apps.googleusercontent.com';

export default function GoogleBtnLogout(props) {

  const logout = (response) => {
    props.setAuthGoogle('');
    console.log("ça passe ici");
  }

  const handleLogoutFailure = (response) => {
    alert('Failed to log out')
  }

  return (
    <div>
        <GoogleLogout
            clientId={ CLIENT_ID }
            buttonText='Logout'
            onLogoutSuccess={ logout }
            onFailure={ handleLogoutFailure}
        />
    </div>
  );
}
