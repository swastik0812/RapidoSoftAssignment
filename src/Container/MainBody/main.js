import React,{ Component } from "react";
import axios from  "axios";
import Moment from  "moment";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../../Component/DatePicker/datePicker"
import SearchIcon from '@material-ui/icons/Search';
import Accordian from "../../Component/Accordian/accordian"
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Table from "../../Component/Table/Table"
import SpeedIcon from '@material-ui/icons/Speed';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

class Main extends Component{
    state={
        Data:[],
        tripTime:"",
        totalTime:""
    }

   fetchData = async()=>{
    try{
        let data={
            "clientId": 10,
            "dataRecord": {
              "userRoleId": 4,
              "userRoleName": "COMPANY",
              "userId": 10
            },
            "fromDate": 1577888571659,
            "toDate": 1593613371659,
            "tripId": 36
          }
    let res = await  axios.post("http://staging.watsoo.com:8080/watsoo-amazon-api//trip-controller-web/v1/vehicle/wise/summary/36",data)
            console.log(res)
            await this.setState({Data:res.data.data})
            return res.data.data
    } catch(error){
      console.log(error)
    }

   } 

   makeData = async(res)=>{    
    let tripTime=0;
    let totalTime=0;
    let trip = new Date(parseInt(res.totalTripTime))
    let total = new Date(parseInt(res.totalTime))
    tripTime = trip.getUTCHours()+" Hrs "+trip.getUTCMinutes()+" mm";
    totalTime= total.getUTCHours()+" Hrs "+total.getUTCMinutes()+" mm"
    await this.setState({tripTime:tripTime,totalTime:totalTime});

   }
    
    async componentDidMount(){
       let res=await this.fetchData();
       this.makeData(res)
    }

    render(){
        return(
            <div>
                <div style={{marginTop:75,marginLeft:45,marginRight:45}}>
                    <div >
                <Grid container spacing={1}  >
                    <Typography style={{marginTop:45}}><b>Trip Summary</b></Typography>
                </Grid>
                   </div>
                    <div style={{float:"left",color:"#2196f3"}}><Typography style={{fontSize:12}}>Dashboard</Typography> </div>
                    <div style={{float:"left",paddingLeft:4}}><Typography style={{fontSize:12}}>/</Typography> </div>
                    <div style={{float:"left",paddingLeft:4}}><Typography style={{fontSize:12}}>Trip Summary</Typography> </div>
                    <div style={{float:"left",marginLeft:"35%",marginTop:"-3%"}}>
                    <div style={{float:"left",paddingLeft:4}}><p style={{marginTop:10}}>From</p></div>
                    <div style={{float:"left",paddingLeft:4}}><DatePicker></DatePicker></div>
                    <div style={{float:"left",paddingLeft:4}}><p style={{marginTop:10}}>To</p></div>
                    <div style={{float:"left",paddingLeft:4}}><DatePicker></DatePicker></div>
                    </div>
                    <div style={{float:"left",backgroundColor:"#99e3e6",height:38,width:38,marginTop:-30,color:"white",borderRadius:3}}><SearchIcon style={{margin:8}} /></div>
                    <div ><button style={{float:"left",borderColor:"blue",backgroundColor:"#efefef",marginTop:-30,color:"blue",height:38,width:65,marginLeft:10,borderRadius:3}}>Export</button></div>

                <Grid container spacing={1} >
                <Grid item xs={12} sm={12} md={9} lg={10} xl={9} style={{height:74}}>

                <Grid container spacing={1} style={{marginTop:35}} >
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{height:28,backgroundColor:"#29bdc2",color:"white",borderRadius:3}}>
                <div style={{flexFlow:"row"}}>
                <LocalShippingIcon style={{float:"left"}}></LocalShippingIcon>
                 <text style={{marginTop:"1%",float:"left",marginTop:3,marginLeft:4,fontSize:12}}>{this.state.Data.vehicleNo}</text>
                </div>
                
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{height:28,backgroundColor:"#c2993b",color:"white",marginLeft:15,borderRadius:3}}>
                <LocalShippingIcon style={{float:"left"}}></LocalShippingIcon>
                <text style={{marginTop:"1%",float:"left",marginTop:3,marginLeft:4,fontSize:12}}>{"Total Trips : " + this.state.Data.totalTrips}</text>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{height:28,backgroundColor:"#005a93",color:"white",marginLeft:15,borderRadius:3}}>
                <SpeedIcon style={{float:"left"}}></SpeedIcon>
                 <text style={{marginTop:"1%",float:"left",marginTop:2,marginLeft:2,fontSize:12}}>{"Total KM : " + this.state.Data.totalKm}</text>
                </Grid>
                </Grid>
              
                <Grid container spacing={1} style={{marginTop:20}} >
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{height:28,backgroundColor:"#00a74b",color:"white",borderRadius:3}}>
                <QueryBuilderIcon style={{float:"left"}}></QueryBuilderIcon>
                <text style={{marginTop:"1%",float:"left",marginTop:2,marginLeft:2,fontSize:12}}>{this.state.tripTime}</text>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{height:28,backgroundColor:"#962297",color:"white",marginLeft:15,borderRadius:3}}>
                <QueryBuilderIcon style={{float:"left"}}></QueryBuilderIcon>
                
                <text style={{marginTop:"1%",float:"left",marginTop:2,marginLeft:2,fontSize:12}}>{this.state.totalTime}</text>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{height:28,backgroundColor:"#6a5718",color:"white",marginLeft:15,borderRadius:3}}>
                <AccountBalanceWalletIcon style={{float:"left"}}></AccountBalanceWalletIcon>
                <text style={{marginTop:"1%",float:"left",marginTop:2,marginLeft:2,fontSize:12}}>{"Total Exp : Rs. "+this.state.Data.totalExpences}</text>
                </Grid>
                </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={2} xl={2} style={{height:74,backgroundColor:"black",color:"white",borderRadius:3,marginTop:35}}>
                <AccountBalanceWalletIcon style={{marginTop:18,float:"left"}}></AccountBalanceWalletIcon>
                <Typography style={{marginTop:18,float:"left",marginLeft:2}}>{"Other Exp.:Rs. "+this.state.Data.otherExpenses}</Typography>
               </Grid> 
                <Grid>

                </Grid>
                </Grid>
                {this.state.Data != "" ? <Table TripDetails={this.state.Data.tripDetails}/> : null }
                </div>
            </div>
        )
    }
}

export default Main;