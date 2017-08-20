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
		//this.buttonAdd.addEventListener("click", this.addItem.bind(this));
		//this.buttonRemove.addEventListener("click", this.removeItem.bind(this));
		//this.main.addEventListener("click", this.clicButton.bind(this));

		console.log("view ok");
		this._model.ok();
		console.log(this._model.globalIdData);
		this._model.globalIdData = 2;
		console.log(this._model.globalIdData);
	}
}