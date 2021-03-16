import 'fontsource-roboto';
import React, { Component } from 'react';
import SignUpPage from './components/SignUp';
import Dashboard from './components/Dashboard';
import JsonFile from './components/JsonFile';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from './routes/routes';
import { withFirebase } from './Firebase/Firestore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      signIn: null,
      signInGoogle: null,
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
    this.setState({signIn: null});
    this.setState({signInGoogle: null});
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <Dashboard authUser={this.state.authUser}/>
            <Switch>
              <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route exact path={ROUTES.JSON} component={JsonFile} />
            </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default withFirebase(App);
