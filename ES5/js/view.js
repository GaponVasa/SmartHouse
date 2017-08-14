"use strict"
function View(model){
	this._model = model;
	this.formAdd = document.forms["add"];
	this.formRemove = document.forms["remove"];
	this.selectAddItem = this.formAdd.querySelector("select");
	this.selectRemoveItem = this.formRemove.querySelector("select");
	this.buttonAdd = document.getElementById("buttonAdd");
	this.buttonRemove = document.getElementById("buttonRemove");
	this.main = document.querySelector(".main"); 
	this.counter = document.getElementById("counter");
};

View.prototype.init = function(){
	this.buttonAdd.addEventListener("click", this.addItem.bind(this));
	this.buttonRemove.addEventListener("click", this.removeItem.bind(this));
	this.main.addEventListener("click", this.clicButton.bind(this));
};

View.prototype.addItem = function(){
	var value = this.selectAddItem.value;
	var createHtml, lastId, power;
	if(value === "Select Item"){
		this.hideText(this.formAdd, "ok");
	}else{
		this._model.add(value);
		this.hideText(this.formAdd);
		lastId = this._model.getLastId();
		power = this._model.getLastPower();
		this.addOptionId(lastId);
		if(value === "lamp"){
			createHtml = this.createDeviceHtml("lamp", lastId, power);
		}else if(value === "tv"){
			createHtml = this.createDeviceHtml("tv", lastId, power);
		}else if(value === "ElectricStove"){
			createHtml = this.createDeviceHtml("stove", lastId, power);
		}else{
			console.log("ERROR The wrong value has come in addItem function");
		};
		this.main.appendChild(createHtml);
	};
};

//Добавляє option з id в selectRemove
View.prototype.addOptionId = function(id){
	var option = document.createElement("option");
	option.value = id;
	option.innerHTML = id;
	this.selectRemoveItem.appendChild(option);
};

View.prototype.createDeviceHtml = function(device, id, power){
	var srcImage, textDevice, classDevice;
	var div = document.createElement("div");
	var div1 = document.createElement("div");
	var p, img;
	if(device === "lamp"){
		srcImage = "../image/lamp.svg";
		textDevice = "Lamp";
		classDevice = "lamp";
	}else if(device === "tv"){
		srcImage = "../image/tv.svg";
		textDevice = "Tv";
		classDevice = "tv";
	}else if(device === "stove"){
		srcImage = "../image/stove.svg";
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
				div1.appendChild(p);
			break;
			case 1:this.createPHtml("idItem", "Id", id,  div1);
			break;
			case 2:
				if(device === "stove"){
					this.createPHtml("status statusOff", "Status Hotplate1 ", "OFF",  div1);
					this.createPHtml("status statusOff", "Status Hotplate2 ", "OFF", div1);
					this.createPHtml("status statusOff", "Status Hotplate3 ", "OFF", div1);
					this.createPHtml("status statusOff", "Status Hotplate4 ", "OFF", div1);
					this.createPHtml("status statusOff", "Status Oven ", "OFF",  div1);
				}else{
					this.createPHtml("status statusOff", "Status ", "OFF",  div1, p);
				}
			break;
			case 3:
				var textWt = document.createTextNode("Wt");
				if(device === "tv"){
					this.createPHtml("chennel", "Current chennel", "1", div1);
					this.createPHtmlButton(div1, "chennel");
					this.createPHtml("volume", "Current volume", "50", div1);
					this.createPHtmlButton(div1, "volume");
					p = document.createElement("p");
					this.createPHtml("power", "power", power, div1, p);
					p.appendChild(textWt);
				}else{
					this.createPHtml("power", "power", power, div1, p);
					p.appendChild(textWt);
				}
			break;
		};
	};
	div.appendChild(div1);
	return div;
};

View.prototype.createPHtml = function(classText, text, spanText, divTarget, pHtml){
	var span = document.createElement("span");
	if(!pHtml){
		pHtml = document.createElement("p");
	};
	pHtml.className += classText;
	pHtml.innerHTML += text;
	span.innerHTML += spanText;
	pHtml.appendChild(span);
	divTarget.appendChild(pHtml);
}

