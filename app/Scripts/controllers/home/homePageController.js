/**
 * Created by yangdongbo on 15/6/14.
 */
define(['../module'], function (controllers) {
    'use strict';

    controllers.controller('homePageController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
        //首页判断用户是否登录
        //$http.post('/home/HeartBeat', {
        //}).success(function (data) {
        //    $scope.checkReqCode(data)
        //});

    }])
})