myApp.filter('sordertype', (function() {
    var inputArray = ["已构建的文库(需要世和混样)", "已构建的文库(不需要世和混样)", "自定义(需要世和协助-请单独和相关负责人联系)"];
    return function(inputValue) {

        return inputArray[inputValue];
    }
}));