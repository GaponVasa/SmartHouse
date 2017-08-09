"use strict"
function View(model){
	this._model = model;
	this.formAdd = document.forms["add"];
	this.formRemove = document.forms["remove"];
	this.selectAddItem = this.formAdd.querySelector("select");
	this.selectRemoveItem = this.formRemove.querySelector("select");
	this.buttonAdd = document.getElementById("buttonAdd");
	this.buttonData = document.getElementById("buttonData");
	this.buttonRemove = document.getElementById("buttonRemove");
	this.main = document.querySelector(".main"); 
	this.counter = document.getElementById("counter");
};

View.prototype.init = function(){
	// console.log(this.formRemove);
	this.buttonAdd.addEventListener("click", this.addItem.bind(this));
	this.buttonRemove.addEventListener("click", this.removeItem.bind(this));
	this.main.addEventListener("click", this.clicButton.bind(this));
	this.buttonData .addEventListener("click", this.dataRead.bind(this));
};

View.prototype.addItem = function(){
	var value = this.selectAddItem.value;
	var createHtml, lastId, power;
	if(value === "Select Item"){
		View.prototype.hideText.call(this, this.formAdd, "ok");
	}else{
		this._model.add(value);
		View.prototype.hideText.call(this, this.formAdd);
		lastId = this._model.getLastId();
		power = this._model.getLastPower();
		View.prototype.addOptionId.call(this, lastId);
		if(value === "lamp"){
			createHtml = View.prototype.createDeviceHtml("lamp", lastId, power);
		}else if(value === "tv"){
			createHtml = View.prototype.createDeviceHtml("tv", lastId, power);
		}else if(value === "ElectricStove"){
			createHtml = View.prototype.createDeviceHtml("stove", lastId, power);
		}else{
			console.log("ERROR The wrong value has come in addItem function");
		};
		this.main.appendChild(createHtml);
	};
};

View.prototype.removeItem = function(){
	var removeId = this.selectRemoveItem.value;
	if(removeId === "Select Remove Id Item"){
		View.prototype.hideText.call(this, this.formRemove, "ok");
	}else{
		var arr = this.main.querySelectorAll(".container");
		var length = arr.length;
		var id, pTag;
		for (var i = length - 1; i >= 0; i--) {
			pTag = arr[i].querySelector(".idItem");
			id = pTag.firstElementChild.textContent;
			if(parseInt(id) === parseInt(removeId)){
				arr[i].remove();
				break;
			};
		};
		View.prototype.hideText.call(this, this.formRemove);
		this._model.subtractionCouner(removeId);
		View.prototype.changeCounter.call(this);
		this._model.remove(removeId);
		View.prototype.removeOptionId.call(this, removeId);
	};
};

//Добавляє option з id в selectRemove
View.prototype.addOptionId = function(id){
	var option = document.createElement("option");
	option.value = id;
	option.innerHTML = id;
	this.selectRemoveItem.appendChild(option);
};

View.prototype.removeOptionId = function(id){
	var arr = this.selectRemoveItem.querySelectorAll("option");
	var length = arr.length;
	for (var i = length - 1; i >= 0; i--) {
		if(parseInt(arr[i].value) === parseInt(id)){
			arr[i].remove();
			break;
		};
	};
};

View.prototype.createDeviceHtml = function(device, id, power){
	var srcImage, textDevice, classDevice;
	var div = document.createElement("div");
	var div1 = document.createElement("div");
	var p, img;
	if(device === "lamp"){
		srcImage = "image/lamp.svg";
		textDevice = "Lamp";
		classDevice = "lamp";
	}else if(device === "tv"){
		srcImage = "image/tv.svg";
		textDevice = "Tv";
		classDevice = "tv";
	}else if(device === "stove"){
		srcImage = "image/stove.svg";
		textDevice = "Electric Stove";
		classDevice = "electricStove";
	}else{
		console.log("ERROR The wrong value has come in createDeviceHtml function")
	};
	div.className += "container";
	div1.className += classDevice;
	for(var i = 0; i < 4; i++){
		p = document.createElement("p");
		switch(i){
			case 0:
				img = document.createElement("img");
				img.src = srcImage;
				p.innerHTML += textDevice;
				p.appendChild(img);
			break;
			case 1:View.prototype.createPHtml(p, "idItem", "Id", id);
			break;
			case 2:
				if(device === "stove"){
					View.prototype.createPHtml(p, "status statusOff", "Status Hotplate1 ", "OFF");
					div1.appendChild(p);

					p = document.createElement("p");
					View.prototype.createPHtml(p, "status statusOff", "Status Hotplate2 ", "OFF");
					div1.appendChild(p);

					p = document.createElement("p");
					View.prototype.createPHtml(p, "status statusOff", "Status Oven ", "OFF");
				}else{
					View.prototype.createPHtml(p, "status statusOff", "Status ", "OFF");
				}
			break;
			case 3:
				var textWt = document.createTextNode("Wt");
				if(device === "tv"){
					p = document.createElement("p");
					View.prototype.createPHtml(p, "chennel", "Current chennel", "0");
					div1.appendChild(p);

					p = document.createElement("p");
					View.prototype.createPHtmlButton(p, "chennel");
					div1.appendChild(p);

					p = document.createElement("p");
					View.prototype.createPHtml(p, "volume", "Current volume", "0");
					div1.appendChild(p);

					p = document.createElement("p");
					View.prototype.createPHtmlButton(p, "volume");
					div1.appendChild(p);

					p = document.createElement("p");
					View.prototype.createPHtml(p, "power", "power", power);
					p.appendChild(textWt);
				}else{
					View.prototype.createPHtml(p, "power", "power", power);
					p.appendChild(textWt);
				}
				
			break;
		};
		div1.appendChild(p);
	};
	div.appendChild(div1);
	return div;
};

