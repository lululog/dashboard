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
  base: "https://api.rawg.io/api/",
  key: "de60294f61384714bcf0ed47cdcb2208"
};

class Games_app extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.state = {
      query: "",
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

  async getGames() {
    var new_query = this.state.query.split(" ").join("-");
    const res = await fetch(`${api.base}games/${new_query}`);
    return res;
  }

  handleClick() {
    this.getGames()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          games: result,
          query: ""
        });
      });
  }

  get_genre() {
    let games_array = this.state.games.genres.map((i, index) => {
      return <div key={index.toString()}>{i.name} </div>;
    });
    return games_array;
  }

  handleClickDelete() {
    this.setState({isDelete: true});
  }

  timer() {
    if (typeof(this.state.query) != undefined) {
      this.getGames()
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          games: result,
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
            <TextField value={this.state.query} style={{ marginBottom: "15px" }} onChange={(e) => this.setState({ query: e.target.value })} id="standard-basic" label="Enter the game name" />
          </form>
          {typeof this.state.games.genres !== "undefined" ? (
            <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={this.state.games.background_image}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Name: ${this.state.games.name}`}/>
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
          }} primary={`Summary: ${this.state.games.description_raw}`} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Mark: ${this.state.games.rating} / 5`} secondary={`${this.state.games.ratings_count} vote`}/>
            </ListItem>
          </List>
        ) : ("")}
        </Paper>
        ) : null}
      </div>
    );
  }
}

export default Games_app;
