/**
 * Created by Jason on 2017/5/09.
 * 订单明细页面
 */

myApp.controller('orderDetailController', function($scope, FileUploader, $http, $q, $location, $timeout) {;
    $scope.detail = { samples: [] }; //orderdetail
    $scope.samples = $scope.detail.samples; //sample lists
    $scope.newSample = {};
    $scope.checkBoxDisable=[];
    $scope.sampleNumber = -1;
    $scope.add = false;
    $scope.OrderID = $location && $location.$$search.OrderID
        //getorderDetails and samples
    if ($scope.OrderID) {
        $http({
            method: 'get',
            url: '/orders/getOrderDetails?' + accesstokenstring,
            params: {
                OrderID: $scope.OrderID
            }
        }).then(function(data) {
            $scope.detail = data && data.data && data.data.data;

            $scope.samples = data && data.data && data.data.data.samples;
            var Attachment1 = $scope.detail.Attachment1 ? $scope.detail.Attachment1.split(",") : [];
            if (Attachment1.length > 0)
                $scope.uploader.queue.push({ file: { name: Attachment1[0], size: Attachment1[1] } })
            var Attachment2 = $scope.detail.Attachment2 ? $scope.detail.Attachment1.split(",") : [];
            if (Attachment2.length > 0)
                $scope.uploader.queue.push({ file: { name: Attachment2[0], size: Attachment2[1] } })
            $("#code").qrcode({
                render: "canvas",
                width: 200,
                height: 200,
                text: toUtf8($scope.detail.OrderID + $scope.detail.ProgramID)
            });
            $timeout(function() {
                $scope.samples.forEach(function(element) {
                    $("#" + element._id).qrcode({
                        render: "canvas",
                        width: 200,
                        height: 200,
                        text: toUtf8(element.OrderID + "," + element.SampleID)
                    });
                });
            }, 2000);

        });
    } else {
        $http({
            method: 'get',
            url: '/admins/getInistitutionLists?' + accesstokenstring,
            params: {
                f: { 'IsDefault': "1" },
                pageindex: 1,
                pagesize: 10
            }
        }).then(function(data) {
            $scope.detail = {};
            $scope.detail.Instituion = data && data.data && data.data.data && data.data.data[0]._id;
        })

        $scope.disabled = !$scope.disabled;
        $scope.add = true;
    }
    $scope.save = function() {
        $scope.detail.Attachment1 = uploader.queue.length > 0 ? uploader.queue[0].file.name + "," + uploader.queue[0].file.size : "";
        $scope.detail.Attachment2 = uploader.queue.length > 1 ? uploader.queue[1].file.name + "," + uploader.queue[1].file.size : "";
        $http({
            method: 'post',
            url: '/orders/saveOrder?' + accesstokenstring,
            data: {
                detail: $scope.detail
            }
        }).then(function(data) {
            $scope.modal.title = "结果";
            data = data && data.data ? data.data : data;
            $scope.modal.body = data.msg;
            $("#result-modal-base").modal();
        });
    }

    $scope.changedisabled = function() {
        $scope.disabled = !$scope.disabled;
    }
    $scope.print = function() {
        window.print();
    }
    $scope.changeReceiveWayType = function(value) {
            var arrReceive = ["", "干冰+冰袋", "冰袋", "液氮", ""];
            $scope.detail ? $scope.detail.ReceiveWayTypeString = arrReceive[parseInt(value)] : "";
        }
        /*$scope.addSample = function() {
            $("#result-modal-sample").modal('show');
        }*/
     $scope.addSample = function() {
        $scope.sampleNumber=-1;
        $scope.newSample = {};
        $("#result-modal-sample").modal('show');
    }
    $scope.confirmAddSample = function() {
        let selected = [];
        for (let i = 0; i < 7; i++) {
            if ($scope.newSample.SampleType[i] == true) {
                selected.push(i + 1);
            }
        }
        $scope.newSample.SampleType = selected;
        $scope.newSample.SampleType = $scope.newSample.SampleType.join(",");
        if($scope.sampleNumber!=-1){
            $scope.samples[$scope.sampleNumber] = $scope.newSample;
        }else{
            $scope.samples.push($scope.newSample);
        }
        $scope.newSample = {};
        $("#result-modal-sample").modal('hide');
    }
    $scope.cancleAddSample = function() {
        $("#result-modal-sample").modal('hide');
    }
    $scope.editSample = function(index) {
        $scope.sampleNumber = index;
        $scope.newSample = $scope.samples[index];
        $scope.newSample.SampleType = $scope.newSample.SampleType.split(",");
        $("#result-modal-sample").modal('show');
    }
    $scope.deleteSample = function(index) {
        $scope.samples.splice(index, 1);
    }
    $scope.checkBox = function () {
        let count=0;
        for (let i = 0; i < 7; i++) {
            if ($scope.newSample.SampleType[i] == true) {
                count++;
            }
        }
        if(count>=3){
            for(let i=0;i<7;i++) {
                $scope.checkBoxDisable[i] = !$scope.newSample.SampleType[i];
            }
        }else{
            for(let i=0;i<7;i++){
                $scope.checkBoxDisable[i]=false;
            }
        }
    }



    $scope.addAttachment = function() {
        $("#jsonuploadfile").click();
    }
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php'
    });

    // FILTERS

    // a sync filter
    uploader.filters.push({
        name: 'syncFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            console.log('syncFilter');
            return this.queue.length < 10;
        }
    });

    // an async filter
    uploader.filters.push({
        name: 'asyncFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options, deferred) {
            console.log('asyncFilter');
            setTimeout(deferred.resolve, 1e3);
        }
    });
    $scope.queue = [];
    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = (function(scope) {
        return function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        }
    })($scope);
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
});