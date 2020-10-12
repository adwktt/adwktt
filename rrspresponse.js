var obj = JSON.parse($response.body);
    if($request.url.indexOf('/user/profile') != -1){
obj.data.user.medalList = [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":12},{"id":13},{"id":14},{"id":15},{"id":17},{"id":18},{"id":19},{"id":20},{"id":21},{"id":22},{"id":23},{"id":33}];
obj.data.user.vipMedal = {"name":"大魔王","endTime":"2099-12-12 12:12:12","imgUrl":"http://img.rr.tv/cover/20200424/o_1587720799676.png","id":1,"isExpired":false};
obj.data.user.achievementCount = 10000;
obj.data.user.level = 30;
 };
    if($request.url.indexOf('/v3plus/medal/getAllMedalDetailWithPiece') != -1){
obj.data.medalList.medal.endTime= "2099-12-12 12:12:12";
 };
    if($request.url.indexOf('v3plus/user/detail') != -1){
obj.data.user.medalList = [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5},{"id":6},{"id":7},{"id":8},{"id":9},{"id":10},{"id":11},{"id":12},{"id":13},{"id":14},{"id":15},{"id":17},{"id":18},{"id":19},{"id":20},{"id":21},{"id":22},{"id":23},{"id":33}];
obj.data.user.achievementCount = 10000;
obj.data.user.level = 30;
};

$done({body: JSON.stringify(obj)});
