/*
* @Author: Administrator
* @Date:   2017-09-10 01:22:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 13:14:33
*单个信息费用计算模块
*/
const {computedIncome} = require("./util.js");

module.exports = class Income {
	constructor(arrData) {
		this.date = arrData[1];
		this.income = "";
		this.type="";
		this.data = arrData;
	}
	
	//根据传入的数组长度判断是预定还是取消,放入全局数组中
	get dataType(){
		const len = this.data.length;
		if(len === 6 && this.data[5] === "C"){
			this.type = "C";
		}else{
			this.type = "O";
		}
		return this.type
	}
	//获取费用
	get dataIncome(){
		return computedIncome(this.data[1],this.data[2],this.data[3]);
	}
}