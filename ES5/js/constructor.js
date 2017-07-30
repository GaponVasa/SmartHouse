"use strict"
var data = [{id:"counter", consumer:"0", power:"0"}];
var model = new Model(data);
var view = new View(model, data);
view.init();