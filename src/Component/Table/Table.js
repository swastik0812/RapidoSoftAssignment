import React,{ useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

async function createData(row) {
    let finalString=""
    let startDate = "";
    let endDate = "";
    let totalKm=0;

    for(let i=0;i<row.tripLists.length;i++){
        totalKm=totalKm+parseInt(row.tripLists[i].totalKm);
    }
    let startD =new Date(parseInt(row.startDay))
    let endD =new Date(parseInt(row.endDay))
    let runTime =new Date(parseInt(row.dailyRunningTime))
    let month1=startD.getUTCMonth()+1;
    let month2=endD.getUTCMonth()+1;
    let a="";
    if(startD.getUTCHours()<12){
        a="AM"
    }else{
        a="PM"
    }
    let b="";
    if(endD.getUTCHours()<12){
        b="AM"
    }else{
        b="PM"
    }
    startDate=startD.getUTCDate()+"/"+month1+"/"+startD.getUTCFullYear()+" at " +startD.getUTCHours()+":"+startD.getUTCMinutes()+a ;
    endDate=endD.getUTCDate()+"/"+month2+"/"+endD.getUTCFullYear()+" at " +endD.getHours()+":"+endD.getMinutes()+b;
    finalString= "Date: "+startDate+" - "+endDate + "("+ runTime.getUTCHours()+" Hrs "+runTime.getUTCMinutes()+" Minutes)";
    return {
        Date:finalString,
        TotalKm:totalKm
    };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(true);
  const [res, setRes] = React.useState(false);
  const classes = useRowStyles();

    useEffect(async()=>{
        let res=await createData(row);
         setRes(res)

     },[])

    
  return (
    <React.Fragment>
      <TableRow style={{backgroundColor:"#19274c",color:"white"}} className={classes.root}>
        
        <TableCell style={{color:"white"}}component="th" scope="row">
          {res.Date}
        </TableCell>
        <TableCell style={{color:"white",paddingRight:0,color:"#4f8eba"}}align="right">{"Total Km "+res.TotalKm}</TableCell>
        <TableCell style={{color:"white",paddingLeft:0,color:"#879546"}} align="right">{"Total Expense 0.0"}</TableCell>
        <TableCell>
          <IconButton  style={{color:"white"}}aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Table size="small" aria-label="purchases">
                <TableHead >
                  <TableRow style={{backgroundColor:"#00bddc"}}>
                    <TableCell style={{fontSize:12}}align="center">#</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Trip Starts(Node) to Trip Ends(Node)</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Driver Name</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Trip Expenses</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Trip Km</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Trip GPS Km</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Trip Time</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Odometer Reading</TableCell>
                    <TableCell style={{fontSize:12}}align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tripLists.map((List,index) => (
                    <TableRow key={index}>
                      <TableCell style={{fontSize:10}}align="left"component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell style={{fontSize:9}} align="left">{List.startPointNode +" -> "+List.endPointNode}</TableCell>
                      <TableCell style={{fontSize:9}}align="left">{List.driverName}</TableCell>
                      <TableCell style={{fontSize:9}}align="left">{List.tripExpenses.length == 0 ? 0 :null}</TableCell>
                      <TableCell style={{fontSize:9}} align="left">{List.totalKm}</TableCell>
                      <TableCell style={{fontSize:9}} align="left">{List.gpsDistance}</TableCell>
                      <TableCell style={{fontSize:9}} align="left">{List.tripRunningTime}</TableCell>
                      <TableCell  style={{fontSize:9}}align="left">{List.startODOMeter+" -> "+List.endODOMeter}</TableCell>
                      <TableCell style={{width:180,fontSize:10}}align="left">
                      <Grid container spacing={1} >
                     <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                    <Button style={{fontSize:9}} size="small"variant="contained" color="primary">Movement Report</Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                    <Button style={{fontSize:9}} size="small"variant="contained" color="primary">Stopage Report</Button>
                    </Grid>
                    </Grid>
                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData("Date : 04/19/2020 at 5:20AM -04/19/2020AM(5 Hrs 0 Minutes)", "1487.0", "0.0"),
// ];

export default function CollapsibleTable(props) {
  const [rows, setRows] = useState([]);
    const makeData = async()=>{
       return await setRows(props.TripDetails)
    }
     useEffect(async()=>{
       await makeData();
    },[])

  return (
    <TableContainer style={{marginTop:25}} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row,index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}