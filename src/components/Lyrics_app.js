import React, { Component } from "react";
import classes from '../css/Widget.module.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const api = {
  base: "https://api.lyrics.ovh/v1/"
};

class Lyrics_app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist_query: "",
      title_query: "",
      lyrics: {},
      isDelete: false
    };
  }

  async getLyrics() {
    const res = await fetch(
      `${api.base}${this.state.artist_query}/${this.state.title_query}`
    );
    return res;
  }

  handleClick() {
    this.getLyrics()
      .then((res) => res.json())
      .then((result) => {
        this.setState({ lyrics: result, artist_query: "", title_query: "" });
      });
  }

  create_text() {
    let newText = this.state.lyrics.lyrics.split("\n").map((i) => {
      return <p>{i}</p>;
    });
    return newText;
  }

  handleClickDelete() {
    this.setState({isDelete: true});
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
            <TextField style={{ marginBottom: "15px" }}value={this.state.query} onChange={(e) => this.setState({ artist_query: e.target.value })} id="standard-basic" label="Enter the artist name" />
            <TextField value={this.state.query} onChange={(e) => this.setState({ title_query: e.target.value })} id="standard-basic" label="Enter the title" />
        </form>
        <Button style={{
            backgroundColor: "#1E90FF",
            border: "0",
            borderradius: "3",
            boxshadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: "48",
            width: "100px",
            alignSelf: "center",
            marginTop: "15px",
          }} variant="contained" onClick={() => this.handleClick()}>Search</Button>
        {typeof this.state.lyrics.lyrics != "undefined" ? (
          <Typography component="h4" style={{
            marginTop: "15px",
            textAlign: "center",
            height: "200px",
            overflowY: "scroll",
          }}>
            {this.create_text()}
          </Typography>
          ) : ('')}
        </Paper>
        ) : null}
      </div>
    );
  }
}

export default Lyrics_app;
