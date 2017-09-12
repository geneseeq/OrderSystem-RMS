myApp.controller('changePwdController', function($scope, $http, $q, $location) {
    $scope.lastPwd='';
    $scope.newPwd = '';
    $scope.confirmPwd = '';
    $scope.newPwdEmpty = false;
    $scope.save = function () {
        if($scope.lastPwd==''){
            $scope.lastPwdEmpty=true;
            return 0;
        }
        $scope.lastPwdEmpty=false;
        if($scope.newPwd == ''){
            $scope.newPwdEmpty = true;
            return 0;
        }
        $scope.newPwdEmpty = false;
        // $scope.formdata.Pwd = md5($scope.newPwd);
        $http({
            method: 'post',
            url: '/admins/changeUserPwd?' + accesstokenstring,
            data: {
                lastPwd:md5($scope.lastPwd),
                newPwd:md5($scope.newPwd)
            }
        }).then(function(data) {
            $scope.modal.title = "结果";
            data = data && data.data ? data.data : data;
            $scope.modal.body = data;
            $("#result-modal-base").modal();

        })
    }
})