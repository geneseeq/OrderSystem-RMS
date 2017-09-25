myApp.filter('sordertype', (function() {
    var inputArray = ["已构建的文库(需要世和混样)", "已构建的文库(不需要世和混样)", "自定义(需要世和协助-请单独和相关负责人联系)"];
    return function(inputValue) {

        return inputArray[inputValue];
    }
})).filter('status', (function() {
    var inputArray = ["已送达，待阅","已阅，信息完整","已阅，信息不全，需补充"];
    return function(inputValue,savestatus) {
        if(savestatus!="0"){
            inputValue==""?inputValue=="0":"";
            return inputArray[inputValue];
        }else{
            return "已暂存";
        }
    }
})).filter('showName',function(){ 
    
     return   function(param,showCol,action) {
         if(param==null||param==""||param=="optionDefault.value"){
           return "";
         };
        var urlconnect = action.indexOf("?") > 0 ? "&" : "?";
        var responseText= $.ajax({
                type:"get",
                url:action + urlconnect + accesstokenstring,
                data:{_id:param},
                async: false
            }).responseText;
            var data=JSON.parse(responseText).data[showCol];
            return data;
        }
}).filter('showSampleType',function(){ 
    var arr=["外显子文库","RNAseq","小RNA文库","扩增子文库","CHIP-seq","甲基化文库","其他"];
     return   function(param) {
       var input= param||{};
       var str="";
       for(var key in input){
        if(input[key]==true&&arr[key]){
            str+=(arr[key]+",");
        }
     }
     return str;
    }
}).filter('showChinaName', (function() {
    return function(inputValue,inputArray) {
        return inputArray[inputValue];
    }
})).filter('showReadLine',function(){
    var dir={'Novaseq6000_0':"包FC PE 150 bp 数据量 1000-1200Gb","HiseqXten_0":"包lane   PE150 bp  数据量 120Gb"};
    dir["Hiseq4000_0"]="包lane   PE150 bp  数据量 100Gb";
    dir["Miseq_1"]="包FC  PE250 bp 数据量4.5-5.1Gb";
    dir["Miseq_2"]="Miseq 包FC  PE300 bp 数据量13.2-15Gb";
    dir["Nextseq_1"]="High-Output kit 包FC PE150 bp 数据量100-120Gb";
    dir["Nextseq_2"]="Mid-Output kit 包FC PE150 bp 数据量 32.5-39Gb";
    dir["MiniSeq_1"]="High-Output kit 包FC  PE150 bp 数据量6.6-7.5Gb";
    dir["MiniSeq_2"]="Mid-Output kit 包FC  PE150 bp 数据量2.1-2.4Gb";
    return   function(param) {
        return dir[param];

     }
});