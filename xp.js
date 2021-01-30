/*
adwktt
轉載備註名字
1、登录状态打开App,点“我的”获取Cookie
2、用微信或者短信重新登录获取token,
下載地址：

来笑谱，一起领20元现金！￥10.S0AQZrKps9Oz
1.长按【复制】整条信息
2.下载并打开笑谱App：http://jzi7.cn/7szkKX

圈x
[rewrite_local]
#笑谱
https://veishop.iboxpay.com/nf_gateway/nf_user_center_web/shopkeeper/v1/get_context_info.json url script-request-header https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js

https://veishop.iboxpay.com/nf_gateway/nf-user-auth-web/ignore_tk/veishop/v1/(login_by_wx.json|app_register_by_phone.json) url script-response-body https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js
[task_local]
0,30 7-23 * * * https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js, tag=笑谱, 
loon
[Script]
http-request https://veishop.iboxpay.com/nf_gateway/nf_user_center_web/shopkeeper/v1/get_context_info.json script-path= https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js, timeout=10, tag= 笑谱

cron "0,30 7-23 * * *" script-path= https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js, tag= 笑谱

surge
笑谱 = type=cron,cronexp="0,30 7-23 * * *",wake-system=1,script-path=https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js,script-update-interval=0
笑谱 = type=http-request,pattern=https://veishop.iboxpay.com/nf_gateway/nf_user_center_web/shopkeeper/v1/get_context_info.json,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/adwktt/adwktt/master/xp.js,script-update-interval=0

hostname = veishop.iboxpay.com

*/
const $ = Env('笑譜')
const notify = $.isNode() ?require('./sendNotify') : '';
$.idx = ($.idx = ($.getval("xpsetting") || "1") - 1) > 0 ? `${$.idx + 1}` : ""; // 賬號擴展字符
const CookieArr = []

let CookieVal = $.getdata('xp_ck')

let refreshToken = $.getdata('xp_rtk')

var hour=''
var minute=''


