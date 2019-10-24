import React from "react";
import { View, Image, Text, BackHandler,AsyncStorage, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, ActivityIndicator, Alert } from "react-native";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import {LoginAPI} from '../API/PostApi'
const width = Dimensions.get('window').width
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
let  mass=[100,1200,1300,140,120];
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage:0.5
}
let data = [  
    {
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
    }
];
let color=
  [
    '#006400',
    '#00FF7F',
    '#FFFF00',
    '#FFD700',
    '#CD5C5C',
    '#B22222',
    '#FF1493',
    '#9932CC',
    '#9400D3',
    '#0000FF',
    '#00F5FF',
    '#00FF00',
    '#2F4F4F',
    '#696969',
    '#191970',
    '#00BFFF',
    '#A52A2A',
    '#00008B',
    '#EEE685',
    '#8B3626',
    '#CD00CD',
    '#303030',
    '#191970',
    '#00BFFF',
    '#A52A2A',
    '#00008B',
    '#EEE685',
    '#8B3626',
    '#CD00CD',
    '#303030'
  

  ]

export default class HomeScreen extends React.Component {

  static navigationOptions =
  {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = ({
      dataSourceBills:{},
      pie:[],
      ReceivedPayment:'',
      status:'',
      Values:{},
      EmailAddress: '',
      Password: '',
      animate: false,
      webviewopen: false,
      externalLink: '',
      draweropen:false,
    })
  }

  componentDidMount() {
  this.GetData()
  }
  GetData=()=>{
    this.Load()
    LoginAPI('http://got-crm.com/api/mobile/dashboard.php','',this.successcallback,this.error,this.networkissue)
  }
  successcallback=async(data)=>{
  console.log('Login--->',data)
    this.Hide()
    if(data){  
     console.log('Login Response--->',data)  
     this.setState({dataSourceBills:data.bills,Values:data.values,ReceivedPayment:data.payment_received,status:data.payment_pending})  
    // this.TodayFollowups()
    }
   else {  
      //console.log('Login Response--->',data)   
      Alert.alert('Alert','Something went wrong') 
     }
     this.GraphData()
  }
  GraphData=()=>{
    LoginAPI('http://got-crm.com/api/mobile/salesReports.php','',this.PieCharyData,this.error)
  }
  PieCharyData=(arraydata)=>{
    dataobj={
    name: "Seoul",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
    }
    data=[]
  //  console.log('length',arraydata.length)
    for(let i=0;i<arraydata.length;i++){
    //  console.log('color')
      dataobj={
        name:arraydata[i].region ,
        population: arraydata[i].sales_value,
        // population: i,
        legendFontColor:color[i],
       
        color:color[i],
        legendFontSize: 8
        }
      data.push(dataobj)
    }
    this.setState({pie:data})
  
  }
  Load=()=>{
    this.setState({animate:true})
  }
  Hide=()=>{
    this.setState({animate:false})
  }
  error=(error)=>{
    this.Hide()
    Alert.alert(error.status,error.message)
  }
  networkissue=(error)=>{
    Alert.alert('Failure',error)
  }

  NavigationOpen = () => {
    console.log('Navigation drawer open')
    this.props.navigation.toggleDrawer();
    //   this.props.navigation.toggleDrawer({
    //     side:'left',
    //     animated: true,
    //     to: 'closed',
    // });
  }
  render() {
 
    if (this.state.animate) {
      return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator
          color='#1a5fe1'
          size="large"
          style={styles.activityIndicator} />
      </View>
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 ,backgroundColor:'#eeeeee'}}>
        
         
           <View>
                                <ImageBackground style={{ resizeMode: 'contain', width: width, height: 80, justifyContent: 'flex-start', padding: 10 }} source={require('../Assets/menu.png')}>

                                       <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.NavigationOpen} style={{ width: 40, height: 40, justifyContent: 'center' }}>
                      <View >
                        <Image style={{ resizeMode: 'contain', width: 30, height: 100 }} source={require('../Assets/ham.png')}></Image>
                      </View>
                    </TouchableOpacity>

                    <View style={{ justifyContent: "center", alignItems: 'center' }}>
                      <Text style={{ fontSize: 17, color: '#fff', textAlign: 'center',marginLeft:-20 }}>Home</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
           

                    </View>
           
                  </View>
                                </ImageBackground>
                            </View>
                            <ScrollView contentContainerStyle={{paddingBottom:20}} style={{flex:1}}>
<View style={{flex:1,}}>
<Text style={{color:'#16a086',fontWeight:'bold',padding:10}}> Bills</Text>
  <View style={{borderRadius:10,flexDirection:'row',justifyContent:'space-around',paddingLeft:20,paddingRight:20}}>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Today</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.dataSourceBills.today}</Text>

    </View>
  

</View>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Week</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.dataSourceBills.week}</Text>

    </View>
  

</View>

  </View>
  <View style={{borderRadius:10,flexDirection:'row',justifyContent:'space-around',paddingLeft:20,paddingRight:20,paddingTop:10}}>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Month</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.dataSourceBills.month}</Text>

    </View>
  

</View>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Year</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.dataSourceBills.year}</Text>

    </View>
  

</View>

  </View>
  
<Text style={{color:'#eeae44',fontWeight:'bold',padding:10}}> Values</Text>


<View style={{borderRadius:10,flexDirection:'row',justifyContent:'space-around',paddingLeft:20,paddingRight:20}}>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Today</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.Values.today}</Text>

    </View>
  

</View>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Week</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.Values.week}</Text>

    </View>
  

</View>

  </View>
  <View style={{borderRadius:10,flexDirection:'row',justifyContent:'space-around',paddingLeft:20,paddingRight:20,paddingTop:10}}>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Month</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.Values.month}</Text>

    </View>
  

</View>

<View style={{width:150,height:100,borderRadius:10,borderColor:'#cfcfcf',backgroundColor:'#fff',justifyContent:'center',borderWidth:1}}>
  
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#000',textAlign:'center',fontSize:15}}>Year</Text>
    <Text style={{color:'#000',textAlign:'center',fontWeight:'bold',fontSize:18}}>{this.state.Values.year}</Text>

    </View>
  

</View>
</View>
  <View style={{flex:0.5,backgroundColor:'#eeeeee',marginTop:30}}>
    
  <View style={{flex:1,justifyContent:'space-around',padding:20,flexDirection:'row'}}>
  <View style={{flex:0.5,backgroundColor:'#eeae44',height:80,padding:10,justifyContent:'space-around'}}>
  <Text style={{color:'#fff',textAlign:'center',fontWeight:'bold',fontSize:16}}>{this.state.ReceivedPayment}</Text>
    <Text style={{color:'#fff',textAlign:'center'}}>Payment Received</Text>
   
    </View>
    <View style={{flex:0.5,backgroundColor:'#16a086',height:80,padding:10,justifyContent:'space-around'}}>
    <Text style={{color:'#fff',textAlign:'center'}}>Status</Text>
    <Text style={{color:'#fff',textAlign:'center',fontWeight:'bold',fontSize:16}}>{this.state.status==0?'Completed':'Pending'}</Text>
    </View>

  </View>
 
</View>
</View>
<View style={{backgroundColor:'transparent',borderRadius:10,marginLeft:10}}>
<Text style={{color:'#000',fontWeight:'bold',padding:10}}> Sales and Reports</Text>
<PieChart
  data={data}
  width={width}
  height={220}
  chartConfig={chartConfig}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
/>
</View>
</ScrollView>        
        
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});