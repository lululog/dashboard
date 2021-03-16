import React, { Component } from "react";
import classes from '../css/Widget.module.css';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SubjectIcon from '@material-ui/icons/Subject';
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const api = {
  key: "f2ef0c4aaa4b740781836f8c680494df",
  base: "https://api.themoviedb.org/3/"
};

async function getMovieId(query) {
  const res = await fetch(
    `${api.base}search/movie?api_key=${api.key}&query=${query}`
  );
  return res;
}

class Movie_app extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.state = {
      query: "",
      movie: {},
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

  async getMovie(id) {
    const res = await fetch(`${api.base}movie/${id}?api_key=${api.key}`);
    return res;
  }

  handleClickDelete() {
    this.setState({isDelete: true});
  }

  timer() {
    // eslint-disable-next-line
    if (typeof(this.state.query) != undefined && this.state.query != 0) {
      getMovieId(this.state.query)
        .then((res) => res.json())
        .then((result) => {
          this.getMovie(String(result.results[0].id))
            .then((res2) => res2.json())
            .then((result2) => {
              this.setState({ query: this.state.query, movie: result2 });
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
          <TextField value={this.state.query} style={{ marginBottom: "15px" }} onChange={(e) => this.setState({ query: e.target.value })} id="standard-basic" label="Search a Movie" />
        </form>
        {typeof this.state.movie.overview != "undefined" ? (
        <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={`https://image.tmdb.org/t/p/w185/${this.state.movie.poster_path}`}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Release date: ${this.state.movie.release_date}`} secondary={`Original language: ${this.state.movie.original_language}`}/>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SubjectIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText style={{
              width: "100px",
              marginTop: "15px",
              textAlign: "center",
              height: "200px",
              overflowY: "scroll",
          }} primary={`Summary: ${this.state.movie.overview}`} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Mark: ${this.state.movie.vote_average} / 10`} secondary={`${this.state.movie.vote_count} vote`}/>
            </ListItem>
          </List>
          ) : ('')}
      </Paper>
      ) : null}
      </div>
    );
  }
}

export default Movie_app;
