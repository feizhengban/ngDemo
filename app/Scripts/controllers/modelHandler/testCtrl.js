/**
 * Created by yangdongbo on 2017/3/31.
 */
define(['../module'], function (controllers) {
    'use strict';
    controllers.controller('testCtrl', ['$scope', '$http','$rootScope', '$compile','selectImgModel','check',
        function ($scope,$http,$rootScope,$compile,selectImgModel,check) {



            $scope.imgList = [
                {name:1},
                {name:2},
                {name:3}
            ]


        var options = {
            largestNum:3,
            imgs:[{name:'0000000'}],
            multiple:false,
            url:$scope.getImgs,
            callBack:function(data){
                console.log(data)
                $scope.imgs = data;
            }
        }

        $scope.imgModel = new selectImgModel();
        $scope.imgModel.init(options);
        console.log($scope.imgModel)





    //        checkbox 实验

     /*       $scope.check =new check($rootScope,$scope).check;
            console.log($scope.check)
*/


            $scope.check={
                arr :[],
                checkAll:false,
                checkAllFlag:false,
                checkAllFn:function(){
                    this.checkAllFlag = this.checkAll = !this.checkAll;
                    if(this.checkAll === true ){
                        this.arr = JSON.parse(JSON.stringify($scope.imgList));
                    }else{
                        this.arr = [];
                    }
                    this.look();
                },
                itemCheck:function(o){
                    var arr = this.arr;
                    for(var i = 0 ;i<arr.length;i++){
                        if( arr[i].name == o.name ){
                            arr.splice(i,1);
                            this.checkAll = false;
                            this.look();
                            return;
                        }
                    }

                    arr.push(o);
                    if(arr.length == $scope.imgList.length ){
                        this.checkAllFlag = this.checkAll =true;
                    }
                    this.look();
                },
                look:function(){
                    console.log(this.checkAll)
                    console.log(this.checkAllFlag)
                    console.log(this.arr)
                }
            }
    }])
})




