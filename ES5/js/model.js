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
	this.power = 0;
};

Lamp.prototype.getPower = function(){
	return +this.state * 10;
}

function Tv(that){
	this.id = Model.prototype.createId(that);
	this.state = false;
	this.chennel = 1;
	this.volume = 50;
	this.power = 0;
};

Tv.prototype.getPower = function(){
	return +this.state * (200 + (this.volume/100)*20);
}

function ElectricStove(that){
	this.id = Model.prototype.createId(that);
	this.hotplate1 = false;
	this.powerHotplate1 = 500;
	this.hotplate2 = false;
	this.powerHotplate2 = 500;
	this.hotplate3 = false;
	this.powerHotplate3 = 500;
	this.hotplate4 = false;
	this.powerHotplate4 = 500;
	this.oven = false;
	this.powerOven = 1000;
	this.power = 0;
};

ElectricStove.prototype.getPower = function(){
	return (+ this.hotplate1 * this.powerHotplate1) + (+ this.hotplate2 * this.powerHotplate2) + (+ this.hotplate3 * this.powerHotplate3) + (+ this.hotplate4 * this.powerHotplate4) + (+ this.oven * this.powerOven);
}

Model.prototype.createId = function(that){
	return ++that.globalId;
};

Model.prototype.getLastId = function(){
	return this.data[this.data.length - 1].id;
};

Model.prototype.getLastPower = function(){
	return this.data[this.data.length - 1].power;
};

Model.prototype.getPower = function(id){
	var numberInArr = this.findNumberArray(id);
	return this.data[numberInArr].power;
};

Model.prototype.setPower = function(id){
	this.data[id].power = this.data[id].getPower(id);
	return this.data[id].power;
};

Model.prototype.getDataCounter = function(){
	return {consumer:this.data[0].consumer, power:this.data[0].power};
};

Model.prototype.changeStatusCounter = function(id){
	var arr = this.data;
	var i = this.findNumberArray(id);
	var power;
	if(arr[i].state === true){
		power = this.setPower(i);
		arr[i].state = false;
		arr[0].consumer--;
		arr[0].power = (parseFloat(arr[0].power) - power).toFixed(1);
	}else{
		arr[i].state = true;
		power = this.setPower(i);
		arr[0].consumer++;
		arr[0].power = (parseFloat(arr[0].power) + power).toFixed(1);
	};
};

Model.prototype.changePowerInCounter = function(id, nameStoveElementArr){
	var nameStoveElement = nameStoveElementArr[0];
	var namePowerStoveElement = nameStoveElementArr[1];
	var numberInArr = this.findNumberArray(id);
	var counter = this.data[0];
	var element = this.data[numberInArr];
	var currentPower = element[namePowerStoveElement];
	if(element[nameStoveElement] === true){
		element.power = element.power - currentPower;
		counter.power = (parseFloat(counter.power) - currentPower).toFixed(1);
		element[nameStoveElement] = false;
		Model.prototype.changeCounerConsumer.call(this, element, element[nameStoveElement], counter);
		
	}else{
		element[nameStoveElement] = true;
		Model.prototype.changeCounerConsumer.call(this, element, element[nameStoveElement], counter);
		element.power = element.power + currentPower;
		counter.power = (parseFloat(counter.power) + currentPower).toFixed(1);
	};
};

Model.prototype.changeCounerConsumer = function(element, key, counter){
	var arr = Object.keys(element);
	var lenghtArr = arr.length;
	var countTrue = 0;
	var countFalse = 0;
	var boolElement = 0;
	for(var i = 0; i <= lenghtArr - 1; i++){
		if(element[arr[i]] === true){
			countTrue++;
			boolElement++;
		}else if(element[arr[i]] === false){
			countFalse++;
			boolElement++;
		};
	};
	if(countTrue === 1 && key === true){
		counter.consumer++;
	}else if(countFalse === boolElement && key === false){
		counter.consumer--
	};
};

Model.prototype.subtractionCouner = function(id){
	var arr = this.data;
	var length = arr.length;
	var i = this.findNumberArray(id);
	if(arr[i].id === parseInt(id) && parseInt(arr[0].consumer) !== 0){
		arr[0].consumer--;
		arr[0].power = (parseFloat(arr[0].power) - arr[i].power).toFixed(1);
	};
};

Model.prototype.findNumberArray = function(numberElementArray){
	var arr = this.data;
	var length = arr.length;
	for (var i = 0; i <= length - 1; i++) {
		if(arr[i].id === parseInt(numberElementArray)){
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
		};
	}else{
		if(this.data[numberElementArray].chennel >= 2){
			this.data[numberElementArray].chennel--;
		};
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
	return this.data[numberElementArray].state;
};

Model.prototype.recalculationPowerTv = function(numberElementArray){
	var newPower = 200 + (parseInt(this.data[numberElementArray].volume)/100)*20;
	var oldPower = this.data[numberElementArray].power;
	this.data[0].power = (parseFloat(this.data[0].power) - oldPower).toFixed(1);
	this.data[0].power = (parseFloat(this.data[0].power) + newPower).toFixed(1);
	this.data[numberElementArray].power = newPower;
};
