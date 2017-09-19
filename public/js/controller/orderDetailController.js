/**
 * Created by Jason on 2017/5/09.
 * 订单明细页面
 */

myApp.controller('orderDetailController', function($scope, FileUploader, $http, $q, $location, $timeout,$sce) {;
    $scope.detail = { samples: [] }; //orderdetail
    $scope.samples = $scope.detail.samples; //sample lists
    $scope.uploader={queue:[]};
 
    $scope.sampleNumber = -1;
 
    $scope.remark={};
    $scope.OrderID = $location && $location.$$search.OrderID
        //getorderDetails and samples

        $http({
            method: 'get',
            url: '/orders/getOrderDetails?' + accesstokenstring,
            params: {
                OrderID: $scope.OrderID
            }
        }).then(function(data) {
            $scope.detail = data && data.data && data.data.data;
            $scope.samples =(data && data.data && data.data.data.samples)||[];
            $scope.detail.Attachments&&$scope.detail.Attachments.map(function(item){
                $scope.uploader.queue.push({isSuccess:true,progress:100, file: { alias:item.AttachmentAlias,name: item.AttachmentName, size:parseInt(item.AttachmentSize)} });
            });
            $scope.detail.BuildFactoryHtmL=$sce.trustAsHtml($scope.detail.BuildFactory);
            $scope.detail.SpecificSequenceHtmL=$sce.trustAsHtml($scope.detail.SpecificSequence);
            $scope.detail.OrderMemoHtmL=$sce.trustAsHtml($scope.detail.OrderMemo);
            $scope.detail.Address=$scope.detail.AcceptAddressString.split(",")[0];
        });
        $scope.operate1 = function () {
            $("#result-modal-remark").modal();
        }
        $scope.check = function(index, action) {
            $scope.currentData = $scope.detail;
            $scope.currentData.feedback = $scope.remark.feedback;
            $scope.currentData.checksuggestion = $scope.remark.checksuggestion;
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
            })
        }
   
});