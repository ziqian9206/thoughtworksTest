/*
* @Author: Administrator
* @Date:   2017-09-10 01:22:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 10:27:31
* 工具方法模块
*/
function splitStr(str, sign) {
	return str.split(sign);
}


function computedIncome(date,stime,etime){
	const day = new Date(date).getDay();
	const dayTest = /[1-5]/;
	stime = parseInt(stime);
	etime = parseInt(etime);
	//是周一到周五则使用周一周五收费标准，否则使用周六周日收费标准
	if(dayTest.test(day)){
		return rentWorkday(stime,etime);
	}else{
		return rentWeekends(stime,etime);
	}
}

function timeRange(time){
	let range = 0;
	if(time >=9 && time<=12){
		range = 0;
	}else if(time >=12 && time <= 18){
		range = 1;
	}else if(time >= 18 && time<=20){
		range = 2;
	}else if(time >=20 && time<=22){
		range =3 ;
	}
	return range
}

//工作日收费标准，分段函数?使用哈希
function rentWorkday(stime,etime){
	let income = 0;
	const stimeRange= timeRange(stime);
	const etimeRange= timeRange(etime);
	switch(stimeRange){
		case 0:
		switch(etimeRange){
			case 0:
			income = (etime-stime)*30;
			return income
			case 1:
			income = (12-stime)*30+(etime-12)*50;
			return income
			case 2:
			income = (12-stime)*30+(18-12)*50+(etime-18)*80;
			return income
			case 3:
			income = (12-stime)*30+(18-12)*50+(20-18)*80+(etime-20)*60;
			return income	
		}
		case 1:
		switch(etimeRange){
			case 1:
			income = (etime-stime)*50;
			return income
			case 2:
			income = (18-stime)*50+(etime-18)*80;
			return income
			case 3:
			income = (18-stime)*50+(20-18)*80+(etime-20)*60;
			return income
			
		}
		case 2:
		switch(etimeRange){
			case 2:
			income = (etime-stime)*80;
			return income
			case 3:
			income = (20-stime)*80+(etime-20)*60;
			return income
			
		}
		case 3:
		income = (etime-stime)*60;
		return income
	}
}

function rentWeekends(stime,etime){
	let income = 0;
	const stimeRange= timeRange(stime);
	const etimeRange= timeRange(etime);

	switch(stimeRange){
			case 0:
			switch(etimeRange){
				case 0:
				income = (etime-stime)*40;
				return income
				case 1:
				income = (12-stime)*40+(etime-12)*50;
				return income
				default:
				income = (12-stime)*40+(18-12)*50+(etime-18)*60;
				return income	
			}
			case 1:
			switch(etimeRange){
				case 1:
				income = (etime-stime)*50;
				return income
				default:
				income = (18-stime)*50+(etime-18)*60;
				return income	
			}
			default:
			income = (etime-stime)*60;
			return income
	}
}

module.exports={splitStr,computedIncome};

