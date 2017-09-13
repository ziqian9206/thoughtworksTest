/*
* @Author: Administrator
* @Date:   2017-09-10 19:32:44
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 15:02:29
* 收入汇总模块
*/
//const Infoverification = require('./infoverification.js');

module.exports = class TotalIncome{
	constructor(){
		this.aData = new Set();
		this.bData = new Set();
		this.cData = new Set();
		this.dData = new Set();
		this.removeData= new Set();
		
	}
	total(){
		let price = 0;
		for(let item of global.cmsData){
			price += item.income;
		}

		for(let item of this.removeData){
			price += this.getPayRate(item.date)*item.income;
		}
		return price
	}
	getRemoveData(removeData){
		this.removeData.add(removeData);

	}
	getPayRate(date){
		const day = new Date(date).getDay();
			const dayTest = /[1-5]/;
			if(dayTest.test(day)){
				return 0.5
			}else{
				return 0.25
			}
	}
	showData(data,fn){
		let str ="";

		for(let item of data){
			if(item.type==="C"){
				const pay = this.getPayRate(item.date)*item.income;
				str = `> ${item.date} ${item.stime}~${item.etime} 违约金 ${pay}元`;
				fn(str);
			}else{
				 str = `> ${item.date} ${item.stime}~${item.etime} ${item.income}元`;
				fn(str);
			}
		}
	}
	//得到某个场地的全部费用
	sum(type){
		let sum = 0;

		for(let item of global.cmsData){
			if(item.court === type){
				sum += item.income;
			}
		}

		for(let item of this.removeData){
			if(item.court === type){
				const pay = this.getPayRate(item.date)*item.income;
				sum += item.income;
			}
		}
		return sum
	}
	//将数据分类
	getData(totalData){
		for(let item of totalData){
			
			switch(item.court){
				case "A":			
        			this.aData.add(item);
				 break;
				 case "B":
	        		this.bData.add(item);
				 break;
				 case "C":
				 this.cData.add(item);
				 break;
				 case "D":
				 this.dData.add(item);
				 break;
			}
		}
	}
	
	output(){
		this.getData(global.cmsData);
		this.getData(this.removeData);
		console.log("> 收入汇总");
		console.log("> ---");
		console.log("> 场地：A");
		this.showData(this.aData,console.log);
		console.log(`> 小计： ${this.sum("A")}元`);
		console.log("\n");

		console.log("> 场地：B");
		this.showData(this.bData,console.log);
		console.log(`> 小计： ${this.sum("B")}元`);
		console.log("\n");

		console.log("> 场地：C");
		this.showData(this.cData,console.log);
		console.log(`> 小计： ${this.sum("C")}元`);
		console.log("\n");

		console.log("> 场地：D");
		this.showData(this.dData,console.log);
		console.log(`> 小计： ${this.sum("D")}元`);
		console.log("\n");
		console.log("> ---");
		console.log(`> 总计： ${this.total()}元`);
	}
	
}