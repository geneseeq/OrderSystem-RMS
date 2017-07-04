jasonapp.service('jasonService', function($http, $q) {
    this.IintSelect = function(url, params, isActive) {
        return $http({
            method: 'get',
            url: url + accesstokenstring,
            params: {
                pageindex: 1,
                pagesize: 10,
                f: {

                }
            }
        })
    }
});
angular.module('jason.pagination').directive('jasonSelect', function($http, jasonService) {
    return {
        restrict: 'EA',

        template: '<select id ="selectChange">' +
            '<option  ng-if="isAdd" ng-selected="true" value="optionDefault.value">{{optionDefault.text}}</option>' +
            '<option  ng-if="isAdd" ng-repeat="item in options.slice(1)" value={{item.value}}>{{item.text}}</option>' +
            '<option  ng-if="!isAdd" ng-repeat="item in options" value={{item.value}}>{{item.text}}</option>' +
            '</select>',
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {

            var url = attrs.source;
            jasonService.IintSelect(url).then(function(reponse) {
                scope.options = reponse.data.data;
                scope.isAdd = window.location.href.indexOf("type=add") > 0;
                scope.options.forEach(
                    function(o) {
                        Object.assign(o, { text: o[attrs.stext], value: o[attrs.svalue] });
                    }
                );
                scope.optionDefault = scope.options[0];
            });



        }
    };
});