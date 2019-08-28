var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123123',
  database : 'note'
});

function connectionSql(){
	connection.connect();
}

function closeMysql(){
	connection.end();
}

function addUser(userName,name,password,addr,account){
	return new Promise(function(resolve, reject){
		var  addSql = 'INSERT INTO user(image,username,name,password,addr,account) VALUES("img/1.jpg",?,?,?,?,?)';
		var  addSqlParams = [userName,name,password,addr,account];
		//增
		connection.query(addSql,addSqlParams,function (err, result) {
				if(err){
					console.log('[INSERT ERROR] - ',err.message);
					resolve(false);
					return;
				}    
				console.log('--------------------------INSERT----------------------------');
				//console.log('INSERT ID:',result.insertId);        
				console.log('INSERT ID:',result);        
				console.log('-----------------------------------------------------------------\n\n');  
				resolve(true);
		});
	});
}

function updateUser(){
	var updateSql = 'UPDATE user SET name = ? WHERE username = ?';
	var modSqlParams = ['测试修改','wuzhuhao'];
	//改
	connection.query(updateSql,modSqlParams,function (err, result) {
	   if(err){
	         console.log('[UPDATE ERROR] - ',err.message);
	         return;
	   }        
	  console.log('--------------------------UPDATE----------------------------');
	  console.log('UPDATE affectedRows',result.affectedRows);
	  console.log('-----------------------------------------------------------------\n\n');
	});
	
}

function delUser(){
	var delSql = 'DELETE FROM user where username = ?';
	var delParams = ['wuzhuhao'];
	//删
	connection.query(delSql,delParams,function (err, result) {
	        if(err){
	          console.log('[DELETE ERROR] - ',err.message);
	          return;
	        }        
	 
	       console.log('--------------------------DELETE----------------------------');
	       console.log('DELETE affectedRows',result.affectedRows);
	       console.log('-----------------------------------------------------------------\n\n');  
	});
	
}
async function selectUser(){
	var  sql = 'SELECT * FROM user';
	var results;
	// return new Promise(function(resolve, reject){
	// 	connection.query(sql,function (err, result) {
	//         if(err){
	//           console.log('[SELECT ERROR] - ',err.message);
	//           return;
	//         }
	// 		results = result;
	//     //    console.log('--------------------------SELECT----------------------------');
	//     //    console.log(result);
	// 	//    console.log('------------------------------------------------------------\n\n');
	// 	})
	// 	.on('receipt', function (receipt) {
	// 		resolve(receipt);
	// 	});
	// });
	//查
	results = await connection.query(sql,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
			}
			// console.log('--------------------------SELECT----------------------------');
			// console.log(result);
			// console.log('------------------------------------------------------------\n\n');  
			return result;
	});
	return results;
}

async function selectUser1(userName){
	var  sql = 'SELECT * FROM user WHERE username= ?';
	var selParams = [userName]; 
	var results;
	console.log('传入账号 '+userName);
	return new Promise(function(resolve, reject) {
		connection.query(sql,selParams,function (err, result) {
	        if(err){
	          console.log('[SELECT ERROR] - ',err.message);
	          return;
			}
			if(result){
				console.log(result);
				resolve(result);
			}
			// return result;
	});
	// return results;
	});
	
}

exports.addUser = addUser;
exports.selectUser = selectUser;
exports.selectUser1 = selectUser1;
exports.connectionSql = connectionSql;
exports.closeMysql = closeMysql;