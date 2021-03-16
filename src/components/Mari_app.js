import React, { Component } from "react";
import classes from '../css/Widget.module.css';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const api = {
  base: "https://strainapi.evanbusse.com/",
  key: "nwUlMmm"
};

class Mari_app extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.state = {
      query: "Relaxed",
      strains: [],
      effects: [],
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

  async getStrains() {
    const res = await fetch(
      `${api.base}${api.key}/strains/search/effect/${this.state.query}`
    );
    return res;
  }

  async fetchEffects() {
    const res = await fetch(`${api.base}${api.key}/searchdata/effects`);
    return res;
  }

  get20strains(all_strains) {
    let firsts_strains = [];
    // eslint-disable-next-line
    for (var i = 0; i != all_strains.length; i++) {
      firsts_strains.push(all_strains[i].name);
    }
    return firsts_strains;
  }

  get_Effects() {
    let effect_array;
    this.fetchEffects()
      .then((res) => res.json())
      .then((result) => {
        effect_array = result.map((i, index) => {
          return (
            <option key={index.toString()} value={i.effect}>
              {i.effect}{" "}
            </option>
          );
        });
        this.setState({ effects: effect_array });
      });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  printStrains() {
    let printobj = this.state.strains.map((i, index) => {
      return <div key={index.toString()}>{i}</div>;
    });
    return printobj;
  }

  handleClickDelete() {
    this.setState({isDelete: true});
  }

  timer() {
    if (typeof(this.state.query) != undefined) {
      let strains_array;
      this.getStrains()
      .then((res) => res.json())
      .then((result) => {
        strains_array = this.get20strains(result);
        this.setState({
          strains: strains_array,
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
            <Typography component="h4" style={{
              marginTop: "15px",
              textAlign: "center",
            }}>
              Put the effect you want to search
          </Typography>
            {this.get_Effects()}
            <select
            value={this.state.query}
            onChange={this.handleChange.bind(this)}
            >
              {this.state.effects}
            </select>
          </form>
          {typeof this.state.strains !== "undefined" ? (
          <Typography component="h4" style={{
            marginTop: "15px",
            textAlign: "center",
            height: "200px",
            overflowY: "scroll",
          }}>
            {this.printStrains()}
          </Typography>
          ) : ('')}
        </Paper>
        ) : null}
      </div>
    );
  }
}

export default Mari_app;