if ($.isNode()) {
   hour = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getHours();
   minute = new Date( new Date().getTime() + 8 * 60 * 60 * 1000 ).getMinutes();
}else{
   hour = (new Date()).getHours();
   minute = (new Date()).getMinutes();
}

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
if ($.isNode()) {
  if (process.env.xpCookie&& process.env.xpCookie.indexOf('#') > -1) {
   CookieVal = process.env.xpCookie.split('#');
   console.log(`您選擇的是用"#"隔開\n`)
  }
  else if (process.env.xpCookie && process.env.xpCookie.indexOf('\n') > -1) {
   CookieVal = process.env.xpCookie.split('\n');
   console.log(`您選擇的是用換行隔開\n`)
  } else {
   CookieVal = process.env.xpCookie.split()
  };
  Object.keys(CookieVal).forEach((item) => {
        if (CookieVal[item]) {
          CookieArr.push(CookieVal[item])
        }
    });
    console.log(`============ 腳本執行-國際標準時間(UTC)：${new Date().toLocaleString()}  =============\n`)
    console.log(`============ 腳本執行-北京時間(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
 } else {
    CookieArr.push($.getdata('xp_ck'))
    let xpcount = ($.getval('xpcount') || '1');
  for (let i = 2; i <= xpcount; i++) {
    CookieArr.push($.getdata(`xp_ck${i}`))
  }
}
!(async () => {
if (! CookieArr[0]) {
    $.msg($.name, '🔔請先獲取笑譜Cookie')
    return;
  }
   console.log(`------------- 共${CookieArr.length}個賬號----------------\n`)
  for (let i = 0; i < CookieArr.length; i++) {
    if (CookieArr[i]) {
      message = ''
      CookieVal = CookieArr[i];
      $.index = i + 1;
      $.msg($.name+`${$.index}`, '自動閱讀開始🎉🎉🎉')

      await getToken()
      await activityList()
   if (hour === 7 && minute === 0){
      await coinCheck()
      await withDraw()
  for (let i = 1; i <= 46; i++) {
if(i%2 == 0){
$.log('\n🔔第'+(i/2)+'次♻️金蛋視頻開始')
      await goldVideoLimit()
$.log('\n🔔第'+(i/2)+'次♻️巡查直播間開始')
      await liveLimit()
      }else{
$.log('\n🔔第'+i+'次♻️紅包視頻開始')
      await redbagVideoLimit()
     }
    }
  }
   if (hour >= 8 && hour <= 12){
  for (let i = 1; i <= 22; i++) {
if(i%2 == 0){
$.log('\n🔔第'+(i/2)+'次♻️金蛋視頻開始')
      await goldVideoLimit()
$.log('\n🔔第'+(i/2)+'次♻️巡查直播間開始')
      await liveLimit()
      }else{
$.log('\n🔔第'+i+'次♻️紅包視頻開始')
      await redbagVideoLimit()
     }
    }
  }
   if (hour >= 20 && hour <= 22){
  for (let i = 1; i <= 18; i++) {
if(i%2 == 0){
$.log('\n🔔第'+(i/2)+'次♻️金蛋視頻開始')
      await goldVideoLimit()
$.log('\n🔔第'+(i/2)+'次♻️巡查直播間開始')
      await liveLimit()
      }else{
$.log('\n🔔第'+i+'次♻️紅包視頻開始')
      await redbagVideoLimit()
     }
    }
  }
   if ((hour >= 13 && hour <= 19) || hour >= 23){
      await liveLimit()
     }
      await userInfo()
      await coinCheck()
      await showmsg()
  }}
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
function GetCookie() {
if($request&&$request.url.indexOf("get_context_info")>=0) {
     const CookieVal = JSON.stringify($request.headers)
   if(CookieVal)$.setdata(CookieVal,`xp_ck${$.idx}`)
     $.log(`Cookie:${CookieVal}`)
     $.msg($.name,"獲取Cookie成功")
   }

if($request&&($request.url.indexOf("login_by_wx.json")>=0||$request.url.indexOf("app_register_by_phone")>=0)) {
     const refreshToken = $response.body.match(/refreshToken":"(\w+)","refreshExpiration/)[1]
   if(refreshToken)$.setdata(refreshToken,`xp_rtk${$.idx}`)
     $.log(`refreshToken:${refreshToken}`)
     $.msg($.name,"獲取refreshToken成功")
   }
 }


function getToken() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let url ={
      url: `https://veishop.iboxpay.com/nf_gateway/nf_user_auth_web/uc/ignore_tk/v1/refresh_access_token_to_c.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`)),
      body: `{"refreshToken":"${refreshToken}","source":"VEISHOP_APP_IOS"}`
}
   $.post(url,async(error, response, data) =>{
     const obj = JSON.parse(data)
     if(obj.resultCode == 1){
     refreshToken = obj.data.refreshToken
     token = obj.data.accessToken
           }
          resolve()
    })
   })
  } 

function userInfo() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let userInfo ={
      url: 'https://veishop.iboxpay.com/nf_gateway/nf_user_center_web/shopkeeper/v1/get_context_info.json?source=WX_APP_KA_HTZP',
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(userInfo,async(error, response, data) =>{
     const userinfo = JSON.parse(data)
     if(userinfo.resultCode == 1){
     message += '🎉笑譜帳號: '+userinfo.data.customerInfo.nickname+'\n'
    }else{
     message +='⚠️異常'+userinfo.errorDesc+'\n'
           }
          resolve()
    })
   })
  } 

function coinCheck() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let coincheck ={
    url: 'https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/balance.json?source=WX_APP_KA_HTZP',
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(coincheck,(error, response, data) =>{
     const checkcoin = JSON.parse(data)
     if(checkcoin.resultCode == 1){
     if(checkcoin.data.balanceSum >= 1500){
        cash = 1500
       }else{
        cash = 100
      }
     message += '🎉當前金幣餘額'+checkcoin.data.coinSum+'💰\n'
     message += '🎉當前現金餘額'+parseInt(checkcoin.data.balanceSum / 100)+' 元💸\n'
     message += '🎉當前提現額度'+parseInt((checkcoin.data.balanceSum / 100) - (checkcoin.data.coinSum / 10000))+' 元💸\n'
    }else{
     message +='⚠️異常'+coincheck.errorDesc+'\n'
           }
          resolve()
    })
   })
  } 

