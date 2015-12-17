
$().ready(function () {
	$("body").append('<div class="modal fade" id="my_progress_modal" data-backdrop = "static"><span class="my_progress glyphicon glyphicon-refresh" aria-hidden="true"></span></div>');

//	$("#my_alert").modal();


})


var My_Progress = function(){
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
    

    
    this.progress =function(){  
    		$("#my_progress_modal").show();
    }  
    this.finish =function(){  

    		$("#my_progress_modal").hide();
    }  
    
};  
  
var _my_progress=new My_Progress();