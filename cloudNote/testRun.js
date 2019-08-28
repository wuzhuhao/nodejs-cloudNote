var mysql1 = require("./test");
gg();
async function gg(){
    console.log("123");
    mysql1.connectionSql();
    var rs = await mysql1.selectUser();
    console.log(rs);
    mysql1.closeMysql();
    console.log("123");
}