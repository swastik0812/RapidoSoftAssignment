import React from 'react'
import Watsoo from  '../../Asset/Logo/logome.png';
import classes from './logo.css';
const logo = (props)=>{
    return(
     <div className={classes.Logo} style={{height:props.height,backgroundColor:"#1f1f46",flexGrow:1}}>
         <img src={Watsoo} alt='watsoo' />
     </div>
    );
}

export default logo