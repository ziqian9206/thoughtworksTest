/**

* @Author: Administrator
* @Date:   2017-09-10 01:22:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-11 10:27:33
* 验证输入的信息是否合法
*/
//U001 2014-12-07 09:00~09:00 A
const { splitStr } = require("./util.js");
module.exports = class InputVertifition {
    constructor(options) {
        this.options = options;
        this.regInput = new RegExp(/^(U\d{3}) (\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])) ((09|1[0-9]|2[0-2]):00)~((1[0-9]|2[0-2]):00) ([A-D](\sC)?)$/);
        this.data = [];
    }
    init() {
        return {
            vertifiy: this.isLegal(),
            arrData: this.data
        }
    }
    //输入是否合法
    isLegal() {
        const baseVertify = this.regInput.test(this.options);
        
        if (baseVertify) {
            const arrOptions = this.splitOptions(this.options);
            return this.uidVertifiy(arrOptions[0]) && this.timeVertify(arrOptions[2], arrOptions[3]) ;
        } else {
            return false
        }
    }
    //分割输入参数变为数组
    splitOptions(str) {
        const arrOptions = splitStr(str, ' ');
        const arrTime = splitStr(arrOptions[2], '~');
        arrOptions.splice(2, 1, arrTime[0], arrTime[1]);
        return this.data = arrOptions
    }
    //验证id不是U000
    uidVertifiy(uid) {
        return uid !== 'U000'
    }
    //验证后面时间比前面大
    timeVertify(stime, etime) {
        return parseInt(etime) > parseInt(stime)
    }
}

