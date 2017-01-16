$(function(){
    list();
});

function list(){
    $.ajax({
        url: "/routes",
        type: "get",
        datatype: "json",
        success: function (data) {
            var html = "";
            if (data != null && data.length>0) {
                for(var i=0;i<data.length;i++){
                    var name =data[i].name;
                    var id =data[i].area;
                    var update_time =data[i].update_time;
                    if(update_time!=null && ""!=update_time){
                        update_time = update_time.substring(0,update_time.length-2);
                    }
                    html+="<tr>";
                    html+=" <td>"+data[i].area+"</td>";
                    html+=" <td>"+(update_time==null?"":update_time)+"</td>";
                    if("1"==data[i].state){
                        $("#img_"+id).attr("src","images/"+id+".gif");
                        html+=" <td><button type='button' class='btn btn-success' id='"+id +"' value='"+name+"'>开</button></td>";
                    } else {
                        $("#img_"+id).attr("src","images/"+id+".png");
                        html+=" <td><button type='button' class='btn btn-default' id='"+id +"' value='"+name+"'>关</button></td>";
                    }
                    html+="</tr>";
                }
            } else {
                alert("无数据！");
            }
            $("tbody").html(html);
            $(".table tbody tr td button").click(function(){
                if($(this).hasClass("btn-default")){//开
                    changeState($(this),true);
                } else {
                    changeState($(this),false);
                }
            });
        },
        error: function (data) {
            if (data.status == 500) {
                var errorText  = JSON.parse(data.responseText);
                alert(errorText.message);
            } else {
                alert("网络异常，请稍后操作！");
            }
        }
    });
}

function routeUpdateState(e,name,state){
    $.ajax({
        url: "/routeUpdateState",
        type: "post",
        data:{
            "name":name,
            "state":state
        },
        datatype: "json",
        success: function (data) {
            if("1"==state){//开
                e.removeClass("btn-default");
                e.addClass("btn-success");
                e.html("开");
                var id=e.attr("id");
                $("#img_"+id).attr("src","images/"+id+".gif");
            } else {
                e.removeClass("btn-success");//关
                e.addClass("btn-default");
                e.html("关");
                var id=e.attr("id");
                $("#img_"+id).attr("src","images/"+id+".png");
            }
        },
        error: function (data) {
            if (data.status == 500) {
                var errorText  = JSON.parse(data.responseText);
                alert(errorText.message);
            } else {
                alert("网络异常，请稍后操作！");
            }
        }
    });
}

function changeState(e,flag){
    routeUpdateState(e,e.attr("value"),flag?"1":"0");
}

$("#btnAll").click(function(){
    var openclose = true;
    if($(this).hasClass("acitve")){
        openclose = false;
        $(this).removeClass("acitve");
    } else {
        $(this).addClass("acitve");
        openclose = true;
    }
    $(".table tbody tr td button").each(function(){
        changeState($(this),openclose);
    });
});