function withDraw() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let withdraw ={
    url: 'https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/activity/v1/withdraw.json',
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      body: `{"source":"WX_APP_KA_HTZP","bizType":2,"amount":${cash}}`
}
   $.post(withdraw,(error, response, data) =>{
     const draw = JSON.parse(data)
     if(draw.resultCode == 1){
     message += '🎉成功提現'+draw.data.remark+'💸\n'
    }else{
     message +='⚠️異常'+coincheck.errorDesc+'\n'
           }
          resolve()
    })
   })
  } 


function redbagRecode() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let redbagrecode ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/video/ignore_tk/v1/video_channel/uplaod_play_video_recode.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
    body: `{"videoPublishId":"${ID}","playTimeLenght":15,"type":1,"videoTime":${videoTime}}`,
}
   $.post(redbagrecode,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n🔔開始觀看紅包視頻, 等待15s後領取紅包視頻獎勵\n'+redbagrecode.body)
          await $.wait(15000)
          await redbagVideo()
      }else {
          $.log('\n⚠️紅包視頻記錄異常\n'+data)
          $.msg($.name, '⚠️紅包視頻記錄異常', result.errorDesc)
          await $.wait(15000)
           }
          resolve()
    })
   })
  } 


function redbagVideo() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let redbagvideo ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_gold_coin_by_video.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
    body: `{"type":1,"videoList":[{"videoId":"${ID}","type":1,"isFinishWatch":false}],"actId":"${videoId}"}`,
}
   $.post(redbagvideo,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n🎉红包視頻金幣: +'+result.data.goldCoinNumber+'💰\n')
         }else if(result.errorDesc.indexOf('上限') != -1){
          await redbagVideoLimit()
         }else{
          $.log('\n⚠️紅包視頻異常\n'+data+'\n')
          $.msg($.name, '⚠️紅包視頻異常', result.errorDesc)
           }
          resolve()
    })
   })
  } 


function goldRecode() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let goldrecode ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/video/ignore_tk/v1/video_channel/uplaod_play_video_recode.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
    body: `{"videoPublishId":"${ID2}","playTimeLenght":30,"type":1,"videoTime":${videoTime2}}`,
}
   $.post(goldrecode,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n🔔開始觀看金蛋視頻, 等待30s後領取金蛋視頻獎勵\n'+goldrecode.body)
          await $.wait(30000)
          await goldVideo()
      }else {
          $.log('\n⚠️金蛋視頻記錄異常\n'+data)
          $.msg($.name, '⚠️金蛋視頻記錄異常', result.errorDesc)
          await $.wait(30000)
           }
          resolve()
    })
   })
  } 


function goldVideo() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let goldvideo ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_gold_coin_by_video.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
    body: `{"type":2,"videoList":[{"videoId":"${ID2}","type":1,"isFinishWatch":false}],"actId":"${videoId}"}`,
}
   $.post(goldvideo,async(error, response, data) =>{
$.log(goldvideo.url)
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n🎉金蛋視頻金幣: +'+result.data.goldCoinNumber+'💰\n')
         }else if(result.errorDesc.indexOf('上限') != -1){
          await goldVideoLimit()
         }else{
          $.log('\n⚠️金蛋視頻異常\n'+data+'\n')
          $.msg($.name, '⚠️金蛋視頻異常', result.errorDesc)
           }
          resolve()
    })
   })
  } 

function liveVideo() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let livevideo ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/give_redbag_by_live.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
    body: `{"actId":"${liveId}","liveId":"${ID3}"}`,
}
   $.post(livevideo, async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n🎉直播視頻金幣: +'+result.data.goldCoinAmt+'💰\n等待5s後離開直播間\n')
          await $.wait(5000)
      }else if(result.errorCode == "NF-ACTIVITY-DC0010"){

           }else{
          $.log('\n⚠️直播視頻異常:\n'+data)
          $.msg($.name, '⚠️直播視頻異常', result.errorDesc)
          await $.wait(5000)
           }
          resolve()
    })
   })
  } 


function redbagVideoLimit() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let redbagvideolimit ={
    url: 'https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/ignore_tk/v1/get_video_act.json',
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(redbagvideolimit, async(error, response, data) =>{
     const limit = JSON.parse(data)
     if(limit.data.isUperLimit == false){
          await getRedbagVideoId()
           }else{
          $.log('\n⚠️紅包視頻已上限\n')
           }
          resolve()
    })
   })
  } 


