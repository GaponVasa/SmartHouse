"use strict"
function View(model, data){
	this._data = data;
	this._model = model;
	this.selectItem = document.getElementById("selectItem");
	this.buttonAdd = document.getElementById("buttonAdd");
	this.buttonData = document.getElementById("buttonData");
	this.main = document.querySelector(".main"); 
	this.counter = document.getElementById("counter");
};

View.prototype.init = function(){
	this.buttonAdd.addEventListener("click", this.addItem.bind(this));
	this.main.addEventListener("click", this.changeStatus.bind(this));
	this.buttonData .addEventListener("click", this.dataRead.bind(this));
}

View.prototype.addItem = function(){
	var value = this.selectItem.value;
	this._model.add(value);
	if(value === "Select Item"){
		View.prototype.hideText.call(this, "ok");
	}else if(value === "lamp"){
		View.prototype.hideText.call(this);
		this.main.appendChild(View.prototype.createLamp(this._data[this._data.length - 1].id));
	}else if(value === "tv"){
		View.prototype.hideText.call(this);
		this.main.appendChild(View.prototype.createTv(this._data[this._data.length - 1].id));
	}else if(value === "ElectricStove"){
		View.prototype.hideText.call(this);
		this.main.appendChild(View.prototype.createStove(this._data[this._data.length - 1].id));
	}
};


View.prototype.createLamp = function(id){
	var div = document.createElement("div");
	div.className += "container";
	div.innerHTML += '<div class=\"lamp\"><p>Lamp <img src=\"image/lamp.svg\" alt=\"lamp\"></p><p>Id<span>'+id+'</span></p><p class=\"status statusOff\">Status <span>OFF</span></p></div>' 
	return div;
}

View.prototype.createTv = function(id){
	var div = document.createElement("div");
	div.className += "container";
	div.innerHTML += '<div class=\"tv\"><p>Tv <img src=\"image/tv.svg\" alt=\"tv\"></p><p>Id<span>'+id+'</span></p><p class=\"status statusOff\">Status <span>OFF</span></p></div>' 
	return div;
}

View.prototype.createStove = function(id){
	var div = document.createElement("div");
	div.className += "container";
	div.innerHTML += '<div class=\"electricStove\"><p>Electric Stove <img src=\"image/stove.svg\" alt=\"stove\"></p><p>Id<span>'+id+'</span></p><p class=\"status statusOff\">Status <span>OFF</span></p></div>' 
	return div;
}

View.prototype.hideText = function(value){
	var form = document.querySelector("form");
	var hide = form.querySelector(".hideElement");
	var red = form.querySelector(".red");
	if(value === "ok"){
		if(red === null){
			this.selectItem.className += "red";
		};		
		hide.style.display = "block";
		
	}else{
		this.selectItem.classList.remove("red");
		hide.style.display = "none";
	}
}

View.prototype.changeStatus = function(event){
	var target = event.target;
	var parent, classListElement, idElement;
	if(target.nodeName === "SPAN"){
		parent = target.parentElement;
		classListElement = parent.classList;
		idElement = parent.previousElementSibling.firstElementChild.textContent;
		if(classListElement[1] === "statusOff"){
			classListElement.remove("statusOff");
			classListElement.add("statusOn");
			target.textContent = "ON";
			this._model.changeStatus(idElement);
			View.prototype.changeCounter.call(this);
		}else if(classListElement[1] === "statusOn"){
			classListElement.remove("statusOn");
			classListElement.add("statusOff");
			target.textContent = "OFF";
			this._model.changeStatus(idElement);
			View.prototype.changeCounter.call(this);
		}
	}
	
}

View.prototype.changeCounter = function(){
	var consumerElement = this.counter.querySelector(".consumer");
	var powerElement = this.counter.querySelector(".power");
	console.log(consumerElement.firstElementChild.textContent);
	console.log(powerElement.firstElementChild.textContent);
	
	//consumerElement.firstElementChild.textContent = 
}
/////////////////////////////////////////////////////////////////////
View.prototype.dataRead = function(){
	this._data.forEach(el =>{
		console.log(el);
		// console.log(el.id);
		// if(el.state){
		// 	console.log("el.state = ", el.state);
		// }
	})
}