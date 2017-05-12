/**
 * Created by edz on 2017/5/8.
 */
$(function () {
    //首次进入调用刷新
    Refresh();
    //进入
    first_entry();
    pushHistory();
    $(document).on('click','.guanbi',function () {
        //ajax请求删除方法
        $(this).parents('.ui-list').fadeTo("slow", 0.01, function(){//fade
            $(this).remove();
            new Toast({
                context : $('body'),
                message : $('.ui-list').length
            }).show();
            if($('.ui-list').length == 0){
                Refresh();
            }
        });
    });
//主题选择切换
    $(".ui-tab-nav img").on('click', function () {
        $('section').css('display', 'none');
        // $('.theme-choice').slideToggle(500, function () {
            $('.theme-choice').css('display', 'block');
        // });
    });
    $(".drop-up").on('click', function () {
        // $('section').slideToggle(500, function () {
            $('section').css('display', 'block');
        // });
            $('.theme-choice').css('display', 'none');
    });
//删除主题
    $(".theme span img").on('click', function () {
        new Toast({
            context : $('body'),
            message : '删除主题'
        }).show();
    });

//点赞方法
    $(document).on('click','.zan img',function () {
        if($(this).attr('src')=='image/zan-g.png'){
            $(this).attr('src','image/zan-b.png');
            var zanNum = parseInt($(this).next().text())+1;
            $(this).next().text(zanNum);
        }else{
            new Toast({
                context : $('body'),
                message : '不能多次点赞'
            }).show();
        }

    });

/**
 * 跳转监测事件
 */
var url = null; //url
var item_id = null;
    $(document).on('click','.ui-list a',function () {
        new Toast({
            context : $('body'),
            message : '用户浏览item-id为'+window.sessionStorage.getItem('item_id')+'进入时间为'+window.sessionStorage.getItem('entry_time')+'离开时间为'+
            window.sessionStorage.getItem('over_time')
        }).show();
        url = $(this).data('url');
        item_id = $(this).data('id');
        set_sess_storage('entry_time',getNowFormatDate());
        set_sess_storage('item_id',item_id);
        //ajax传入item_id和entry_time
        window.location.href=url;
    });

});

//关注
$(document).on('click','.follow-state',function () {
        new Toast({
           context:$('body'),
            message:'取消关注'
        }).show();
    });

//取消关注
    $('.follow-state-no').on('click',function () {
        new Toast({
           context : $('body'),
           message : "关注"
        }).show();
    });

//展开全部
    $('.all').on('click',function () {
        new Toast({
            context : $('body'),
            message : "展开全部"
        }).show();
    });

//判断entry_time是否为空，如果不为空则是返回时进入的，调用浏览结束接口

function first_entry() {
    if(!window.sessionStorage.getItem('entry_time')){
        //为用户首次进入系统时间
        console.log('fuck')
        set_sess_storage('first_soft',getNowFormatDate());
    }else{
        //拿到当前时间，为用户返回时间，ajax
        console.log('用户浏览item-id为'+window.sessionStorage.getItem('item_id')+'进入时间为'+window.sessionStorage.getItem('entry_time')+'离开时间为'+
            window.sessionStorage.getItem('over_time'));
        set_sess_storage('over_time',getNowFormatDate());
        alert('用户浏览item-id为'+window.sessionStorage.getItem('item_id')+'进入时间为'+window.sessionStorage.getItem('entry_time')+'离开时间为'+
            window.sessionStorage.getItem('over_time'));
        window.sessionStorage.clear();
    }
}

function pushHistory(){
    window.addEventListener("popstate", function(e){
//            location.replace(document.referrer);
        history.go(0);
    }, false);
    var state = {
        title:"",
        url: ""
    };
    window.history.pushState(state, "", "");
};


/**
 * 监听回退事件
 * @returns {string}
 */


//获取当前日期格式为“yyyy-MM-dd HH:MM:SS”
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if(minutes >=0 && minutes <=9){
        minutes = '0'+minutes;
    }
    if(seconds >=1 && seconds <=9){
        seconds = '0'+seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + minutes
        + seperator2 + seconds;
    return currentdate;
}

// localstorage存储
function set_storage(key,value) {
    window.localStorage.setItem(key,value);
}
// 删除一条localstorage
function del_storage(key) {
    localStorage.removeItem(key);
}
//清空localstorage
function clean_storage() {
    localStorage.clear();
}

// sessionstorage存储
function set_sess_storage(key,value) {
    window.sessionStorage.setItem(key,value);
}
// sessionstorage查询
// function get_sess_storage(key) {
//
// }
// // 删除一条sessionstorage
// function del_sess_storage(key) {
//     window.sessionStorage.removeItem(key);
// }
// //清空sessionstorage
// function clean_sess_storage() {
//     window.sessionStorage.clear();
// }


