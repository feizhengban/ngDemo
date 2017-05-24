/**
 * Created by yangdongbo on 2017/3/30.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('pageTempCtrl', ['$scope', '$http','$rootScope',function ($scope,$http,$rootScope) {

        $scope.strIsEmpty = $rootScope.baseCommonFn.strIsEmpty;
        //面包屑
        $scope._breadcrumb = ["表格及分页例子"];
        /*
         *1. 注入$rootScope后，可使用定义在rootScope上的baseGrid 和 baseCommonFn公用方法
         *2.在services服务中，定义所有http请求接口，定义方式查看 services/version.js;  控制器中注入当前所需要的服务名,调用http请求
         *
         * */

        $scope.arr=[{id:1, name:'赤坎区'},{name:'赤坎区2'},{name:'赤坎区3'},{name:'赤坎区4'},{name:'赤坎区5'}]

        $scope.hospitalLocation=1;

        //继承表格基类
        $scope.phoneStatisticsFn = function () {
            $rootScope.baseGrid.call(this);
            //定义 查询方法，
            this.getData = function () {


                //引用hospitalServices中定义的http请求方式， 传入查询条件即可
                //hospitalServices.query($scope.phoneStatisticsGrid.queryPrarms).success(function (data, status) {
                //    //返回的要渲染的数据
                //    $scope.phoneStatisticsGrid.items = data.data.Task;
                //    //返回的数据总条数
                //    $scope.count = data.data.Count;
                //});
                //$scope.phoneStatisticsGrid.queryPrarms为查询参数


                console.log($scope.phoneStatisticsGrid.queryPrarms)
                $scope.phoneStatisticsGrid.items = [
                    {name:"广东医学院附属医院", class:"三级", location:"霞山区", servicesTarget:"职工/居民", phoneNum:"0759-2369213", address:"湛江市霞山区人民大道南57号", state:"启用"},
                    {name:"广东医学院附属医院", class:"三级", location:"霞山区", servicesTarget:"职工/居民", phoneNum:"0759-2369213", address:"湛江市霞山区人民大道南57号", state:"启用"},
                    {name:"广东医学院附属医院", class:"三级", location:"霞山区", servicesTarget:"职工/居民", phoneNum:"0759-2369213", address:"湛江市霞山区人民大道南57号", state:"启用"}
                ]
                $scope.phoneStatisticsGrid.totalCount = 190;
            };
            //获取查询条件
            this.setQueryPrarms = function () {
                var obj = this.queryPrarms;
                obj.hospitalName = $scope.strIsEmpty($scope.hospitalName);
                obj.hospitalState = $scope.strIsEmpty($scope.hospitalState);
                obj.hospitalLocation = $scope.strIsEmpty($scope.hospitalLocation);
                obj.hospitalClass=$scope.strIsEmpty($scope.hospitalClass);
            };
            //重置获取数据条数
            this.queryPrarms.pageSize = 10;
        }

        //实例化表格基类方法
        $scope.phoneStatisticsGrid=new $scope.phoneStatisticsFn();
        $scope.phoneStatisticsGrid.search();

    }])
})



