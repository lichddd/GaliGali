var My_Shark = function(){
    function hi(){//私有函数，外部无法访问  
        alert(name + " : Hi!");//私有变量，内部可以直接访问  
    }  
    this.hiGlobal = function(){  
        alert(globalName + " : Hello!");//全局变量，内部可以直接访问  
    }  
    this.sayHello = function(){//public函数，外部可访问  
        hi();//私有函数，内部可以直接访问  
        this.hiGlobal();//公有函数，内部访问也要加上 this.  
    }  
    

    
    this.shark =function  (obj,callback) {
				obj.removeClass("shark");
					var st =setTimeout(function () {
		obj.addClass("shark");
	},10);
				
					var st2 =setTimeout(function () {
		obj.removeClass("shark");
		callback();
	},1250);
			}
    
};  
  
var _my_shark=new My_Shark();