/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** context.js
*/

import React from 'react';
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;