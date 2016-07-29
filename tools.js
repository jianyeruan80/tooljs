//addHandler(window, "online", function () { alert("Online"); }); 
//var head= document.getElementById("head");setStyle(head,{width:"200px",height:"70px",display:"block"},false); false 累加，true一次性加
//var style = getCurrentStyle(element,"font-size");
//document.querySelector("#fitin span").style.fontSize="10px";
//list.sort(function(a, b) {return parseInt(a.time) - parseInt(b.time)});
//regexp ( ) [ ] { } . * ^ $ + ? \   当表示自己  /\[/   "\\["     <[^>]+> //不是>
//html  <[^>]+>  or <.*?> 
(function(document){
var tools;
var jsPath="../js/mi_";
var cssPath="../css/mi_";
var obj = {
   loadJs:function(file){
		var scriptTag = document.getElementById('loadScript');
		var head = document.getElementsByTagName('head').item(0);
		if(scriptTag) head.removeChild(scriptTag);
		script = document.createElement('script');
		script.src = jsPath+file+".js";
		script.type = 'text/javascript';
		script.id = 'loadScript';
		head.appendChild(script);
	 },
    loadCss:function(file){
    var cssTag = document.getElementById('loadCss');
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = cssPath+file+".css";
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = 'loadCss';
    head.appendChild(css);
    },
    addHandler: function (element, type, handler) {  
         if(element.addEventListener) { 
			 element.addEventListener(type, handler, false); 
           }else if (element.attachEvent) {
             element.attachEvent("on" + type, handler); 
         }else { 　element["on" + type] = handler;} },

 getCurrentStyle:function(ele,attr){
if(document.defaultView){
var style = document.defaultView.getComputedStyle(ele,null);
return style ? style.getPropertyValue(attr): null; 
}else{
return ele.currentStyle[attr];
}
},
getUrlJson:function(url) {
    var result = {};
    var reg = new RegExp('([\\?|&])(.+?)=([^&?]*)', 'ig');
    var arr = reg.exec(url);
    while (arr) {
        result[arr[2]] = arr[3];
        arr = reg.exec(url);
    }
    return result;
   },
   isArray:function (e){
    var sign=false; 
    if(!!e && e instanceof Array && e.length){
    sign=true;
    }
    return sign;
  },

  isObject:function(e){
    var sign=false; 
    if(!!e && e instanceof Object && !(e instanceof Array) && Object.keys(e).length){
    sign=true;
    }
    return sign;
    },
    toFixed:function(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5;
    des = parseInt(des, 10) / times;
    return des + ''
    },

    uniqueArray:function(array){
      var r = [];
      for(var i = 0, l = array.length; i < l; i++) {
        for(var j = i + 1; j < l; j++)
          if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
      }
      return r;
    },

    setStyle:function(e,css,sign){ 
        var appendStr=""; 
        for(var atr in css){
        if(!!sign){appendStr+=atr+":"+css[atr];}
        e.style[atr] = css[atr];
        }
        if(!!sign) e.style.cssText=appendStr;
    },

    autoFontSize:function(elementId,span){
        var id="# "+elementId+" " +span;
        requestAnimationFrame(function(){
        while( document.querySelector(id).offsetHeight < document.querySelector("#"+elementId).offsetHeight ) {
        document.querySelector(id).style.fontSize=(parseInt(document.querySelector(id).style.fontSize)+1)+"px";
          console.log(document.querySelector(id).style.fontSize)
        } 
        });
    },

    stopBubble:function(event){
        var e = event || window.event;
        if (e && e.stopPropagation ) 
        e.stopPropagation(); 
        else
        window.event.cancelBubble = true; 
   },

   stopDefault:function(event){
        var e = event || window.event;
        if(e && e.preventDefault) { 
        　e.preventDefault(); 
        } else { 
        window.event.returnValue = false; 
        } 
        return false;
   },

   replace:function(input,regExp){
      
         var reg = new RegExp(regExp, "g");
            if (!!input) {
                return input.replace(reg, "");
            } else {
                return "";
            }

   },

   getRegExp:function(input,regExp){
    //var reEs = /\[(.*?)\]/;   gi
     var reg = new RegExp('\\[(.*?)\\]', "g");
     reg.exec(input);
     return RegExp.$1;
   }

   getRect:function(element) {
/*  var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
  var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop; */
    var rect = element.getBoundingClientRect();

    var top = document.documentElement.clientTop;

    var left= document.documentElement.clientLeft;

    return{

        top    :   rect.top - top,

        bottom :   rect.bottom - top,

        left   :   rect.left - left,

        right  :   rect.right - left

    }

},
    visibleY:function(el){
    var top = el.getBoundingClientRect().top, rect, el = el.parentNode;
    do {
        rect = el.getBoundingClientRect();
        if (top <= rect.bottom === false)
            return false;
        el = el.parentNode;
    } while (el != document.body);
    // Check its within the document viewport
    return top <= document.documentElement.clientHeight;
   },
   orderby:function(name){
    return function(o, p){
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }
    }
},

   toggleFullScreen:function () {
   if (!document.fullscreenElement && 
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

}
window.tools = obj;
})(document);
