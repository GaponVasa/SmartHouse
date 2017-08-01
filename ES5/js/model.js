"use strict"

function Model(data){
	this.data = data;
	this.globalId = 0;
	this.that = this;
};

Model.prototype.getData = function(){
	return this.data;
};

Model.prototype.remove = function(value){
	var arr = this.data;
	var length = arr.length;
	for (var i = length - 1; i >= 0; i--) {
		if(parseInt(arr[i].id) === parseInt(value)){
			arr.splice(i, 1);
			break;
		};
	};
};

Model.prototype.add = function(value){
	if(value === "lamp"){
		this.data.push(new Lamp(this.that));
	}else if(value === "tv"){
		this.data.push(new Tv(this.that));
	}else if(value === "ElectricStove"){
		this.data.push(new ElectricStove(this.that));
	}else{
		console.log("ERROR The wrong value has come in add function");
	}
};

function Lamp(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
	this.power =10;
};

function Tv(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
	this.power =10;
};

function ElectricStove(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
	this.power =10;
};

Model.prototype.createId = function(that){
	return ++that.globalId;
};

Model.prototype.getLastId = function(){
	return this.data[this.data.length - 1].id;
};

Model.prototype.getDataCounter = function(){
	return {consumer:this.data[0].consumer, power:this.data[0].power};
};

Model.prototype.changeStatusCounter = function(id){
	var arr = this.data;
	var length = arr.length;
	for (var i = length - 1; i >= 0; i--) {
		if(arr[i].id === parseInt(id)){
			if(arr[i].state === true){
				arr[i].state = false;
				arr[0].consumer--;
				arr[0].power = parseInt(arr[0].power) - parseInt(arr[i].power);
			}else{
				arr[i].state = true;
				arr[0].consumer++;
				arr[0].power = parseInt(arr[0].power) + parseInt(arr[i].power);
			};
			break;
		};
	};
};

Model.prototype.subtractionCouner = function(id){
	var arr = this.data;
	var length = arr.length;
	for (var i = length - 1; i >= 0; i--) {
		if(arr[i].id === parseInt(id) && parseInt(arr[0].consumer) !== 0){
			arr[0].consumer--;
			arr[0].power = parseInt(arr[0].power) - parseInt(arr[i].power);
		}
	}
}

////////////////////////////////////////////
Model.prototype.dataRead = function(){
	this.data.forEach(el =>{
		console.log(el);
		// console.log(el.id);
		// if(el.state){
		// 	console.log("el.state = ", el.state);
		// }
	})
}