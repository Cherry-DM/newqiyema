var objUrl;
var img_html;
function img_lode(x){
    var img_div = $(this).parent().next();
    var filepath = $(this).val();
    for(var i = 0; i < this.files.length; i++) {
        var objUrl = getObjectURL(this.files[i]);
        var extStart = filepath.lastIndexOf(".");
        var ext = filepath.substring(extStart, filepath.length).toUpperCase();
        /*上传格式规则*/
        if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
            $(".shade").fadeIn(500);
            $(".text_span").text("图片限于bmp,png,gif,jpeg,jpg格式");
            this.value = "";
            img_div.html("");
            return false;
        } else {
            /*若规则全部通过则在此提交url到后台数据库*/
            img_html = "<div class='isImg'><img src='" + objUrl + "' onclick='javascript:lookBigImg(this)' style='height: 100%; width: 100%;' /><button class='removeBtn' onclick='javascript:removeImg(this)'>x</button></div>";
            img_div.append(img_html);
            $(this).parent().fadeOut(100);
        }
    }
    /*鉴定每个图片大小总和*/
    var file_size = 0;
    var all_size = 0;
    for(j = 0; j < this.files.length; j++) {
        file_size = this.files[j].size;
        all_size = all_size + this.files[j].size;
        var size = all_size / 1024;
        if(size > 500) {
            $(".shade").fadeIn(500);
            $(".text_span").text("上传的图片大小不能超过100k！");
            this.value = "";
            img_div.html("");
            $(this).parent().fadeIn(100);
            return false;
        }
    }
    /*鉴定每个图片宽高 暂时隐藏掉 想看效果或者需要的话可以取消注释就行*/
        /* var img = new Image();
         img.src = objUrl;
         img.onload = function() {
             if (img.width > 100 && img.height > 100) {
                 alert("图片宽高不能大于一百");
                 $("#myFile").val("");
                 $(".img_div").html("");
                 return false;
             }
         }*/
    return true;     
}
function getObjectURL(file) {
    var url = null;
    if(window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if(window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if(window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
/*上传图片附带删除 再次地方可以加上一个ajax进行提交到后台进行删除*/
function removeImg(r){
    $(r).parent().parent().prev().fadeIn(100);
    $(r).parent().remove();
    $(r).parent().parent().html("");
    $(".img_div").prev().find('input').val("");
}
/*上传图片附带放大查看处理*/
function lookBigImg(b){
    $(".shadeImg").fadeIn(500);
    $(".showImg").attr("src",$(b).attr("src"))
}
/*描述：关闭弹出层 */
function closeShade(){
    $(".shade").fadeOut(500);
}
/* 描述：关闭弹出层 图片*/
function closeShadeImg(){
    $(".shadeImg").fadeOut(500);
}