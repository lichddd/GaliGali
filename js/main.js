$().ready(function () {

	$('[data-toggle="popover"]').popover();
	$('[data-toggle="tooltip"]').tooltip()
	      $('#commitbtn').on('click',function (event) {
	      	          var av = $('#avlink').val().split('av')[1];
      	if ($('#title').val().length >0 &&($('#link').val().length >0||av)&&($('#img_area').prop('src').length>0||$('#img_link').val().length >0)) {
//        var addr = $('#inputaddr1').val()+" "+$('#inputaddr2').val();
			
          var title = $('#title').val();
          var link = $('#link').val();

          if (av) {
          	
          } else{
          	av=0;
          }
          var img;
          if ($('#img_link').val().length>0) {
          	img = $('#img_link').val();
          } else{
          	img = $('#img_area').prop('src');
          }
          
          _firebase.newVideo(title,link,img,"lichddd",av);
        }
      });
      	  $('#changebtn').on('click',function (event) {
      	if ($('#avtext').val().length >0 &&$('#avtext').val().split('av').length>1) {


		  window.open("http://www.bilibili.com/m/html5?aid="+$('#avtext').val().split('av')[1]+"&page=1");    
			
        }
      });
	 var input = document.getElementById("img_input");
 if ( typeof(FileReader) === 'undefined' ){
         result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
         input.setAttribute( 'disabled','disabled' );
 } else {
         input.addEventListener( 'change',readFile,false );}
	
	
	JSON.parse(sessionStorage.getItem('list')).forEach(function (data) {
			
			var tempdiv=$('<a href="video.html?id='+data.id+'&link='+data.link+'" target="_blank"><div class="video col-md-2 col-sm-6 col-xs-12" onclick="gotoVideo(event)">'+
				'<img class="video_img img-thumbnail" src="'+data.img+'"/>'+
				'<h4 class="vidoe_title">'+data.title+'</h4>'+
			'</div></a>').appendTo('#video_continer');
			
			
			tempdiv.data('videoinfo',data);
			sessionStorage.setItem("link"+data.id,data.link);
			sessionStorage.setItem("av"+data.id,data.av);
	});
	
	
//	_firebase.getVideos(function (list) {
////		var ll=new Array();
//
//
//
//		sessionStorage.setItem('list',JSON.stringify(list));
//		list.forEach(function (data) {
//			
//			var tempdiv=$('<a href="video.html?id='+data.id+'&link='+data.link+'" target="_blank"><div class="video col-md-2" onclick="gotoVideo(event)">'+
//				'<img class="video_img img-thumbnail" src="'+data.img+'"/>'+
//				'<h4 class="vidoe_title">'+data.title+'</h4>'+
//			'</div></a>').appendTo('#video_continer');
//			
//			
//			tempdiv.data('videoinfo',data);
////			ll[data.id]=data;
//			sessionStorage.setItem(data.id,data.link);
//			
//		});
//
//	});
//	_firebase.pushDM('fcwefwefew','321321','321321321',(function () {
//		
//	}),function () {
//		
//	});
});



function readFile(){
        var file = this.files[0];
//这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件 
        if(!/image\/\w+/.test(file.type)){ 
                alert("请确保文件为图像类型");
                return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
//              result.innerHTML = '<img src="'+this.result+'" alt=""/>';
                $('#img_area').prop('src',this.result);
        }
}
function reset () {
	$('#img_area').prop('src','');
	$('#title').val('');
    $('#link').val('');
    $('#img_link').val('');
}