var mysql = require('mysql');
//const readXlsxFile = require('read-excel-file/node')
let factory , polluter,pollution ;
const sqlDataPollution = 'SELECT f.Name_factory, p.Name_polluter, po.Count_pollution, po.Year_pollution FROM pollution po INNER JOIN factory f ON po.ID_factory = f.ID INNER JOIN polluter p ON po.ID_polluter = p.ID;';
module.exports.sqlDataPollution = sqlDataPollution;
//const sqlDataPolluter = 'SELECT * FROM polluter;';
//module.exports.sqlDataPollution = sqlDataPolluter;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "eco"
});
module.exports.con = con;

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected DB!");
 
// });
// // let value = ["a","b","c"];



// //uploadDatainBD("data")
// function uploadDatainBD(data){
//     console.log(data +"   db");
//     // File path.
//     let dataExel ;
   
//     data = './uploads/example.xlsx'
//     readXlsxFile(data).then((rows) => {
   
//       console.log(rows.length);
//       dataExel = Object.assign([],rows);
      
      
   
    
//     });
//     // for (let row of rows){
//     //   const sql = "INSERT INTO factory (Name_factory, Adresa, Info) VALUES (?);";
       
//     //   con.query(sql,[row] ,function(err, results) {
//     //     if (err) {
//     //       console.log(err);
//     //     } else {
//     //       console.log('Inserted:', value);
//     //     }});
//     // }
//     console.log(dataExel);
   

//     //  ;
      

// }
//module.exports.uploadDatainBD = uploadDatainBD;
con.query(sqlDataPollution, function(err, results) {
  if (err) throw err;
  pollution = JSON.stringify(results);
  module.exports.pollution = pollution;
  
});


con.query('SELECT * FROM factory;', function(err, results) {
  if (err) throw err;
  factory = JSON.stringify(results);
  console.log("factory");
  module.exports.factory = factory;
  
});

con.query( 'SELECT * FROM polluter;', function(err, results) {
  if (err) throw err;
  polluter = JSON.stringify(results);
  module.exports.polluter = polluter;
  
});
// con.end(function(err) {
//   if (err) throw err;
//   console.log('Connection DB closed.');
// });



 