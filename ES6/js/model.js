"use strict"

class Model{
	constructor(data){
		this.data = data;
		this.globalId = 0;
		this.that = this;
	};

	ok(){
		console.log("model ok");
	}

	get globalIdData(){
		return `${this.globalId}`;
	};

	set globalIdData(newGlobalId){
		this.globalId = newGlobalId;
	};
}