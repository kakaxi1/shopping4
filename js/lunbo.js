//1、项目中的对象：轮播图
	//box:容器的id
	function AutoPlayerImgs(boxId,width,height,imgs,urls,speed,btn){
		this.boxId = boxId;
		this.width = width;
		this.height = height;
		this.imgs = imgs;
		this.urls = urls;
		this.speed = speed;
		
		this.btn = btn;
//		this.btn = {
//			this.btn.width = btn.width;
//			this.btn.height = btn.height;
//			this.btn.bgColor = btn.bgColor;
//			highLightColor = btn.highLightColor;
//		}
		this.timer = null;
		this.currOrd = 0;//当前图片序号；
		this.initUI();
		
	}
	
	  
	   
	
	
	AutoPlayerImgs.prototype.initUI = function(){
		
		var boxObj = document.getElementById(this.boxId);
		var that = this;
		boxObj.onmouseover = function(){
			that.stopPlay();
		}
		boxObj.onmouseout = function(){
			that.go();
		}
		
		//1、放图片ul
		var ulObj = document.createElement("ul");
		ulObj.style.cssText = " width:9999px;height:100%;position:relative;left:0px";
		for(var i=0;i<this.imgs.length;i++){
			var liObj = document.createElement("li");
			liObj.style.cssText = "float:left;";
			var imgObj = document.createElement("img");
			imgObj.src = this.imgs[i];
			
			liObj.appendChild(imgObj);
			liObj.ord = i;
			
			var that = this;			
			liObj.onclick = function(){
				location.href = that.urls[this.ord];
			}
			
			ulObj.appendChild(liObj);
		}	
		ulObj.innerHTML+=ulObj.innerHTML;
		document.getElementById(this.boxId).appendChild(ulObj);
		
		ulObj = document.createElement("ul");
		ulObj.style.cssText = "position:absolute;left:180px;bottom:0;";
		for(var i=0;i<this.imgs.length;i++){
			var liObj = document.createElement("li");
			liObj.style.cssText = "float:left;width:20px;height:20px;border-radius: 50%;background:white;margin:10px;";
			liObj.ord = i;
			
			var that = this;
			liObj.onmouseover = function(){
				that.goImg(this.ord);	
			};
			
			
			ulObj.appendChild(liObj);
		}	
		document.getElementById(this.boxId).appendChild(ulObj);
		ulObj.children[0].style.backgroundColor = this.btn.highLightColor;
	}
	//
	AutoPlayerImgs.prototype.goStep = function(){
		this.currOrd++;
		var boxObj = document.getElementById(this.boxId);
		var ulImgObj = boxObj.getElementsByTagName("ul")[0];
		if(this.currOrd==this.imgs.length+1){
			this.currOrd = 1;
			ulImgObj.style.left = "0";
		}
		//1、
		
		move(ulImgObj,{"left":(-1)*this.currOrd*this.width});
		
		//变换按钮的颜色
	   var ulBtnObj = boxObj.getElementsByTagName("ul")[1];
	   for(let i=0;i<ulBtnObj.children.length;i++){
	   	ulBtnObj.children[i].style.backgroundColor = this.btn.bgColor;
	   }
	ulBtnObj.children[this.currOrd%ulBtnObj.children.length].style.backgroundColor = this.btn.highLightColor;
	}

	
	//轮播
	AutoPlayerImgs.prototype.go = function(){
		var that = this;
		this.timer = setInterval(function(){
			that.goStep();
		},this.speed);
	}
	//
	AutoPlayerImgs.prototype.stopPlay = function(){
		clearInterval(this.timer);
	}
	
	
	
	//
    AutoPlayerImgs.prototype.goImg = function(ord){
    	var boxObj = document.getElementById(this.boxId);
    	var ulImgObj = boxObj.getElementsByTagName("ul")[0];
    	move(ulImgObj,{"left":(-1)*ord*this.width});
    	this.currOrd = ord;
    	
    	var ulBtnObj = boxObj.getElementsByTagName("ul")[1];
    	for(let i=0;i<ulBtnObj.children.length;i++){
    		ulBtnObj.children[i].style.backgroundColor = this.btn.bgColor;
    	}
    	ulBtnObj.children[this.currOrd].style.backgroundColor = this.btn.highLightColor;
    	  	
    }
	