View.prototype.createPHtml = function(pHtml, classText, text, spanText){
	var span = document.createElement("span");
	pHtml.className += classText;
	pHtml.innerHTML += text;
	span.innerHTML += spanText;
	pHtml.appendChild(span);
	return pHtml;
}

View.prototype.createPHtmlButton = function(pHtml, idText){
	var input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("id", idText + "Minus");
	input.value = "-";
	pHtml.appendChild(input);
	input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("id", idText + "Plus");
	input.value = "+";
	pHtml.appendChild(input);
	return pHtml;
};

View.prototype.hideText = function(form, value){
	var select = form.querySelector("select");
	var hide = form.querySelector(".hideElement");
	var red = form.querySelector(".red");
	if(value === "ok"){
		if(red === null){
			select.className += "red";
		};		
		hide.style.display = "block";
		
	}else{
		select.classList.remove("red");
		hide.style.display = "none";
	};
};

View.prototype.changeStatus = function(target, parent, id){
	var classElement = parent.querySelector(".status")
	var classListElement = classElement.classList;
	if(classListElement[1] === "statusOff"){
		classListElement.remove("statusOff");
		classListElement.add("statusOn");
		target.textContent = "ON";
		this._model.changeStatusCounter(id);
		View.prototype.changeCounter.call(this);
	}else if(classListElement[1] === "statusOn"){
		classListElement.remove("statusOn");
		classListElement.add("statusOff");
		target.textContent = "OFF";
		this._model.changeStatusCounter(id);
		View.prototype.changeCounter.call(this);
	};
};

View.prototype.changeCounter = function(){
	var consumerElement = this.counter.querySelector(".consumer");
	var powerElement = this.counter.querySelector(".power");
	var dataCounterObj = this._model.getDataCounter();
	consumerElement.firstElementChild.textContent = dataCounterObj.consumer;
	powerElement.firstElementChild.textContent = dataCounterObj.power;
};

View.prototype.clicButton = function(event){
	var target = event.target;
	var parent = target.parentElement.parentElement;
	//console.log(parent);
	var idElement = parent.querySelector(".idItem").firstElementChild.textContent;
	//console.log(idElement);
	if(target.id === "chennelMinus"){
		console.log(target.id);
		this._model.setChennel(idElement, "-");
		View.prototype.changeVolumeAndChennel.call(this, parent, idElement, "chennel");
	}else if(target.id === "chennelPlus"){
		console.log(target.id);
		this._model.setChennel(idElement, "+");
		View.prototype.changeVolumeAndChennel.call(this, parent, idElement, "chennel");
	}else if(target.id === "volumeMinus"){
		console.log(target.id)
		this._model.setVolume(idElement, "-");
		View.prototype.changeVolumeAndChennel.call(this, parent, idElement, "volume");
	}else if(target.id === "volumePlus"){
		console.log(target.id)
		this._model.setVolume(idElement, "+");
		View.prototype.changeVolumeAndChennel.call(this, parent, idElement, "volume");
	}else if(target.nodeName === "SPAN"){
		console.log(target.nodeName);
		View.prototype.changeStatus.call(this, target, parent, idElement);
	}else{
		console.log("else");
	};

};

View.prototype.changeVolumeAndChennel = function(parent, id, hwoChange){
	var element, value;
	if(hwoChange === "chennel"){
		element = parent.querySelector(".chennel span");
		value = this._model.getChennel(id);
	}else if(hwoChange === "volume"){
		element = parent.querySelector(".volume span");
		value = this._model.getVolume(id);

	}else{

	}
	element.textContent = value;
	console.log(element);
};


/////////////////////////////////////////////////////////////////////
View.prototype.dataRead = function(){
	this._model.dataRead();

}