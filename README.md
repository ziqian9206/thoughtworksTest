/*
* @Author: wzq
* @Date:   2017-09-10 01:22:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-09-10 23:18:12
*/
## 程序整体介绍
整个程序由main.js作为程序入口，由输入合法性判断模块```inputVertifition.js```、单个信息费用计算模块```income.js```、工具方法模块```util.js```、单个信息整合模块```entrydata.js```、验证信息重复模块```infoVertification```、以及收入汇总模块```totalIncome.js```组成。

### 要求：
安装node环境并设置相关环境。

### 具体流程：
1. 通过命令```node main.js```进入程序
2. 通过调用输入合法性判断模块对输入进行判断，指标为：

    1. 符合预定\取消的格式
    2. 时间段起止点为整数
    3. 符合逻辑，比如：用户ID不能为U000，时间段开始时间小于终止时间等。
    4. 如果有第六位则第六位为"C"

如果格式不符合，则打印```Error: the booking is invalid!```。
3. 若格式符合，则讲输入按```[用户，日期，起始时间，终止时间 场地 (取消)]```格式拆分，方便统计数据。

4. 调用单个信息整合模块生成统一格式。即：[用户名uid，类型type，日期date，起始时间stime，终止时间etime,费用income，场地court]。其中，类型根据数组长度以及数组末位是否为"C"确定。末尾有C即取消```type="C"```，若不是C则是预定```type="o"```。收费费用通过星期(日期)以及时间段确定。

5. 生成统一格式后，使用验证信息重复模块判断是否重复。
 判断标准为：地点、日期、时间(**这里注意，必须同时满足，一开始我分步判断，出现bug**)
    1. 若信息不重复，则判断数据的type，是预定则讲该信放入一个数组中，作为总信息```global.data```。并输出```Success:the booking is accepted!```
    2. 若信息不重复，类型为取消，输出```"Error：the booking being canceled does not exist!"```。
    3. 如果信息重复，则判断数据的type，是预定则说明时间冲突，输出```Error：the booking conflicts with existing bookings!```。
    4. 若信息重复，类型为取消，则计算违约金，从总数据_```global.data```删除该信息,并输出```Success:the booking is accepted!```
将数据保存为以下格式：
```
_global.data = [
    {uid:"U001",type:"o",date:"2017-09-01",sTime:"20:00",eT ime:"22:00",income:40.00,site:"A"},
    {uid:"U002",type:"o",date:"2017-09-02",sTime:"20:00",eT ime:"22:00",income:40.00,site:"A"},
    {uid:"U003",type:"o",date:"2017-09-03",sTime:"20:00",eT ime:"22:00",income:40.00,site:"A"}
]
``` 
   
6. 若按下回车，则调用收入汇总模块，打印收入汇总。

## 模块
```
graph TD
    A[入口文件main.js] -->B[输入合法性判断模块]
    B -->C[单个信息费用计算模块]
    C -->D[单个信息整合模块]
    D -->E[验证信息重复模块]
    E -->F[收入汇总模块]
```

## 流程图
```
graph TD
    A[开始] -->B{输入是否合法}
    B -->C{单个信息费用计算模块}
    C -->|YES| D[生成统一格式]
    C -->|NO| E[打印Error: the booking is invalid!]
    D -->F{信息是否重复}
    F -->|YES|G{判断信息类型}
    F -->|NO|H{判断信息类型}
    G -->|预定| I[输出Error: the booking conflicts with existing bookings]
    G -->|取消| J[计算违约金,从总数据删除该信息,并输出Success:the booking is accepted!]
    H -->|预定| K[该信放入总信息数组.并输出Success:the booking is accepted!]
    H -->|取消| L[输出Error:the booking being canceled does not exist!]
```

## 测试
测试用例：
```
1
aadfsafjsdalkjf
U001 2016-06-02 22:00~22:00 A
U002 2017-08-01 19:00~22:00 A
U003 2017-08-02 13:00~17:00 B
U004 2017-08-03 15:00~16:00 C
U002 2017-08-05 09:00~11:00 D

2
U002 2017-08-01 19:00~22:00 A
U003 2017-08-01 18:00~22:00 A
U002 2017-08-01 19:00~22:00 A C
U002 2017-08-01 19:00~22:00 A C
U003 2017-08-01 18:00~20:00 A
U003 2017-08-02 13:00~17:00 B
```
结果：测试符合要求

## 总结 
感觉这个题目有趣而又不普通。就javascriopt来说，考察了很多的点，比如模块化、字符串方法、数组方法、正则等等，而我做这个题时也试着使用学到的ES6的方法来解决，比如class、模板字符串、解构赋值、let\const命令、迭代器、module。当然发现自己在开发中的一些不足，比如模块划分经验不足，一些方法不确定放为公共方法还是模块内方法。

总的来说，我觉得用了一整天将近20个小时完成这个项目，对我来说意义很大，系统整合了所学，对方法的使用更加熟练，逐渐的加深了模块化思想，对一些场景(字符串数组)的处理有了更深的认识。还是很感谢ThoghtWorks给我这次锻炼的机会，希望能取得面试资格。
