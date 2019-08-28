// //资源映射
// var server = require("./server");
// var router = require("./router");
// var requestHandles = require("./requestHandler");

// var handle = {};
// handle["/test"]=requestHandles.test;
// handle["/newAccount"]=requestHandles.newAccount;
// handle["/deploy"]=requestHandles.deploy;
// server.start(router.route,handle);
//资源映射
var server = require("./server");
var router = require("./router");
var requestHandles = require("./requestHandler");

var handle = {};
handle["/test"]=requestHandles.test;
handle["/newAccount"]=requestHandles.newAccount;
handle["/deploy"]=requestHandles.deploy;
handle["/register"]=requestHandles.register;
handle["/login"]=requestHandles.login;
handle["/paging"]=requestHandles.paging;
// handle["/addNote"]=requestHandles.addNote;
handle["/getNote"]=requestHandles.getNote;
handle["/getNoteList"]=requestHandles.getNoteList;
handle["/paging"]=requestHandles.paging;
handle["/addN"]=requestHandles.addN;
handle["/updatetitle"]=requestHandles.updatetitle;
handle["/deltitle"]=requestHandles.deltitle;
handle["/gettypelist"]=requestHandles.gettypelist;
handle["/addtype"]=requestHandles.addtype;
handle["/deltype"]=requestHandles.deltype;
handle["/deployPublic"]=requestHandles.deployPublic;
handle["/pripaddtype"]=requestHandles.pripaddtype;
handle["/getTypeValues"]=requestHandles.getTypeValues;
handle["/addPublicNote"]=requestHandles.addPublicNote;
handle["/Publicpaging"]=requestHandles.Publicpaging;


// handle["/addType"]=requestHandles.addType;
// handle["/testCooie"]=requestHandles.testCooie;
server.start(router.route,handle);
