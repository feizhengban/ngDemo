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
    })
});







