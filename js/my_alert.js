

$().ready(function () {
	$("body").append('<div class="modal fade" id="my_alert_modal" data-backdrop = "static"><div id="my_alert_div" class="alert alert-warning alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><p>111</p></div></div>');

//	$("#my_alert").modal();


})


var My_Alert = function(){  
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
    
    function preSet () {
    		
    	    $("#my_alert_div").removeClass("alert-success");
    		$("#my_alert_div").removeClass("alert-info");
    		$("#my_alert_div").removeClass("alert-warning");
    		$("#my_alert_div").removeClass("alert-danger");
    }
    
    this.showAlert =function(str){  
		preSet();
    		$("#my_alert_div").addClass("alert-danger");
    		$("#my_alert_div").children("p").text(str);
         	$("#my_alert_modal").modal();
    }  
    this.showSuccess =function(str){  
        preSet();
    		$("#my_alert_div").addClass("alert-success");
    		$("#my_alert_div").children("p").text(str);
         	$("#my_alert_modal").modal();
    }  
    this.showInfo =function(str){  
        preSet();
    		$("#my_alert_div").addClass("alert-info");
    		$("#my_alert_div").children("p").text(str);
         	$("#my_alert_modal").modal();
    }  
    this.showHint =function(str){  
        preSet();
    		$("#my_alert_div").addClass("alert-warning");
    		$("#my_alert_div").children("p").text(str);
         	$("#my_alert_modal").modal();
    }  
};  
  
var _my_alert = new My_Alert();  



