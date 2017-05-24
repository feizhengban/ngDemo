/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/hospital', {
            //定点医院管理
            templateUrl: 'templates/hospitalManagement/hospital.html',
            controller: 'hospitalController'
        }).when('/myTabGroup', {
            //模拟手机端翻页效果
            templateUrl: 'templates/modelHandler/myTabGroup.html',
            controller: 'myTabGroupCtrl'
        }).when('/pageTemp', {
            //表格例子 分页
            templateUrl: 'templates/modelHandler/pageTemp.html',
            controller: 'pageTempCtrl'
        }).when('/test', {
            //表格例子 分页
            templateUrl: 'templates/modelHandler/test.html',
            controller: 'testCtrl'
        }).otherwise({
            redirectTo: '/',
            templateUrl: 'templates/home/homePage.html',
            controller: 'homePageController'
        });
    }])
});

