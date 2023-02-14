//import axios from 'axios'
const fs = require("fs");
const axios=require('axios')

function timestampToTime(timestamp) {
    var date = new Date(timestamp*1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    //var D = date.getDate() + ' ';
   /*  var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds(); */
  //  Log(Y+M+D)
    return Y+M+D;
}

let gettoday=(coinname)=>{

    let today=new Date().getTime()
    //today=Math.floor(today/1000)
    let last=Math.floor(today/1000)
    
   // console.log(today)
    //console.log(last)
   // let test= "https://api.mytokenapi.com/currency/kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
  // let test= "https://getyestoday.netlify.app/currency/kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
   let test= "https://api.mytokenapi.com/currency/"+"kline?com_id="+coinname+"_usdt&symbol="+coinname+"&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD"
   // console.log(test)
    return test
}
let getlittledata=(klinedata)=>{
    let arr=[]
    for(let i=0;i<9;i++){
        klinedata[i].time=timestampToTime(klinedata[i].time)
        arr.push(klinedata[i])
    }
    return arr
}

function getcoindata(coinname){
  return new Promise((resolve, reject) =>{
  const config = {
    headers:{
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11'
    }
  };

axios
.get(gettoday(coinname),config)
.then(response => {
  let kdata = getlittledata(response.data.data.kline)
  //console.log(gettoday('btc'))

  //console.log(kdata)
  resolve(kdata)
})
.catch(function (error) { // 请求失败处理
  console.log(error);
  reject(error)
});
})
}

function postdata(url,updata){
  return new Promise((resolve, reject) =>{
  const config = {
    headers:{
      "Authorization": "Bearer"+'secret',
      "accept": "application/json",
      "Notion-Version": "2022-06-28",
      "content-type": "application/json"
  }
}

axios
.post(url,config,updata)
.then(response => {
  
  //console.log(gettoday('btc'))

  //console.log(kdata)
  resolve(response)
})
.catch(function (error) { // 请求失败处理
  console.log(error);
  reject(error)
});
})
}




async function test(){
/* let testdata=await getcoindata('eth')
console.log(testdata)
testdata=await getcoindata('btc')
console.log(testdata) */
let querydata= {
  /*  "property": "time",
  "contains": "20230211"  */
  /* "page_size":100 */
}
let backdata=await postdata("https://api.notion.com/v1/databases/{}/query",querydata)
console.log(backdata)

}



// 
test()

