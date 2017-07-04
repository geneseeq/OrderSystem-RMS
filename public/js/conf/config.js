var accesstokenstring = "access_token=" + localStorage.getItem('mx_token') + "&mxkey=" + localStorage.getItem('mx_key');
var myApp = angular.module('myApp', ['ngRoute', 'angularFileUpload', 'jason.pagination', 'monospaced.qrcode']);
myApp.config(function($routeProvider, $interpolateProvider) {

    // Swig uses {{}} for variables which makes it clash with the use of {{}} in AngularJS.
    // Replaced use of {{}} with [[]] in AngularJS to make it work with Swig.
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    $routeProvider.
    when('/index', {
            templateUrl: '/index/main?' + accesstokenstring
        })
        .when('/index/main', {
            templateUrl: '/index/main?' + accesstokenstring
        })
        .when('/serviceInfo', {
            templateUrl: '/index/serviceInfo?' + accesstokenstring
        })
        .when('/serviceList', {
            templateUrl: '/index/serviceList?' + accesstokenstring
        })
        .when('/serviceDetail/baolane', {
            templateUrl: '/serviceDetail/baolane?' + accesstokenstring
        })
        .when('/admins/baseInfo', {
            templateUrl: '/admins/baseInfo?' + accesstokenstring
        })
        .when('/List/orderList', {
            templateUrl: '/List/orderList?' + accesstokenstring
        })
        .when('/orders/myorders', {
            templateUrl: '/orders/myorders?' + accesstokenstring
        })
        .when('/orders/getList', {
            templateUrl: '/orders/getList' + accesstokenstring
        })
        .when('/orders/orderDetail', {
            templateUrl: '/orders/orderDetail?' + accesstokenstring
        })
        .when('/orders/printOrder', {
            templateUrl: '/orders/printOrder?' + accesstokenstring
        })
        .otherwise({
            redirectTo: '/index/main'
        })

}).controller('baseController', function($rootScope, $scope, $http, $q, $location) {
    //初始化数据
    $scope.modal = {};
    $scope.paginationConf = {
        currentPage: 1,
        itemsPerPage: 10,
        action: "",
        actionform: ""
    };
    $scope.f = {};
    $scope.colspanFlage = false;
    $scope.disabled = true;
    $scope.IsLogin = localStorage.getItem('IsLogin') == "true";
    $scope.LoginAccount = localStorage.getItem('LoginAccount');
    $location.$$search._id ? $scope.add = true : $scope.add == false;
    $scope.backurl = localStorage.getItem('backurl');
    localStorage.setItem('backurl', "");
    if ($scope.backurl && $scope.backurl.length > 0) {
        $location.path($scope.backurl);
    }
    $scope.colspan = function() {
        $scope.colspanFlage = !$scope.colspanFlage;
    }
    $scope.changedisabled = function() {
        $scope.disabled = !$scope.disabled;
    }
    $scope.search = function() {
        pageInit();
    }
    $scope.cancel = function() {
        $scope.f = {};
        pageInit();
    }
    $scope.f = {};
    $scope.baseSave = function(action) {
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        $http({
            method: 'post',
            url: action + urlconnect + accesstokenstring,
            data: {
                formdata: $scope.formdata
            }
        }).then(function(data) {
            $scope.modal.title = "结果";
            data = data && data.data ? data.data : data;
            $scope.modal.body = data.msg || data.data;
            $("#result-modal-base").modal();

        })
    }
    $scope.updateLine = function(index, action) {
        $scope.currentData = $scope.datas[index];
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        $http({
            method: 'post',
            url: action + urlconnect + accesstokenstring,
            data: {
                formdata: $scope.currentData
            }
        }).then(function(data) {
            $scope.modal.title = "结果";
            data = data && data.data ? data.data : data;
            $scope.modal.body = data.msg || data.data;
            $("#result-modal-base").modal();
            window.location.reload()
        })
    }
    $scope.updateMass = function (action) {
        var updataId = [];
        for(let i=0;i<$scope.datas.length;i++){
            if($scope.datas[i].checked == true){
                updataId.push($scope.datas[i]._id)
            }
        }
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        $http({
            method:'post',
            url:action + urlconnect + accesstokenstring,
            data:{
                updataId:updataId
            }
        }).then(function (data) {
            $scope.modal.title = "结果";
            data = data && data.data ? data.data : data;
            $scope.modal.body = data.msg || data.data;
            $("#result-modal-base").modal();
            window.location.reload();
        })
    }

    function pageInit() {
        if ($scope.paginationConf && $scope.paginationConf.action && $scope.paginationConf.action != "") {
            var urlconnect = $scope.paginationConf.action.indexOf("?") > 0 ? "&" : "?";
            $http({
                method: 'get',
                url: $scope.paginationConf.action + urlconnect + accesstokenstring,
                params: {
                    pageindex: $scope.paginationConf.currentPage,
                    pagesize: $scope.paginationConf.itemsPerPage,
                    f: $scope.f
                }
            }).then(function(response) {
                $scope.datas = response.data && response.data.data;
                $scope.paginationConf.totalItems = response.data && response.data.dataNum;
            })
        }
    }

    function formInit() {
        if ($scope.paginationConf && $scope.paginationConf.actionform && $scope.paginationConf.actionform != "") {
            var urlconnect = $scope.paginationConf.actionform.indexOf("?") > 0 ? "&" : "?";
            $http({
                method: 'get',
                url: $scope.paginationConf.actionform + urlconnect + "_id=" + $location.$$search._id + "&" + accesstokenstring,
                params: {
                    pageindex: $scope.paginationConf.currentPage,
                    pagesize: $scope.paginationConf.itemsPerPage,
                    f: $scope.f
                }
            }).then(function(response) {
                $scope.formdata = response.data && response.data.data;
            })
        }
    }
    $scope.$watch('paginationConf.currentPage+paginationConf.itemsPerPage', pageInit);
    $scope.$watch('paginationConf.action', pageInit);
    $scope.$watch('paginationConf.actionform', formInit);
    $scope.signOut = function() {
        localStorage.setItem('IsLogin', false);
        localStorage.setItem('LoginAccount', "");
        localStorage.setItem('mx_token', "");
        localStorage.setItem('mx_key', "");
        localStorage.setItem('mx_key', "");
        localStorage.setItem('backurl', "/index/main");
        window.location.reload();
        // $location.path('/index/main?backurl=' + $location.path());
        // window.location.load = window.location.origin + window.location.pathname + '#!/index/main?backurl=' + $location.path();
    }
    $scope.hideModel = function() {
        $("#result-modal").modal('hide');
        $("#result-modal-base").modal('hide');
        $scope.signInFlage = !$scope.signInFlage;
        $location.path().indexOf('index/main') > 0 ? window.location.reload() : "";
        $location.path().indexOf('users/baseInfo') > 0 ? window.location.reload() : "";
        $location.$$search.type == "add" ? window.history.back() : "";

        //window.location.reload();
    }
    $scope.refresh = function() {
        $scope.modal = {};
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10,
            action: "",
            actionform: ""
        };
        $scope.f = {};
    }
    $rootScope.$on('$locationChangeSuccess', function() {　　　　
        $scope.refresh();
        console.log('结束改变$location')
    });
});

function toUtf8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function alert() {

}