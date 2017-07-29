"use strict"
function View(model, data){
	this._data = data;
	this._model = model;
	this.selectItem = document.getElementById("selectItem");
	this.buttonAdd = document.getElementById("buttonAdd");
	this.buttonData = document.getElementById("buttonData");
};

View.prototype.init = function(){
	//console.log(this._data);
	this.buttonAdd.addEventListener("click", this.addItem.bind(this));
	//this.buttonData.addEventListener("click", this.addItemView.bind(this));
}

View.prototype.addItem = function(){
	//console.log(this.selectItem.value);
	this._model.add(this.selectItem.value);
	View.prototype.addItemView.call(this);
	//var value = this.selectItem.value;
	// if(value === "Select Item"){

	// }else if(value === "lamp"){

	// }else if(value === "tv"){
		
	// }else if(value === "ElectricStove"){
		
	// }
};

View.prototype.addItemView = function(){
	//console.log(this._data);
	console.log(this._data[this._data.length - 1]);
	console.log(this._data[this._data.length - 1].id);
	console.log(this._data[this._data.length - 1].state);
	// this._data.forEach(function(el){
	// 	// console.log(el);
	// 	// console.log(el.id);
	// 	// console.log(el.state);
	// });
}



// View.prototype.add = function(){
// 	this._model.add(this.param)
// }
