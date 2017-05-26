define(['./module'], function (filters) {

    'use strict';

    return filters.filter('dataMark_ymd', function () {
        //格式化日期  年月日
        return function (dataTime) {
            var dateformat = function (dataTime, fomartstr) {
                try {
                    return dataTime == null ? "" : (eval(dataTime.replace(/\/Date\((\d+)\)\//gi, "new Date($1)"))).pattern(fomartstr);
                } catch (e) {
                    return '';
                }
            };
            return dateformat(dataTime, 'yyyy-MM-dd');
        };
    }).filter('rgbToHex', function () {
        //rgb 转 16进制
        return function (rgb) {
            // rgb(x, y, z)
            var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
            var hex = "#";
            for (var i = 0; i < 3; i++) {
                // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
                // 'color[i]' 是数组，要转换成字符串.
                // 如果结果是一位数，就在前面补零。例如： A变成0A
                hex += ("0" + Number(color[i]).toString(16)).slice(-2);
            }
            return hex.toUpperCase();
        };
    }).filter('hexToRgb',function(){
        //16 进制转rgb
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        return function (color){
            var sColor = color.toLowerCase();
            if(sColor && reg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
                }
                return "RGB(" + sColorChange.join(",") + ")";
            }else{
                return sColor;
            }
        }
    })
});







