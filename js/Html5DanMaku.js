var autoReadTime=10*1000;

var danmaku=[];

var d=new Date();
var video;
var canvas;
var stage2d;
var table;

var nowdanmakulist=[];
function showdanmuOnInput (text) {
	txt = new createjs.Text(text, "16px  Arial", "#FFF");
				txt.x = (640);
				txt.y = (10);
				
				stage2d.addChild(txt);
}
function timeFormatter(value, row) {
		d.setHours(0,0,0,0);
		d.setMilliseconds(value*1000);
		
        return (d.getHours().toString().length>1?d.getHours():'0'+d.getHours())+':'
        +(d.getMinutes().toString().length>1?d.getMinutes():'0'+d.getMinutes())+':'
        +(d.getSeconds().toString().length>1?d.getSeconds():'0'+d.getSeconds());
    }
function autoReReadDanmaku () {
	console.log("定时重新获取弹幕");
		_firebase.getDM(getUrlParam('id'),function (list) {
		danmaku=list.slice(0);
		nowdanmakulist=danmaku.slice(0);
		console.log(list);
			table.bootstrapTable('load',list);
		
		
		setTimeout(autoReReadDanmaku,autoReadTime);

	});

}

$().ready(function () {
	  
	  
	  
	  
	  
	  $('#inputDM').keypress(function (e) {
        if (e.keyCode == 13) {
          
          var text = $('#inputDM').val();
          var time = danmakunowtime;
          _firebase.pushDM(getUrlParam('id'),time,text);
          $(event.target).prop('value','');
          showdanmuOnInput(text);
        }
      });
      $('#sendbtn').on('click',function (event) {
      	if ($('#inputDM').val().length >0 ) {
          var text = $('#inputDM').val();
          var time = danmakunowtime;
          _firebase.pushDM(getUrlParam('id'),time,text);
         $('#inputDM').prop('value','');
         showdanmuOnInput(text);
        }
      });
      
      
      
	_my_progress.progress();
	_firebase.getDM(getUrlParam('id'),function (list) {
		danmaku=list.slice(0);
		nowdanmakulist=danmaku.slice(0);
		console.log(list);
			table=$("#my_table").bootstrapTable({
                    data: list
                });
		
		
		setTimeout(autoReReadDanmaku,autoReadTime);
		

		
		
		
		
		
		
		
		
		_my_progress.finish();
		
		
		
		
		
		
		
		
	});
	
	
	video=$('#video_continer');
	video.prop('src',sessionStorage.getItem(getUrlParam('id')));
//	console.log(video);
	
	d.setHours(0,0,0,0);
//	video.on('timeupdate',ontime);
	video.on('timeupdate',ontime2);
	video.on('stop',onStop);
	video.on('play',onPlay);
	video.on('pause',onPause);
//	video.on('play');
	canvas=document.getElementById('danmaku_canvas');
	stage2d=new createjs.Stage(canvas);

	nowdanmakulist=danmaku.slice(0);
	createjs.Ticker.setFPS(30);
	
	

	

});





function onPause(event) 
{
createjs.Ticker.removeEventListener("tick", tick);
}
function onStop(event) 
{
createjs.Ticker.removeEventListener("tick", tick);
}
function onPlay(event) 
{
createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) 
{



		for(var i=0;i<stage2d.getNumChildren();i++)
      	{
      		var txt=stage2d.getChildAt(i);
            txt.x-=5;
            if(txt.x<0)
            {
            	stage2d.removeChild(txt);
            }
      	}
		
		// update the stage:
		stage2d.update(event);
}



var danmakunowtime=-1;
var danmakunowtimeX=-1;
function ontime2() {
//		console.log(danmaku);
//		console.log(nowdanmakulist);
		danmakunowtime=Math.floor(video.prop('currentTime'));
		if (danmakunowtime==danmakunowtimeX) {
			return;
		}
		else
		{
			if (danmakunowtime<danmakunowtimeX) {
				nowdanmakulist=danmaku.slice(0);
				while (nowdanmakulist.length>0){
					if (nowdanmakulist[0].time<danmakunowtime) {
						nowdanmakulist.shift();
					} else{
						break;
					}
					
				}
			} else if(danmakunowtime>(danmakunowtimeX+1)) {
				while (nowdanmakulist.length>0){
					if (nowdanmakulist[0].time<danmakunowtime) {
						nowdanmakulist.shift();
					} else{
						break;
					}
				}
				
			}
			danmakunowtimeX=Math.floor(video.prop('currentTime'));
		}
		console.log(Math.floor(video.prop('currentTime')));
//		console.log(danmakunowtime);


		
		var j=0;

		while (nowdanmakulist.length>0){
			var danmakuO=nowdanmakulist[0];
			if(danmakunowtime==danmakuO.time)
			{
				
				
				j++;
				
				txt = new createjs.Text(danmakuO.text, "16px  Arial", "#FFF");
				txt.x = (5*Math.floor(j/250)+640);
				txt.y = (j%250*1+10);
				
				stage2d.addChild(txt);
				nowdanmakulist.shift();
			}
			else if (danmakunowtime>danmakuO.time) {
				nowdanmakulist.shift();
			}
			else
			{
				break;
			}
		}
//		console.log(nowdanmakulist.length);
	}