var caution = false
function setCookie(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "")
    if (!caution || (name + "=" + escape(value)).length <= 4000)
        document.cookie = curCookie
    else
    if (confirm("Cookie exceeds 4KB and will be cut!"))
        document.cookie = curCookie
}
function getCookie(name) {
    var prefix = name + "="
    var cookieStartIndex = document.cookie.indexOf(prefix)
    if (cookieStartIndex == -1)
        return null
    var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)
    if (cookieEndIndex == -1)
        cookieEndIndex = document.cookie.length
    return (document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
}
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT"
    }
}
function fixDate(date) {
    var base = new Date(0)
    var skew = base.getTime()
    if (skew > 0)
        date.setTime(date.getTime() - skew)
}
var now = new Date()
fixDate(now)
now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
var visits = getCookie("counter")
if (!visits)
    visits = 1
else
    visits = parseInt(visits) + 1
setCookie("counter", visits, now)
//$("#visitor_num").html("visited number: <span>"+parseInt(visits)+"</span>");

$( "#visitor_log" ).html(
    //"<li>Total Visitors: <span>"+parseInt(visits)+"</span>"+"" +
    "<li>You Visited:  <span>"+parseInt(visits)+"</span></li>"
    + "<li>Language:  "+navigator.language+"</li>"
    + "<li>Platform:  "+navigator.platform+"</li>"


);
$( "#visitor_log span" ).css
({
    "background": "rgba(0, 170, 160,1)",
    "color":"white",
    "padding":"2px",
    "font-size":"200%"
});
//////////////////////////////////////////////////////
function show_num(n){
    var it = $(".t_num i");
    var len = String(n).length;
    for(var i=0;i<len;i++){
        if(it.length<=i){
            $(".t_num").append("<i></i>");
        }
        var num=String(n).charAt(i);
        var y = -parseInt(num)*30; //y轴位置
        var obj = $(".t_num i").eq(i);
        obj.animate({ //滚动动画
                backgroundPosition :'(0 '+String(y)+'px)'
            }, 'slow','swing',function(){}
        );
    }
}
function getdata(){
    $.ajax({
        url: 'data.php',
        type: 'POST',
        dataType: "json",
        cache: false,
        timeout: 10000,
        error: function(){},
        success: function(data){
            show_num(data.count);
        }
    });
}