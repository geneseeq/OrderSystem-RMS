myApp.service('jasonService', function($http, $q) {
    this.Get = function(action, params) {
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";

        return $http({
            method: 'get',
            url: action + urlconnect + accesstokenstring,
            params: params
        });

    }
    this.Get = function(action, params) {
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        return $http({
            method: 'post',
            url: action + urlconnect + accesstokenstring,
            data: params
        });

    }
});