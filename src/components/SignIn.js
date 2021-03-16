/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** SignIn.js
*/

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import GoogleBtnLogin from './GoogleBtn';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import styles from '../css/SignIn.module.css';
import { withFirebase } from '../Firebase/Firestore';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../routes/routes';
import logo from '../assets/logo.png';

function SignInPage(props) {
  const currentURL = window.location.href;
  if (currentURL === 'http://localhost:8080/signup' ||
      currentURL === 'http://localhost:8080/about.json') {
    return (
      null
    );
  } else {
    return (
      <div>
        <SignInForm />
        <Box mt={2} align="center">
          <GoogleBtnLogin setAuthGoogle={props.setAuthGoogle} AuthGoogle={props.AuthGoogle} />
        </Box>
        <Box mt={2} align="center">
          <Copyright />
        </Box>
      </div>
    );
  }
}

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        EpitechProject
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Container component="main" maxWidth="xs">
        <div className={styles.paper}>
          <Box mt={22}>
            <img src={logo} alt="logo"/>
          </Box>
          <Typography component="h1" variant="h5">
            EpitechDashbord
          </Typography>
          <form className={styles.form} onSubmit={this.onSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.onChange}
              autoComplete="email"
              autoFocus
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.onChange}
              autoComplete="current-password"
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.button_sign}
              disabled={isInvalid}
            >
              Sign In
            </Button>
            {error && <p>{error.message}</p>}
            <Grid item>
              <Link href={ROUTES.SIGN_UP}> Sign up</Link>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const SignInForm = withRouter(withFirebase(SignIn));

export default SignInPage;