View.prototype.createPHtmlButton = function(divTarget, idText){
	var input;
	var arrWords = ["Minus", "Plus"];
	var arrSign = ["-", "+"];
	var pHtml = document.createElement("p");
	for(var i = 0; i < 2; i++){
		input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("id", idText + arrWords[i]);
		input.value = arrSign[i];
		pHtml.appendChild(input);
	}
	divTarget.appendChild(pHtml);
};

View.prototype.removeItem = function(){
	var removeId = this.selectRemoveItem.value;
	if(removeId === "Select Remove Id Item"){
		this.hideText(this.formRemove, "ok");
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
		this.hideText(this.formRemove);
		this._model.subtractionCouner(removeId);
		this.changeCounter();
		this._model.remove(removeId);
		this.removeOptionId(removeId);
	};
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

View.prototype.clicButton = function(event){
	var target = event.target;
	var parent = target.parentElement.parentElement;
	var idElement = parent.querySelector(".idItem").firstElementChild.textContent;
	var numberInArr = this._model.findNumberArray(idElement);
	var status = this._model.getStatus(numberInArr);//змінна для відслідковування вкл./викл. ТВ
	if(target.id === "chennelMinus" && status === true){
		this._model.setChennel(numberInArr, "-");
		this.changeVolumeAndChennel(parent, numberInArr, "chennel");
	}else if(target.id === "chennelPlus" && status === true){
		this._model.setChennel(numberInArr, "+");
		this.changeVolumeAndChennel(parent, numberInArr, "chennel");
	}else if(target.id === "volumeMinus" && status === true){
		this._model.setVolume(numberInArr, "-");
		this.changeVolumeAndChennel(parent, numberInArr, "volume");
		this._model.recalculationPowerTv(numberInArr);
		this.changePowerDevice(parent, numberInArr);
		this.changeCounter();
	}else if(target.id === "volumePlus" && status === true){
		this._model.setVolume(numberInArr, "+");
		this.changeVolumeAndChennel(parent, numberInArr, "volume");
		this._model.recalculationPowerTv(numberInArr);
		this.changePowerDevice(parent, numberInArr);
		this.changeCounter();
	}else if(target.nodeName === "SPAN"){
		this.changeStatus(parent, target, idElement);
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
};

View.prototype.changeStatus = function(parent, target, id){
	var classElement = target.parentElement;
	var classListElement = classElement.classList;
	if(classListElement[1] === "statusOff"){
		this.changeStatusElement(parent, target, classListElement, id, "statusOff", "statusOn", "ON");
	}else if(classListElement[1] === "statusOn"){
		this.changeStatusElement(parent, target, classListElement, id, "statusOn", "statusOff", "OFF");
	};
};

View.prototype.changeStatusElement = function(parent, target, classListElement, id, removeClass, addClass, textInSpan){
	var nameStoveElement;
	classListElement.remove(removeClass);
	classListElement.add(addClass);
	target.textContent = textInSpan;
	if(parent.classList[0] === "electricStove"){		
		nameStoveElement = this.nameStoveElement(target);
		this._model.changePowerInCounter(id, nameStoveElement);
	}else{
		this._model.changeStatusCounter(id);
	};
	this.changePowerDevice(parent, id);
	this.changeCounter();
};

View.prototype.changePowerDevice = function(parent, id){
	var span  = parent.querySelector(".power span");
	this._model.setPower(id);
	var text = this._model.getPower(id);
	span.textContent = text;
}

View.prototype.nameStoveElement = function(target){
	var allText = target.previousSibling;
	var powerText = "power" + allText.data.split(" ")[1]
	var arr = allText.data.split(" ");
	var arrString = arr[1].split("");
	arrString[0] = arrString[0].toLowerCase();
	var targetText = arrString.join("");
	return [targetText, powerText];
};

View.prototype.changeCounter = function(){
	var consumerElement = this.counter.querySelector(".consumer");
	var powerElement = this.counter.querySelector(".power");
	var dataCounterObj = this._model.getDataCounter();
	consumerElement.firstElementChild.textContent = dataCounterObj.consumer;
	powerElement.firstElementChild.textContent = dataCounterObj.power;
};