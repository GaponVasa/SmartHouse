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

}

Model.prototype.add = function(value){
	if(value === "lamp"){
		this.data.push(new Lamp(this.that));
	}else if(value === "tv"){
		this.data.push(new Tv(this.that));
	}else if(value === "ElectricStove"){
		this.data.push(new ElectricStove(this.that));
	}else{
		console.log("ERROR")
	}
	//console.log(this.data);
};

function Lamp(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
};

function Tv(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
};

function ElectricStove(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
};

Model.prototype.createId = function(that){
	return ++that.globalId;
};