/**
 * Created by Jason on 2017/5/3.
 * 登录界面
 */

myApp.controller('LoginController', function($scope, $http, $q, $location) {
    $scope.signInFlage = false;
    $scope.modal = { title: "haha" };

    //注册
    // $scope.signUp = function() {
    //     $http({
    //         method: 'post',
    //         url: '/Login/SignUp',
    //         data: {
    //             Email: $scope.Email,
    //             Account: $scope.Account,
    //             PassWord: $scope.PassWord,
    //             Code: $scope.CodeEmail
    //         }
    //     }).then(function(data) {
    //         data = data && data.data ? data.data : data;
    //         $scope.modal.title = "注册结果";
    //         $scope.modal.body = data.msg;
    //         $("#result-modal").modal();
    //     });
    // }

    //登录
    $scope.signIn = function() {
        console.log('login');
        $http({
            method: 'post',
            url: '/Login/SignIn',
            data: {
                Account: $scope.Account,
                PassWord: $scope.Pwd,
                Code: $scope.Code
            }
        }).then(function(data) {
            console.log(data);
            $scope.modal.title = "登录结果";
            data = data && data.data ? data.data : data;
            $scope.modal.body = data.msg;
            if (data.isSuccess == true) {
                localStorage.setItem('IsLogin', data.isSuccess);
                localStorage.setItem('LoginAccount', data.Account);
                localStorage.setItem('mx_token', data.access_token);
                localStorage.setItem('mx_key', data.Account);
                var backurl = $location.$$search.backurl ? $location.$$search.backurl : "/admins/baseInfo";
                localStorage.setItem('backurl', backurl);
                window.location.href='/index#!/admins/baseInfo?'+accesstokenstring;
            } else {
                $("#result-modal").modal();
            }
        });
    }
    $scope.hideModel = function() {
        $("#result-modal").modal('hide');
        $scope.signInFlage = !$scope.signInFlage;
        window.location.reload();
    }

})