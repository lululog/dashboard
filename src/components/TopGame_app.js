import React, { Component } from "react";
import classes from '../css/Widget.module.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const api = {
  base: "https://api.rawg.io/api/",
  key: "de60294f61384714bcf0ed47cdcb2208"
};

class TopGames_app extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.state = {
      query: undefined,
      date: "",
      games: {},
      isDelete: false,
      intervalId: 0
    };
  }

  componentDidMount() {
    var intervalId = setInterval(this.timer, 1000);

    this.setState({intervalId: intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  async getTopGames() {
    const res = await fetch(
      `${api.base}games?dates=${this.state.query}-01-01,${this.state.query}-12-31&ordering=-added`
    );
    return res;
  }

  create_top20() {
    let games_array = this.state.games.results.map((i, index) => {
      return (
        <div key={index.toString()}>
          {(index + 1).toString()} {i.name}
        </div>
      );
    });
      return games_array;
  }

  handleClickDelete() {
    this.setState({isDelete: true});
  }

  timer() {
    if (typeof(this.state.query) != undefined) {
      this.getTopGames()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          games: result,
          date: "of " + this.state.query,
          query: this.state.query
        });
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.isDelete === false ? (
        <Paper elevation={3} className={classes.root} >
        <Button style={{
            backgroundColor: "#DC143C",
            border: "0",
            borderradius: "3",
            boxshadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: "auto",
            width: "25px",
        }} variant="contained" onClick={() => this.handleClickDelete()}>X</Button>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField value={this.state.query} style={{ marginBottom: "15px" }} onChange={(e) => this.setState({ query: e.target.value })} id="standard-basic" label="Enter a year" />
        </form>
        {typeof this.state.games.results !== "undefined" ? (
          <Typography component="h4" style={{
            marginTop: "15px",
            textAlign: "center",
            height: "200px",
            overflowY: "scroll",
          }}>
            {this.create_top20()}
          </Typography>
        ) : ("")}
        </Paper>
        ) : null}
      </div>
    );
  }
}

export default TopGames_app;