function goldVideoLimit() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let goldvideolimit ={
    url: 'https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/ignore_tk/v1/get_video_act.json',
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(goldvideolimit, async(error, response, data) =>{
     const limit = JSON.parse(data)
     if(limit.data.isUperLimit == false){
          await getGoldVideoId()
           }else{
          $.log('\n⚠️金蛋視頻已上限\n')
           }
          resolve()
    })
   })
  } 


function liveLimit() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let livelimit ={
    url: 'https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/ignore_tk/v1/query_live_act.json',
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(livelimit, async(error, response, data) =>{
     const limit = JSON.parse(data)
     if(limit.data.isUperLimit == false){
          await getLiveId()
           }else{
          $.log('\n⚠️直播視頻已上限\n')
           }
          resolve()
    })
   })
  } 


function checkLiveRedbag() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let checkliveredbag ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/v1/has_redbag_by_live.json?liveId=${ID3}`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(checkliveredbag,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.data.hasRedbag == true) {
          $.log('\n🔔查詢直播間紅包成功, 直播間紅包狀態: 有有有🥳!!!\n等待1s後進入直播間\n')
          await $.wait(1000)
          await liveRoomDetail()
      }else if (result.data.hasRedbag == false){
          $.log('\n🔔查詢直播間紅包成功, 直播間紅包狀態: 沒有沒有沒有😫!!!\n等待1s後離開直播間\n')
          await $.wait(1000)
          await leaveLiveRoom()
           }
          resolve()
    })
   })
  } 


function leaveLiveRoom() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let leaveliveroom ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/live/ignore_tk/v1/leave_live.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      body: `{"sessionId":"1e54e9eb7f9c66e908111b041f1a40a7","liveId":"${ID3}"}`,
}
   $.post(leaveliveroom,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n🔔已離開直播間,等待1s後查詢下一直播間紅包\n')
          await $.wait(1000)
      }else{
          $.log('\n⚠️離開直播間失敗\n'+data)
          $.msg($.name, '⚠️離開直播間失敗,請查看日誌')
           }
          resolve()
    })
   })
  } 


function liveRoomDetail() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let liveroomdetail ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/live/ignore_tk/v1/query_live_detail_by_audience.json?entryPath=2&liveId=${ID3}`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(liveroomdetail,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          await goodsCoupon()
           }
          resolve()
    })
   })
  } 


function goodsCoupon() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let goodscoupon ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/live/ignore_tk/v1/query_live_goods_coupon.json?liveId=${ID3}`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(goodscoupon,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          await goodsList()
           }
          resolve()
    })
   })
  } 


function goodsList() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let goodslist ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/live/ignore_tk/v1/query_live_goods_list.json?current=1&liveId=${ID3}&size=100`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(goodslist,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          await enterLiveRoom()
           }
          resolve()
    })
   })
  } 


function enterLiveRoom() {
return new Promise((resolve, reject) => {
  let timestamp=new Date().getTime();
  let enterliveroom ={
    url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/live/ignore_tk/v1/in_live.json?entryPath=2&liveId=${ID3}&sessionId=1e54e9eb7f9c66e908111b041f1a40a7`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
}
   $.get(enterliveroom,async(error, response, data) =>{
     const result = JSON.parse(data)
      if(result.resultCode == 1) {
          $.log('\n已進入直播間,等待30s後領取直播間紅包\n')
          await $.wait(30000)
          await liveVideo()
      }else{
          $.log('\n⚠️進入直播間失敗\n'+data)
          $.msg($.name, '⚠️進入直播間失敗,請查看日誌')
           }
          resolve()
    })
   })
  } 


function getRedbagVideoId() {
  return new Promise((resolve, reject) =>{
   let timestamp=new Date().getTime();
   let getvideoid =  {
      url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/video/ignore_tk/v1/video_channel/query_video_list.json?current=${timestamp%7+1}&returnCount=0&size=6`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      }
   $.get(getvideoid, async(error, resp, data) => {
     let getid = JSON.parse(data)
     if (getid.resultCode == 1)
$.log('開始查詢6個紅包視頻ID')
       for(redbagvideoid of getid.data.records){
$.log('查詢紅包視頻ID成功')
         ID = redbagvideoid.videoPublishId
$.log('\n'+ID+'\n')
         videoTime = redbagvideoid.videoTime
            await redbagRecode()
         }
      resolve()
    })
  })
}


