define(['./module'], function (services) {
    'use strict';

    //定义基本http方法
    services.factory("cisHttp", ["$http", function ($http) {
        return function (url, pars, method) {
            return $http({
                url: url,
                params: pars || {},
                method: method || "post"
            });
        }
    }]).factory("CommHttp", ["cisHttp", function (cisHttp) {
        //公共http服务
        return {
            ChangePwd: function (pars) { return cisHttp("/Account/ChangePwd", pars); }
        };
    }]).factory('selectImgModel',[function(){
        return function (){
            //默认参数
            var defaultOptions = {
                //最大选取个数
                largestNum:5,
                //是否多选 true多选|false 单选
                multiple:true,
                url:null,
                //已选图片list
                imgs:[],
                //回调方法，默认返回
                callBack:function(data){
                    return data;
                }
            };

            var _this = this;
            //选取的图片
            this.selectImgList =[];
            //设置参数
            this.settings = null;
            //执行方法
            this.init = function(options){
                var settings = _this.settings =  $.extend(true,{},defaultOptions,options);
                if( typeof settings.url == 'function'){
                    settings.url();
                }
                if(settings.imgs.length > 0){
                    _this.selectImgList = JSON.parse(JSON.stringify(settings.imgs));
                }
            }
            //图片选取
            this.choose = function(img){
                var sImg = JSON.stringify(img);
                var selectImgList = _this.selectImgList;
                var settings = _this.settings;

                //多选
                if(settings.multiple === true){
                    //限制在最大选取数量内; 如果设置的是单选
                    if(selectImgList.length >= settings.largestNum){
                        return ;
                    }
                    var str = null;
                    var flag = false;
                    for(var i = 0;i<selectImgList.length;i++){
                        str = JSON.stringify(selectImgList[i]);
                        if(sImg == str){
                            flag = true;
                        }
                    }
                    if( flag === false ){
                        _this.selectImgList.push(JSON.parse(sImg));
                    }
                }
                else {
                    //单选
                    if( selectImgList.length >= 1 ){
                        return ;
                    }
                    selectImgList.length = 0;
                    selectImgList.push(JSON.parse(JSON.stringify(img)));
                }
            };
            //删除一个图片
            this.deleteImg = function(img){
                var sImg = JSON.stringify(img);
                var selectImgList = _this.selectImgList;
                var str = null;

                for(var i = 0;i<selectImgList.length;i++){
                    str = JSON.stringify(selectImgList[i]);
                    if(sImg == str){
                        selectImgList.splice(i,1);
                        break;
                    }
                }
            }
            //确定选择
            this.success = function(){
                var settings = _this.settings;
                if( typeof settings.callBack == 'function' ){
                    settings.callBack(JSON.parse(JSON.stringify(_this.selectImgList)))
                }
                _this.selectImgList.length =0;
            }
        }
    }]).factory('copyServices',[function(){
        var C = function (o) {
            return JSON.parse(JSON.stringify(o));
        }
        //数据上报重置数据
        var resetDataReporting = function (){
            return {
                //版面id
                layout_id:scopeProjectId,
                page_id: '',
                component_id: '',
                trigger: "",
                second_trigger: "",
                data_report: [],
                //   上报接口地址
                report_address: []
            }
        };
        var oCopy = {
            block:null,
            com:null,
            //复制数据前验证
            validateCopyData:function(block,com){
                var block = C(block),
                    com = C(com);

                if(typeof com !='Object' || typeof block != 'Object'){return false ;}
                var styleType = com.styleType;
                //不可复制 层，视频，滚动消息，广告组件
                if(!styleType || styleType.indexOf('layer|marquee|video|ad')){return false;}
                else if(styleType.indexOf('image|text|msg|')){
                    //com.id = '';
                    //com.affiliationWarp = '';
                    //com.warpBlockId
                    com.locked = true;
                    com.isDefaultFocus = false;
                    com.dataReporting = resetDataReporting();

                    block.moduleData.length = 0;

                    oCopy.block = block;
                    oCopy.com = com;
                    return true;
                }
            },
            //粘贴数据前验证
            validatePasteData : function (page,block){
                var b = C(oCopy.block),
                    c = C(oCopy.com),
                    page = C(page);

                c.id = nowTime;
                c.affiliationWarp = page.id;
                c.warpBlockId = block.id;


                block.code.columnSize = b.code.columnSize;
                block.code.columnStart =b.code.columnStart
                block.code.rowSize = b.code.rowSize;
                block.code.rowStart = b.code.rowStart;
                block.moduleData.length = 0 ;
                block.moduleData.push(nowTime);


                var pageType = page.pageType;


            }
        }
        return {
            //复制
            copy:function(block,com){
                oCopy.validateCopyData(block,com);
            },
            //粘贴
            paste:function(page){
                return oCopy.validatePasteData(page);
            }
        }
    }]).factory('check',[function(){
        return function($rootScope,$scope){
            this.check={
                arr :[],
                checkAll:false,
                checkAllFlag:false,
                checkAllFn:function(){
                    this.checkAllFlag = this.checkAll = !this.checkAll;
                    if(this.checkAll === true ){
                        this.arr = $scope.imgList;
                    }else{
                        this.arr = [];
                    }
                    console.log(this.arr)
                    console.log(this.checkAll)
                    console.log(this.checkAllFlag)
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
                        this.checkAll =true;
                    }
                    this.look();
                },
                look:function(){
                    console.log(this.checkAll)
                    console.log(this.arr)
                }
            }
        }
    }])
});
