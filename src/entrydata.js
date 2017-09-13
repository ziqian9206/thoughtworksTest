/*
* @Author: Administrator
* @Date:   2017-09-10 13:25:58
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 12:01:27
* 单个信息整合模块
*/

//arrData:["U001","2017-09-10","13:00~15:00" A]
const Income = require('./income.js');
module.exports = class EntryData{
	constructor(arrData,index){
		this.uid = arrData[0];
		this.type = new Income(arrData).dataType;
		this.date = arrData[1];
		this.stime = arrData[2];
		this.etime = arrData[3];
		this.income = new Income(arrData).dataIncome;
		this.court = arrData[4];
		
	}
	//生成单个输入的数据，存入全局变量中
	createData(){
		const data={
			uid:this.uid,
			type:this.type,
			date:this.date,
			stime:this.stime,
			etime:this.etime,
			income:this.income,
			court:this.court
		}
		return data
	}
}