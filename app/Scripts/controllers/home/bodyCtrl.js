/**
 * Created by yangdongbo on 15/6/11.
 */

define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('bodyCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        //----------------------------表格模块基类函数  beign-------
        $rootScope.baseGrid = function () {
            //
            this.isSearch = true;
            //定义： 查询条件
            this.queryPrarms = {};
            //刷新当前页码回传的pageIndex;
            this.curpage = 1;
            //this.items = [];
            //定义： 表格排序方法
            this.sort = function (colName, order) {
                this.queryPrarms.tableOrderName = colName;
                this.queryPrarms.tableOrderSort = order;
                this.getData();
            };
            //定义 ：分页点击查询方法
            this.paging = function (pIndex, pSize) {
                this.queryPrarms.pageIndex = pIndex;
                this.queryPrarms.pageSize = pSize;
                this.getData();
            }
            //定义：获取当前页码号及最大显示数
            this.getQueryPrarms = function () {
                if (this.queryPrarms.tableOrderName == undefined) {
                    this.queryPrarms.tableOrderName = '';
                }
                if (this.queryPrarms.tableOrderSort == undefined) {
                    this.queryPrarms.tableOrderSort = '';
                }
                if (this.isSearch == true) {
                    this.queryPrarms.pageIndex = 1;
                } else {
                    this.queryPrarms.pageIndex = this.curpage;
                }
                if (this.queryPrarms.pageSize == undefined) {
                    this.queryPrarms.pageSize = 10;
                }
            };
            //定义：查询触发方法
            this.search = function () {
                this.isSearch = true;
                this.setQueryPrarms();
                this.getQueryPrarms();
                this.getData();
            };
            //定义: 当前页刷新方法
            this.upLoad = function () {
                this.isSearch = false;
                this.setQueryPrarms();
                this.getQueryPrarms();
                console.log(this.queryPrarms)
                this.getData();
            };

            /*
             * 控制器中需要定义的方法：
             * getData:function(){}         //定义： 查询发送http请求方法体
             *setQueryPrarms：function(){}  //定义：获取当次查询所有查询条件
             * queryPrarms.pageSize         //在当前queryPrams对象上属性重置： 可设定当前页初次加载时最大获取数据数量
             * */

        }
        //----------------------------表格模块基类函数  end---------
        
        //----------------------------公用方法定义  begin-----------
        $rootScope.baseCommonFn = {
            //字符串值，值为：undefined，null,或空字符串时，返回空串，否则返回该数据
            strIsEmpty: function (str) {
                if ((str == undefined || str == null) && (typeof (str) != 'string' || str.replace(/\s+/g, '').length == 0)) {
                    return '';
                } else {
                    return str;
                }
            },
            toBoolean: function (value) {

                if (typeof value === 'function') {
                    value = true;
                } else if (value && value.length !== 0) {
                    var v = this.lowercase("" + value);
                    value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
                } else {
                    value = false;
                }
                return value;
            },
            isString: function (value) { return typeof value === 'string'; },
            lowercase: function (string) { return this.isString(string) ? string.toLowerCase() : string; },
            isEmptyArr: function (value) {
                return value != undefined && value.length == 0 ? true : false;
            }
        }
        //----------------------------公用方法定义  end-------------


    }])
});

