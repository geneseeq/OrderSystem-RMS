/**
 * Created by Jaosn on 2016/11/28.
 * Description :page context
 */

var jasonapp = angular.module('jason.pagination', []);
jasonapp.directive('jasonPagecontent', function() {
    return {
        restrict: 'EA',
        template: "<div class='page-content'><div ng-transclude=''></div></div>",
        scope: {
            conf: '='
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.f = {};
            scope.conf.action = attrs.action;
            scope.conf.actionform = attrs.actionform;

        }
    }
});