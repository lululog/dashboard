/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** SignOut.js
*/

import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { withFirebase } from '../Firebase/Firestore';

const SignOutButton = ({ firebase }) => (
  <MenuItem onClick={firebase.doSignOut}>Logout</MenuItem>
);

export default withFirebase(SignOutButton);