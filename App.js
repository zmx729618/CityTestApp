/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  Text,
  View
} from 'react-native';

import {styles} from './static/styles/style';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  /*构造方法*/	
  constructor(props) {
   super(props);
   this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   this.state = {
         cities: this.ds.cloneWithRows([
             {cnname: "文山壮族苗族自治州", enname: "wszzmzzzz", extflag:"1",flag:"0", name :"wenshanzhuangzumiaozuzizhizhou",
              parentid :"28",regionid :"177",shortname :"文山",shownname: "文山",type :"2"},
			 {cnname: "文山壮族苗族自治州", enname: "wszzmzzzz", extflag:"1",flag:"0", name :"wenshanzhuangzumiaozuzizhizhou",
              parentid :"28",regionid :"177",shortname :"文山",shownname: "文山",type :"2"},
			 {cnname: "文山壮族苗族自治州", enname: "wszzmzzzz", extflag:"1",flag:"0", name :"wenshanzhuangzumiaozuzizhizhou",
              parentid :"28",regionid :"177",shortname :"文山",shownname: "文山",type :"2"}
        ])
     };
   }

  /*自定义获取数据的方法*/	
   getdata(url,suc,err) {
     /*
	 	return {"errno":0,"msg":"success","data":{"cities":[   {cnname: "文山壮族苗族自治州", enname: "wszzmzzzz", extflag:"1",flag:"0", name :"wenshanzhuangzumiaozuzizhizhou",
              parentid :"28",regionid :"177",shortname :"文山",shownname: "文山",type :"2"},
			 {cnname: "文山壮族苗族自治州", enname: "wszzmzzzz", extflag:"1",flag:"0", name :"wenshanzhuangzumiaozuzizhizhou",
              parentid :"28",regionid :"177",shortname :"文山",shownname: "文山",type :"2"},
			 {cnname: "文山壮族苗族自治州", enname: "wszzmzzzz", extflag:"1",flag:"0", name :"wenshanzhuangzumiaozuzizhizhou",
              parentid :"28",regionid :"177",shortname :"文山",shownname: "文山",type :"2"}
	    ]}
	*/
	 return fetch(url)
		 .then((response) => response.json())
		 .then((data) => {
		   if(data.errno == 0) {
			 suc && suc(data.data)
		   }
		 })
		 .catch((e) => {
			 console.log(e)
		 })
	 
   }
   
   /*componentDidMount()方法：组件实例化完成执行方法  */
   componentDidMount(){
     var scope = this;
     this.getdata('https://apikuai.baidu.com/city/getstartcitys', function(data) {
         console.log(data)
         scope.setState({
             cities: scope.ds.cloneWithRows(data.cities)
         });
         //scope.state.citys = data.cities;
         //this.getdata('https://apikuai.baidu.com/city/getstartcitys', (data) => {
         //  this.state.citys = data.cities;
         //});
     });
   }
   
   
    /*自定义点击处理方法*/
	onPressAction(data){
		alert(data.cnname);
	}
	

   /*render()方法用于渲染组件*/
   render() { 
		return (
			  <View style={styles.container}>
			       <ListView style={styles.listView} enableEmptySections={true}   
					   dataSource={this.state.cities}
                       renderRow={(rowData) => 
						   <View style={styles.listItem} >
							  <Text onPress={()=>this.onPressAction(rowData)} > {rowData.cnname} </Text>
						  </View>
					   }
                   />
			  </View>
		);
  }
  
  
}


