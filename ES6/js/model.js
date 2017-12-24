"use strict"

class Model{
	constructor(data){
		this.data = data;
		this.globalId = 0;
		this.that = this;
	};

	getSetGlobalIdData(newGlobalId){
		if(newGlobalId){
			this.globalId = newGlobalId;
		}else{
			return `${this.globalId}`;
		};
	};

	createCounter(){
		this.data.push(new Counter());
	}

	add(value){
		let currentId = this.createId();
		console.log("currentId", currentId);
		if(value === "lamp"){
			this.data.push(new Lamp(currentId, 20));
		}else if(value === "tv"){
			this.data.push(new Tv(currentId));
		}else if(value === "ElectricStove"){
			this.data.push(new ElectricStove(currentId));
		}else{
			console.log("ERROR The wrong value has come in add function");
		}
	};

	createId(){
		return ++this.globalId;
	};
};

class Counter{
	constructor(){
		this.id = "counter";
		this.consumer = 0;
		this.power = 0;
	};

	getId(){
		return this.id;
	};

	getSetConsumer(consumer){
		if(consumer){
			this.consumer = consumer;
		}else{
			return this.consumer;
		}
	};

	getSetPower(power){
		if(power){
			this.power = power;
		}else{
			return this.power;
		}
		
	};
}

class Device{
	constructor(id, power){
		this.id = id;
		this.power = power;
		this.status = false;
	};

	getId(){
		return this.id;
	};

	getSetPower(power){
		if(power){
			this.power = power;
		}else{
			return this.power;
		}
	};

	getSetStatus(status){
		if(status){
			this.status = status;
		}else{
			return this.status;
		}
	};
};

class Lamp extends Device{

};

class Tv extends Device{
	constructor(){
		this.volume = 50;
		this.channel = 1;
	}

	getSetPower(){

	}

};

class ElectricStove extends Device{
	constructor(id){
		this.id = id;
		this.power = 0;
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
	};

	getSetPower(){
		let hotplate1 = + this.hotplate1 * this.powerHotplate1;
		let hotplate2 = + this.hotplate2 * this.powerHotplate2;
		let hotplate3 = + this.hotplate3 * this.powerHotplate3;
		let hotplate4 = + this.hotplate4 * this.powerHotplate4;
		let oven = + this.oven * this.powerOven;
		this.power = hotplate1 + hotplate2 + hotplate3 + hotplate4 + oven;
		return this.power;
	};

	getSetStatus(targetOven, status){
		if(status){
			this[targetOven] = status;
		}else{
			return this[targetOven];
		}
	};
};