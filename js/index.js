$(function(){
    var database=[];

    $.setL=function(key,value){
        localStorage[key]=JSON.stringify(value);
    }
    $.getL=function(key){
        return JSON.parse(localStorage[key]);
    }

    //获取
    
    var render=function(){
        $('.todos').empty();
        for(var i=0; i<database.length;i++){
            var v=database[i];
            $('<li data-id="'+v.id+'" class="row '+(v.isDone?'wancheng':'')+'"><div class="check"></div><p>' + v.name + '</p><div class="delete"></div><input type="text" value="'+ v.name+'"></li>')
                .prependTo('.card .todos')
        }
    }
    // render();

    if(localStorage.data){
        database=$.getL('data');
        render();
    }

    //新增
    $('.header input').focus();
    var header= $('.header input')
    header.on('keyup',function(e) {
        if (e.keyCode === 13) {
            var v = $(this).val().trim();
            if( v === ''){
                return;
            }
            $('<li class="row"><div class="check"></div><p>' + v + '</p><div class="delete"></div><input type="text" value="'+v+'"></li>')
                .prependTo('.card .todos')
            //存取
            if(database.length){
                var id=database[database.length-1].id+1;
            }else{
                var id=1;
            }
            
            database.push(
                {id:id,name:v,isDone:0}
            );
            $.setL('data',database);
            $(this).val('').focus();
        }
    })
    $('.card .todos').on('click','.check',function(){
        $(this).closest('.row').toggleClass('wancheng');
        var li=$(this).closest('li');
        var id=parseInt(li.attr('data-id'));
        if($(this).closest('.row').hasClass('wancheng')){
            var x=1;
        }else{
            var x=0;
        }
        for(var i=0;i<database.length;i++){
            if(database[i].id===id){
                database[i].isDone=x;
            }
        }
        $.setL('data',database);
    })
    $('.card .todos').on('click','.delete',function(){
        var li=$(this).closest('li');
        var id=parseInt(li.attr('data-id'));
        li.remove();
        var newArr=[];
        for(var i=0;i<database.length;i++){
            if(database[i].id!=id){
                newArr.push(database[i]);
            }
        }
        database=newArr;
        $.setL('data',database);
    })
    $('.card .todos').on('dblclick','.row',function(){
        $(this).addClass('bianji');
        var el=$(this).find('input');
        el.val(el.val()).focus()
    })
    $('.card .todos').on('blur','input',function(){
        var li=$(this).closest('li');
        var id=parseInt(li.attr('data-id'));
        li.removeClass('bianji');
        $(this)
        .closest('li')
        .find('p')
        .text($(this).val());
        for(var i=0;i<database.length;i++){
            if(database[i].id===id){
                database[i].name=$(this).val();
            }
        }
        $.setL('data',database);
    })
})