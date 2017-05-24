/**
 * Created by yangdongbo on 2017/3/30.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('myTabGroupCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        //面包屑
        $scope._breadcrumb = ["手机端翻页效果模拟"];

        $scope.tabHand = {
            aFn:function(){
                console.log(111)
            },
            bFn:function(){},
            cFn:function(){}
        }






    }])
})