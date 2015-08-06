
var FireBase = function(){
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
    
	var myDataRef = new Firebase('https://galigali.firebaseIO.com');
//	var verinfo = myDataRef.child('ver');
	
	
	
	this.pushDM=function  (id,time,str,errfunc,scssfunc) {
		myDataRef.child('danmu').child(id).push(
			{
			  time: time,
			  text: str
			},
			function(error) {
			  if (error) {
			    console.log('发送弹幕失败');
			  } else {
			    console.log('发送弹幕成功');
			  }
			}
		);
	}
	
	this.newVideo=function  (title,link,img,upper) {
		_my_progress.progress();
		myDataRef.child('videos').push(
			{
			  title: title,
			  link: link,
			  img:img,
			  upper:upper
			},
			function(error) {
			_my_progress.finish();
			  if (error) {

			    console.log('发送弹幕失败');
			  } else {
			    console.log('发送弹幕成功');
			  }
			}
		);
	}
	
	this.getDM=function (id,onReturn) {
		myDataRef.child('danmu').child(id).orderByChild("time").once('value', function (dataSnapshot) {
  		// code to handle new value
  			console.log('读取弹幕danmu'+id);
  			
  			
  			dataSnapshot.exists()==true?console.log('弹幕数据存在'):console.error('弹幕数据不存在');
  			var list=[];
  			dataSnapshot.forEach(function (data) {
  				list.push(data.val());
//				console.log(data.val().time+':'+data.val().text);
  			});
  			onReturn(list);

  			
		}, function (err) {
			console.log('读取弹幕失败');
		  // code to handle read error
		});
	}
	this.getVideos=function (onReturn,onError) {
		myDataRef.child('videos').once('value', function (dataSnapshot) {
  		// code to handle new value
//			console.log(dataSnapshot);
  			
  			
  			dataSnapshot.exists()==true?console.log('弹幕数据存在'):console.error('弹幕数据不存在');
  			
  			var list=[];
  			dataSnapshot.forEach(function (data) {
  				var temp=data.val();
  				temp.id=data.key();
  
  				list.push(temp);
  				console.log(temp);
  			})
  			onReturn(list);

  			
		}, function (err) {
			console.log('读取弹幕失败');
		  // code to handle read error
		   onError();
		});
	}
	
	
	this.getVideo=function (id,onReturn) {
		myDataRef.child('videos').child(id).once('value', function (dataSnapshot) {
  		// code to handle new value
  			console.log(dataSnapshot);
  			
  			
  			dataSnapshot.exists()==true?console.log('弹幕数据存在'):console.error('弹幕数据不存在');
  			
  			var list=[];
  			dataSnapshot.forEach(function (data) {
  				list.push(data);
  				console.log(data.val());
  				console.log(data);
//				console.log(data.val().time+':'+data.val().text);
  			})
  			onReturn(list);

  			
		}, function (err) {
			console.log('读取弹幕失败');
		  // code to handle read error
		});
	}
	
	
	
	this.addedDM=function (id,onAdd) {
		myDataRef.child('danmu'+id).on('child_added', function(childSnapshot, prevChildName) {
  // code to handle new child.
  		// code to handle new value
  			console.log('弹幕动态增加 danmu'+id);
  			
  			
  			onAdd(childSnapshot.key(),childSnapshot.val());

  			
		}, function (err) {
			console.log('弹幕动态增加读取失败');
		  // code to handle read error
		});
	}
    
 
    
};  
  
var _firebase=new FireBase();