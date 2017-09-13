/*
* @Author: wzq
* @Date:   2017-09-10 01:22:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 14:22:44
*/
//验证输入重复
module.exports = class InfoVertification {
	constructor(entrydata) {
		this.data = entrydata;
		this.index = 0;
		this.bool = false;
	}
	//地点重复
	isSiteExisted(){
		const _this = this;
		
		let isEmpty = global.cmsData.length;
		if(isEmpty === 0){
			return false
		}else{
			for(let item of global.cmsData){
				if(_this.data.court === item.court && _this.isDateExisted(_this.data,item) && _this.isTimeExisted(_this.data,item)){
						_this.index = global.cmsData.indexOf(item);
						_this.bool = true;
				}
			}
		}
			return this.bool
							
	}
	//日期重复
	isDateExisted(newData,globalData){
		if(newData.date === globalData.date){
			return true
		}else{
			return false
		}
	}
	//时间重复,或者重叠，13：00-17：00 (1).12：00-14：00.(2)16:00-18:00(3)14:00-16:00(4)12:00-18:00
	
	isTimeExisted(newData,globalData){
		const newStart = parseInt(newData.stime),
			  newEnd = parseInt(newData.etime),
			  oldStart = parseInt(globalData.stime),
			  oldEnd = parseInt(globalData.etime);
			 
		if(newEnd <= oldStart || newStart >= oldEnd){
			return false
		}else{
			return true;
		}
	}

	removeItem(){
		global.cmsData.splice(this.index,1);
	}
}