/**
 * main.js
 * 场地管理系统入口文件
 */

const readline = require('readline');

const Inputverification = require('./src/inputverification.js');
const Infoverification = require('./src/infoverification.js');
const Income = require('./src/income.js');
const util = require('./src/util.js');
const EntryData = require("./src/entrydata.js");
const TotalIncome = require("./src/totalIncome.js");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//全部信息
global.cmsData = [];
global.isSpace =false;
const globalLen = global.cmsData.length;
const totalIncome = new TotalIncome();

rl.setPrompt(' ');
rl.prompt();
rl.on('line', (line) => {
    if(/^\r*$/g.test(line)){
        totalIncome.output();
        return true
    }

    const input = new Inputverification(line).init();
    //判断输入格式input.vertifiy
    if (!input.vertifiy) {
        console.log("> Error: the booking is invalid!");
    } 
    else {
       //生成统一格式
        const entrydata = new EntryData(input.arrData).createData();
         //判断判断type->输入数据是否正确->输出
        const infoverify = new Infoverification(entrydata);
        
        const isDataExisted = infoverify.isSiteExisted();
        if(isDataExisted){
            if(entrydata.type === "O"){
                console.log("> Error：the booking conflicts with existing bookings!");
            }else if(entrydata.type === "C"){
                    totalIncome.getRemoveData(entrydata);
                    infoverify.removeItem();
                    console.log("> Success:the booking is accepted!");
                    //把数据entrydata传给统计  
                }
        }else{
            if(entrydata.type === "O"){
                global.cmsData.push(entrydata);
                console.log("> Success:the booking is accepted!");
            }else if(entrydata.type === "C"){
                console.log("> Error：the booking being canceled does not exist!");
            }
        }
    }
    rl.prompt();
});