//当状态改变的时候执行的函数
function handle2() {
    if ($("#search-kw2").val() != '') {
        $("#search_btn2").html("检索");
        document.getElementById("search_btn").removeEventListener("click", cancel2, false);
    } else {
        $("#search_btn2").html("取消");
    }
}

function search_follow(){
    if ($.trim($("#search-kw2").val()) == '') {
        return false;
    }
    tijiao();
}

$('.ui-searchbar').on('click', function () {
    $('.ui-searchbar-wrap').addClass('focus');
    $('.ui-searchbar-input input').focus();
    $('.ui-searchbar-neirong').addClass('none');
    $('.ui-searchbar-wrap .ui-searchbar-input, .ui-searchbar-wrap button, .ui-searchbar-wrap .ui-icon-close .ui-input-img').css('display', 'block');
});

function checksearch() {
    if ($.trim($("#search-kw").val()) == '') {
        return false;
    }
    tijiao();
}

document.getElementById("search_btn").addEventListener("click", cancel, false);
//当状态改变的时候执行的函数
function handle() {
    if ($("#search-kw").val() != '') {
        $("#search_btn").html("检索");
        document.getElementById("search_btn").removeEventListener("click", cancel, false);
    } else {
        $("#search_btn").html("取消");
        document.getElementById("search_btn").addEventListener("click", cancel, false);
    }
}

function tijiao() {
    var query = '?';
    document.searchform.action = g_site_url + '' + query + 'question/search/2' + g_suffix;
    document.searchform.submit();
}

function cancel() {
    $('.ui-searchbar-wrap').removeClass('focus');
    $('.ui-searchbar-neirong').removeClass('none');
    $('.ui-searchbar-wrap .ui-searchbar-input, .ui-searchbar-wrap button, .ui-searchbar-wrap .ui-icon-close .ui-input-img').css('display', 'none');
}

$('#search_btn2').on('click',function () {

    if($('#search_btn2').text()=='取消'){
        cancel2();
    }else if($('#search_btn2').text()=='检索'){

    }

});

function cancel2() {
    $('header').css('display','block');
    $('section').css('display','block');
    $('footer').css('display','block');
    $('.search-follow').css('display','none');
    $('.ui-searchbar-wrap').removeClass('focus');
    $('.ui-searchbar-neirong').removeClass('none');
    $('.ui-searchbar-wrap .ui-searchbar-input, .ui-searchbar-wrap button, .ui-searchbar-wrap .ui-icon-close .ui-input-img').css('display', 'none');
}

/**
 * 关注的搜索框
 */
$('.search .follow-search').on('click',function () {
    $('.follow-img').css('display','none');
    $('.search .follow').removeClass('follow');
    $('section').css('display','none');
    $('.follow-history').css('display','block');
});

$('.search .follow-cancel').on('click',function () {
    $('.follow-img').css('display','block');
    $('#searchForm .ui-searchbar-wrap').addClass('follow');
    $('section').css('display','block');
    $('.follow-history').css('display','none');
});

/**
 * 模仿android里面的Toast效果，主要是用于在不打断程序正常执行的情况下显示提示数据
 * @param config
 * @return
 */
var Toast = function(config){
    this.context = config.context==null?$('body'):config.context;//上下文
    this.message = config.message;//显示内容
    this.time = config.time==null?3000:config.time;//持续时间
    this.left = config.left;//距容器左边的距离
    this.top = config.top;//距容器上方的距离
    this.init();
}
var msgEntity;
Toast.prototype = {
    //初始化显示的位置内容等
    init : function(){
        $("#toastMessage").remove();
        //设置消息体
        var msgDIV = new Array();
        msgDIV.push('<div id="toastMessage" style="border-radius:18px;-moz-opacity:0.6;opacity:0.6;">');
        msgDIV.push('<span>'+this.message+'</span>');
        msgDIV.push('</div>');
        msgEntity = $(msgDIV.join('')).appendTo(this.context);
        //设置消息样式
        var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2 : this.left;
        var top = this.top == null ? '40px' : this.top;
        msgEntity.css({position:'fixed',bottom:top,'z-index':'99',left:left,'background-color':'black',color:'white','font-size':'15px',padding:'10px',margin:'10px'});
        msgEntity.hide();
    },
    //显示动画
    show :function(){
        msgEntity.fadeIn(this.time/2);
        msgEntity.fadeOut(this.time/2);
    }

}