"use strict"

class View{
	constructor(model){
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

	init(){
		this._model.createCounter();
		this.buttonAdd.addEventListener("click", this.addItem.bind(this));
		//this.buttonRemove.addEventListener("click", this.removeItem.bind(this));
		//this.main.addEventListener("click", this.clicButton.bind(this));

		console.log("view ok");
	};

	addItem(){
		// console.log("ok AddItem");
		// console.log("this addItem", this)
		// console.log("selectAddItem", this.selectAddItem)
		let value = this.selectAddItem.value;
		let createHtml, lastId, power;
		if(value === "Select Item"){
			this.hideText(this.formAdd, "ok");
		}else{
			this._model.add(value);
			this.hideText(this.formAdd);
			//lastId = this._model.getLastId();
			//power = this._model.getLastPower();
			//this.addOptionId(lastId);
			if(value === "lamp"){
				//createHtml = this.createDeviceHtml("lamp", lastId, power);
			}else if(value === "tv"){
				//createHtml = this.createDeviceHtml("tv", lastId, power);
			}else if(value === "ElectricStove"){
				//createHtml = this.createDeviceHtml("stove", lastId, power);
			}else{
				console.log("ERROR The wrong value has come in addItem function");
			};
			//this.main.appendChild(createHtml);
		};
	};

	hideText(form, value){
		let select = form.querySelector("select");
		let hide = form.querySelector(".hideElement");
		let red = form.querySelector(".red");
		if(value === "ok"){
			if(red === null){
				select.className += "red";
			};		
			hide.style.display = "block";	
		}else{
			select.classList.remove("red");
			hide.style.display = "none";
		};
	}
}