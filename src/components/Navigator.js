/*
** EPITECH PROJECT, 2020
** B-DEV-500-PAR-5-1-cardgames-lucas.guyader
** File description:
** Navigator.js
*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import MovieIcon from '@material-ui/icons/Movie';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import GamepadIcon from '@material-ui/icons/Gamepad';
import EcoIcon from '@material-ui/icons/Eco';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Weather_app from './Weather_app';
import Movie_app from './Movie_app';
import Lyrics_app from './Lyrics_app';
import TopGames_app from './TopGame_app';
import Games_app from './Game_app';
import Mari_app from './Mari_app';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function Navigator(props) {
    const classes = useStyles();
    const [openSnackBarWeather, setOpenSnackBarWeather] = React.useState(false);
    const [openSnackBarCinema, setOpenSnackBarCinema] = React.useState(false);
    const [openSnackBarLyrics, setOpenSnackBarLyrics] = React.useState(false);
    const [openSnackBarTopGame, setOpenSnackBarTopGame] = React.useState(false);
    const [openSnackBarGame, setOpenSnackBarGame] = React.useState(false);
    const [openSnackBarWeed, setOpenSnackBarWeed] = React.useState(false);
    const [openWeather, setOpenWeather] = React.useState(false);
    const [openCinema, setOpenCinema] = React.useState(false);
    const [openLyrics, setOpenLyrics] = React.useState(false);
    const [openTopGame, setOpenTopGame] = React.useState(false);
    const [openGame, setOpenGame] = React.useState(false);
    const [openWeed, setOpenWeed] = React.useState(false);
    const [transition, SetTransition] = React.useState(undefined);

    const handleClickWeather = (Transition) => () => {
        setOpenWeather(!openWeather);
        setOpenSnackBarWeather(!openSnackBarWeather);
        SetTransition(() => Transition);
        props.setcomponent([...props.components, Weather_app]);
    };

    const handleClickCinema = (Transition) => () => {
        setOpenCinema(!openCinema);
        setOpenSnackBarCinema(!openSnackBarCinema);
        SetTransition(() => Transition);
        props.setcomponent([...props.components, Movie_app]);
    };

    const handleClickLyrics = (Transition) => () => {
        setOpenLyrics(!openLyrics);
        setOpenSnackBarLyrics(!openSnackBarLyrics);
        SetTransition(() => Transition);
        props.setcomponent([...props.components, Lyrics_app]);
    };

    const handleClickTopGame = (Transition) => () => {
      setOpenTopGame(!openTopGame);
      setOpenSnackBarTopGame(!openSnackBarTopGame);
      SetTransition(() => Transition);
      props.setcomponent([...props.components, TopGames_app]);
    };

    const handleClickGame = (Transition) => () => {
      setOpenGame(!openGame);
      setOpenSnackBarGame(!openSnackBarGame);
      SetTransition(() => Transition);
      props.setcomponent([...props.components, Games_app]);
    };

    const handleClickWeed = (Transition) => () => {
      setOpenWeed(!openWeed);
      setOpenSnackBarWeed(!openSnackBarWeed);
      SetTransition(() => Transition);
      props.setcomponent([...props.components, Mari_app]);
    };

    const handleCloseWeather = () => {
      setOpenSnackBarWeather(!openSnackBarWeather);
    };

    const handleCloseCinema = () => {
      setOpenSnackBarCinema(!openSnackBarCinema);
    };

    const handleCloseLyrics = () => {
      setOpenSnackBarLyrics(!openSnackBarLyrics);
    };

    const handleCloseTopGame = () => {
      setOpenSnackBarTopGame(!openSnackBarTopGame);
    };

    const handleCloseGame = () => {
      setOpenSnackBarGame(!openSnackBarGame);
    };

    const handleCloseWeed = () => {
      setOpenSnackBarWeed(!openSnackBarWeed);
    };

    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClickWeather(TransitionRight)}>
          <ListItemIcon>
            <WbCloudyIcon />
          </ListItemIcon>
          <ListItemText primary="Widget Weather" />
          <Snackbar
            open={openSnackBarWeather}
            onClose={handleCloseWeather}
            TransitionComponent={transition}
            message="Widget Weather created !"
            key={transition ? transition.name : ''}
          />
        </ListItem>
        <ListItem button onClick={handleClickCinema(TransitionRight)}>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="Widget Cinema" />
          <Snackbar
            open={openSnackBarCinema}
            onClose={handleCloseCinema}
            TransitionComponent={transition}
            message="Widget Cinema created !"
            key={transition ? transition.name : ''}
          />
        </ListItem>
        <ListItem button onClick={handleClickLyrics(TransitionRight)}>
          <ListItemIcon>
            <MusicNoteIcon />
          </ListItemIcon>
          <ListItemText primary="Widget Lyrics" />
          <Snackbar
            open={openSnackBarLyrics}
            onClose={handleCloseLyrics}
            TransitionComponent={transition}
            message="Widget Lyrics created !"
            key={transition ? transition.name : ''}
          />
        </ListItem>
        <ListItem button onClick={handleClickTopGame(TransitionRight)}>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary="Widget Top Game" />
          <Snackbar
            open={openSnackBarTopGame}
            onClose={handleCloseTopGame}
            TransitionComponent={transition}
            message="Widget Top Game created !"
            key={transition ? transition.name : ''}
          />
        </ListItem>
        <ListItem button onClick={handleClickGame(TransitionRight)}>
          <ListItemIcon>
            <GamepadIcon />
          </ListItemIcon>
          <ListItemText primary="Widget Game" />
          <Snackbar
            open={openSnackBarGame}
            onClose={handleCloseGame}
            TransitionComponent={transition}
            message="Widget Game created !"
            key={transition ? transition.name : ''}
          />
        </ListItem>
        <ListItem button onClick={handleClickWeed(TransitionRight)}>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <ListItemText primary="Widget Weed" />
          <Snackbar
            open={openSnackBarWeed}
            onClose={handleCloseWeed}
            TransitionComponent={transition}
            message="Widget Weed created ! (the funniest Widget of Epitechdashboard !!!)"
            key={transition ? transition.name : ''}
          />
        </ListItem>
      </List>
    );
  }