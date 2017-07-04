//require("../city.min.js");
myApp.controller('addressController', function($scope, $http, $q, $location) {
    //初始化数据
    $scope.show = false;
    $scope.add = false;
    $scope.save = false;
    var citylist;
    $scope.formdata = {};
    $scope.formdata.Country = '中国';

    citylist = citys.citylist;
    $scope.province = [];
    for (var i = 0; i < citylist.length; i++) {
        $scope.province.push(citylist[i].p)
    }

    $scope.changeCity = function() {
        $scope.city = [];
        for (var i = 0; i < citylist.length; i++) {
            if ($scope.formdata.Province == citylist[i].p) {
                if (citylist[i].c.length) {
                    for (var j = 0; j < citylist[i].c.length; j++) {
                        $scope.city.push(citylist[i].c[j].n);
                    }
                }
            }
        }
    }

    $scope.changeDist = function() {
        $scope.dist = [];
        for (var i = 0; i < citylist.length; i++) {
            if ($scope.formdata.Province == citylist[i].p) {
                for (var j = 0; j < citylist[i].c.length; j++) {
                    if ($scope.formdata.City == citylist[i].c[j].n) {
                        if (citylist[i].c[j].a) {
                            for (var k = 0; k < citylist[i].c[j].a.length; k++) {
                                $scope.dist.push(citylist[i].c[j].a[k].s);
                            }
                        }
                    }
                }
            }
        }
    }

    $scope.addAddress = function(action) {
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
            window.location.reload();
        })
    }

    $scope.setDefault = function(id) {
        var action = '/users/setAddressDefault';
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        $http({
            method: 'post',
            url: action + urlconnect + accesstokenstring,
            data: {
                _id: id,
            }
        }).then(function(data) {
            window.location.reload();
        })
    }

    $scope.delete = function(id) {
        var action = '/users/deleteAddress';
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        $http({
            method: 'post',
            url: action + urlconnect + accesstokenstring,
            data: {
                _id: id,
            }
        }).then(function(data) {
            window.location.reload();
        })
    }

    $scope.check = function(id) {
        var action = '/users/checkAddress';
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        $http({
            method: 'post',
            url: action + urlconnect + accesstokenstring,
            data: {
                _id: id,
            }
        }).then(function(data) {
            data = data && data.data ? data.data : data;
            $scope.formdata = data[0];
            $scope.changeCity();
            $scope.changeDist();
            $scope.show = true;
            $scope.add = false;
            $scope.save = true;
        })
    }

    $scope.saveAddress = function(action) {
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
            window.location.reload();
        })
    }


})