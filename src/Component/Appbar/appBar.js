import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Logo from "../Logo/logo"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{backgroundColor:"#1f1f46",height:75}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Logo height={30}/>
          <div style={{flexFlow:"row",backgroundColor:"white",height:31,width:90}}>
          <PowerSettingsNewIcon style={{color:"black",height:15}} />
          <Button style={{textTransform:"none",marginTop:-3,marginLeft:-8}}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}