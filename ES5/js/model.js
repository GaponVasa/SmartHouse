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
	this.chennel = 1;
	this.volume = 50;
	this.power = 200 + (this.volume/100)*20;
};

function ElectricStove(that){
	this.id = Model.prototype.createId(that);
	//this.state = false;
	this.hotplate1 = false;
	this.powerHotplate1 = 500;
	this.hotplate2 = false;
	this.powerHotplate2 = 500;
	// this.hotplate3 = false;
	// this.powerHotplate3 = 500;
	// this.hotplate4 = false;
	// this.powerHotplate4 = 500;
	this.oven = false;
	this.powerOven = 1000;
	this.power = (+ this.hotplate1 * this.powerHotplate1) + (+ this.hotplate1 * this.powerHotplate2) + (+ this.oven * this.powerOven);

};

Model.prototype.createId = function(that){
	return ++that.globalId;
};

Model.prototype.getLastId = function(){
	return this.data[this.data.length - 1].id;
};

Model.prototype.getLastPower = function(){
	return this.data[this.data.length - 1].power;
};

Model.prototype.getDataCounter = function(){
	//console.log(this.data[0].power);
	return {consumer:this.data[0].consumer, power:this.data[0].power};
};

Model.prototype.changeStatusCounter = function(id){
	var arr = this.data;
	var i = this.findNumberArray(id);
	if(arr[i].state === true){
		arr[i].state = false;
		arr[0].consumer--;
		arr[0].power = parseFloat(arr[0].power) - parseFloat(arr[i].power);
	}else{
		arr[i].state = true;
		arr[0].consumer++;
		arr[0].power = parseFloat(arr[0].power) + parseFloat(arr[i].power);
	};
};

Model.prototype.subtractionCouner = function(id){
	var arr = this.data;
	var length = arr.length;
	var i = this.findNumberArray(id);
	if(arr[i].id === parseInt(id) && parseInt(arr[0].consumer) !== 0){
		arr[0].consumer--;
		arr[0].power = parseFloat(arr[0].power) - parseFloat(arr[i].power);
	};
};

Model.prototype.addPowerInCouner = function(addPower){
	//console.log("this.data[0].power", this.data[0].power);
	//console.log("addPower", addPower);
	this.data[0].power = this.data[0].power + addPower;
	//console.log("this.data[0].power + parseFloat(addPower)",this.data[0].power);
};

Model.prototype.removePowerInCouner = function(removePower){
	//console.log("this.data[0].power", this.data[0].power);
	//console.log("removePower", removePower);
	this.data[0].power = this.data[0].power - parseFloat(removePower);
	//console.log("this.data[0].power after", this.data[0].power);
};

Model.prototype.findNumberArray = function(numberElementArray){
	var arr = this.data;
	var length = arr.length;
	for (var i = 0; i <= length - 1; i++) {
		if(arr[i].id === parseInt(numberElementArray)){
			//console.log(i);
			return i;
		}
	}
	console.log("Don't find id");
};

Model.prototype.getChennel = function(numberElementArray){
	return this.data[numberElementArray].chennel;
};

Model.prototype.setChennel = function(numberElementArray, sign){
	if(sign === "+"){
		if(this.data[numberElementArray].chennel < 101){
			this.data[numberElementArray].chennel++;
		}
		
	}else{
		if(this.data[numberElementArray].chennel >= 2){
			this.data[numberElementArray].chennel--;
		}
	};
};

Model.prototype.getVolume = function(numberElementArray){
	return this.data[numberElementArray].volume;
};

Model.prototype.setVolume = function(numberElementArray, sign){
	if(sign === "+"){
		if(this.data[numberElementArray].volume < 101){
			this.data[numberElementArray].volume++ 
		}
	}else{
		if(this.data[numberElementArray].volume >= 1){
			this.data[numberElementArray].volume--;
		}
	};
};

Model.prototype.getStatus = function(numberElementArray){
	// console.log(id);
	// console.log(this.data[id]);
	return this.data[numberElementArray].state;
};

Model.prototype.recalculationPowerTv = function(numberElementArray){
	var newPower = 200 + (parseInt(this.data[numberElementArray].volume)/100)*20;
	var oldPower = this.data[numberElementArray].power;
	//console.log(200 + (this.data[numberElementArray].volume/100)*20);
	//console.log("oldPower",oldPower);
	this.removePowerInCouner(oldPower);
	this.addPowerInCouner(newPower);
	this.data[numberElementArray].power = newPower;
	//console.log("this.getDataCounter().power",this.getDataCounter().power)
	//console.log(this.data[numberElementArray].power);
};

////////////////////////////////////////////
Model.prototype.dataRead = function(){
	console.log(this.data);
	this.data.forEach(el =>{
		console.log(el);
	})
}