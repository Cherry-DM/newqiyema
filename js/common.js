'use strict'
/**
 * Created by zhanghaibin on 2017/1/9.
 */

//产生一个n到m间的随机整数
function rnd(n,m){
    return parseInt(Math.random() * (m - n) + n);
}
//获取物体obj的name属性
function getStyle(obj,name){
    return (obj.currentStyle ? obj.currentStyle : getComputedStyle(obj,false))[name];
}
//设置样式
//用法1：setStyle(obj,name,value)
//用法2：setStyle(obj,{name1:value1,name2:value2....});
function setStyle(){
    var obj = arguments[0];
    if(arguments.length == 2){
        //json
        var json = arguments[1];
        for(var name in json){
            obj.style[name] = json[name];
        }
    }
    else if(arguments.length == 3){
        //普通版
        obj.style[arguments[1]] = arguments[2];
    }
}


//在数组arr中找n，如果找到 返回 true， 否则返回  false
function findInArray(arr,n){
    for(var i = 0; i<arr.length; i++){
        if(arr[i] == n){
            return true;
        }
    }
    return false;
}
//完美版 getByClass
function getByClass(oParent,sClass){
    //判断系统提供的getElementsByClassName是否可用
    if(document.getElementsByClassName){
        //支持系统提供的，直接使用系统的
        return oParent.getElementsByClassName(sClass);
    }else{
        //getElementsByClassName 是　undefined
        //需要自己实现

        //获取页面所有标签
        var aEle = oParent.getElementsByTagName('*');
        //准备一个数组，找到合适的就把对应的标签存进去，最后返回给函数调用的地方
        var arr = [];
        //循环所有的标签
        for(var i = 0; i < aEle.length; i++){
            //把当前标签的className用空格切分，得到一个数组(arr2)，数组中的每一项就是一个样式名
            var arr2 =aEle[i].className.split(' ');
            //在数组arr2中找是否包含传入的样式名，如果包含，那么这个标签就是我需要的标签
            if(findInArray(arr2,sClass)){
                //说明找到我需要的标签了，把当前标签放到数组arr里面
                arr.push(aEle[i]);
            }
        }
        //返回结果
        return arr;
    }


}

//给obj加事件，事件名字叫sEv(不要带on),要执行要函数是fn
function addEvent(obj,sEv,fn){
    if(obj.addEventListener){
        obj.addEventListener(sEv,fn,false);
    }else{
        obj.attachEvent('on'+sEv,fn);
    }

}
//加滚动事件
function addWheel(obj,fn){
    function wheel(ev){
        var oEvent = ev || event;
        //用于表示是否向下
        var bDown = oEvent.wheelDelta ? (oEvent.wheelDelta < 0) : (oEvent.detail > 0);

        //已经知道了滚动的方向，可以做一些实际的事情
        fn && fn(bDown);
    }
    if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
        //FF
        obj.addEventListener('DOMMouseScroll',wheel,false);
    }else{
        addEvent(obj,'mousewheel',wheel);
    }
};




















