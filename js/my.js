var ag=angular.module('ag',['ngAnimate']);
ag.controller('mainCtrl',['$scope','$timeout',function($scope,$timeout){
    setInterval(function(){
        $timeout(function(){
            var date=new Date();
            var h=date.getHours();
            var m=date.getMinutes();
            var s=date.getSeconds();
            h=(h<10)?('0'+h):h;
            m=(m<10)?('0'+m):m;
            s=(s<10)?('0'+s):s;
            $scope.title=h+':'+m+':'+s;
        },0);
    },500);

    if(localStorage.__x){
        $scope.todos=JSON.parse(localStorage.__x);
    }else{
        $scope.todos=[];
    }
    
    $scope.count=$scope.todos.length;
    
    $scope.save=function(){
        localStorage.__x=JSON.stringify($scope.todos);
    }
    //增加
    $scope.name='';
    $scope.add=function (e) {
        if(e.keyCode===13){
            if($scope.todos.length==0){
                var id=1000;
            }else{
                var max=-Infinity;
                for(var i=0;i<$scope.todos.length;i++){
                    var value=$scope.todos[i];
                    if(value.id>max){
                        max=value.id;
                    }
                }
                var id=max+1;
            }
            $scope.todos.push({id:id,name:$scope.name,isDone:false});
            $scope.name='';
            $scope.count=$scope.todos.length;
        }
    }
    //删除
    $scope.delete=function(id){
        var index;
        for(var i=0;i<$scope.todos.length;i++){
            if($scope.todos[i].id==id){
                index=i;
            }
        }
        $scope.todos.splice(index,1);
        $scope.count=$scope.todos.length;
    }
    //聚焦
    $scope.focus=function(e){
        $timeout(function(){
            $(e.currentTarget).find('input').trigger('focus');
        },0);
    }
    $scope.clear=function(){
        var arr=[];
        for(var i=0;i<$scope.todos.length;i++){
            if(!$scope.todos[i].isDone){
                arr.push($scope.todos[i]);
            }
        }
        $scope.todos=arr;
        $scope.count=$scope.todos.length;
    }
}])