function getGoldVideoId() {
  return new Promise((resolve, reject) =>{
  let timestamp=new Date().getTime();
   let getgoldvideoid =  {
      url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/video/ignore_tk/v1/video_channel/query_video_list.json?current=${timestamp%7+1}&returnCount=0&size=1`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      }
   $.get(getgoldvideoid, async(error, resp, data) => {
     let getid = JSON.parse(data)
     if (getid.resultCode == 1){
$.log('\n開始查詢1個金蛋視頻ID\n')
       for(goldvideoid of getid.data.records){
$.log('\n查詢金蛋視頻ID成功\n')
         ID2 = goldvideoid.videoPublishId
         videoTime2 = goldvideoid.videoTime
     if (videoTime2 > 30){
$.log('\n金蛋視頻時間ok,立即觀看金蛋視頻\n')
            await goldRecode()
           }else{
$.log('\n金蛋視頻時間過短, 1s 後重新查詢\n')
            await $.wait(1000)
            await getGoldVideoId()
           }
         }
       }
      resolve()
    })
  })
}


function getLiveId() {
  return new Promise((resolve, reject) =>{
  let timestamp=new Date().getTime();
   let getvideoid =  {
      url: `https://veishop.iboxpay.com/nf_gateway/nf_content_service/live/ignore_tk/v1/query_living_list_id.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      }
   $.get(getvideoid, async(error, resp, data) => {
     let getid = JSON.parse(data)
     if (getid.resultCode == 1)
      $.log('\n開始獲取直播間ID,當前直播間數量為: '+ getid.data.liveIdList.length+'\n')
      if(getid.data.liveIdList.length == 0)
         $.log('當前沒有主播在線\n')
      if(getid.data.liveIdList.length > 0)
      $.log('\n獲取直播間ID成功,等待3s後開始查詢直播間紅包\n')
         for(liveid of getid.data.liveIdList){
         ID3 = liveid
            await $.wait(3000)
            await checkLiveRedbag()
         }
      resolve()
    })
  })
}


function checkHelpId() {
  return new Promise((resolve, reject) =>{
   let timestamp=new Date().getTime();
   let checkhelpid =  {
      url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/invite/v1/activity_detail.json?source=WX_APP_KA_HTZP&actType=6`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      }
   $.get(checkhelpid, async(error, resp, data) => {
     let helpid = JSON.parse(data)
     if (helpid.resultCode == 1){
         helpID = helpid.data.actId
           await help()
         }
      resolve()
    })
  })
}

function help() {
  return new Promise((resolve, reject) =>{
  let timestamp=new Date().getTime();
  let Help =  {
      url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/invite/v1/gain_reward.json`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      body: `{"source":"WX_APP_KA_HTZP","type":5,"actId":"${helpID}","qrcode":"1354746337610887168"}`,
      }
   $.post(Help, async(error, resp, data) => {
     })
  })
}


function activityList() {
  return new Promise((resolve, reject) =>{
   let timestamp=new Date().getTime();
   let activitylist =  {
      url: `https://veishop.iboxpay.com/nf_gateway/nf_customer_activity/day_cash/ignore_tk/v1/query_act_list.json?source=WX_APP_KA_HTZP`,
      headers: JSON.parse(CookieVal.replace(/161\d{10}/,`${timestamp}`).replace(/token":"\w+"/,`token":"${token}"`)),
      }
   $.get(activitylist, async(error, resp, data) => {
     let activity = JSON.parse(data)
     if (activity.resultCode == 1){
       for(activityid of activity.data.everyDayActivityList){
        if (activityid.actTypeId == 9){
         videoId = activityid.actId
        }else if (activityid.actTypeId == 10){
         liveId = activityid.actId
        }
       }
      }
      resolve()
    })
  })
}


async function showmsg(){
    $.log(message)
    $.msg($.name,'',message)
    await checkHelpId()
 }

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
