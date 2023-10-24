const express = require('express');
const db = require('./db_connection.js');
const multer = require('multer');
const mysql = require('mysql')
const readXlsxFile = require('read-excel-file/node');
const path = require('path');

const app = express();
const PORT = 3000;

// Настройка хранилища и имени файла для загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
  }
});

const uploadFile = multer({ storage: storage });

// Настройка соединения с базой данных MySQL
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "eco"
// });

app.use(express.static(path.join(__dirname, "public")));

app.get('/index.html', function (req, res) {
  const options = {
    root: path.join(__dirname)
  };

  const fileName = '/public/index.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/polluter-data', function (req, res) {
  res.json(db.polluter);
});
app.get('/Factory-name', function (req, res) {
  res.json(db.factoryName);
});
app.get('/pollution-data', function (req, res) {
  res.json(db.pollution);
});

app.get('/factory-data', function (req, res) {

  
  res.json(db.factory);
 
});

app.post('/upload', uploadFile.single('file'), uploadObjectsToDBFromFile);

async function uploadObjectsToDBFromFile(req, res) {
  if (req.file) {
    const filePath = process.cwd() + '/uploads/' + req.file.filename;
    readXlsxFile(filePath).then(async (rows) => {
     // connection.connect();
      
     // const values = Object.values(rows).map(val => val);
      const values = Object.values(rows).map(row => {
        return `(${row.map(val => {
          return `'${val}'`;
        }).join(', ')})`;
      }).join(', ');
   
      const query_bd = `INSERT INTO factory (Name_factory, Adresa, Info) VALUES ${values};`;
      try {
        console.log('success');
        db.con.query(query_bd);
      
        app.get('/factory-New-data', function (req, res) {
        //connection.connect();
        db.con.query('SELECT * FROM factory;', function(err, results) { console.log("upload data on server");  res.json(JSON.stringify(results));  });
       // connection.end(function(err) { console.log('Connection DB closed.');});
      });
      //connection.end(function(err) { console.log('Connection DB closed.21421');});
       
      } catch (err) {
        console.log('NO success');
        console.error(err);
        res.status(500).json({ error: 'Data not loaded' });
      }
     
    });
  
    
   
    
  }
}
app.post('/uploadPollution', uploadFile.single('file'), uploadPollutionToDBFromFile);

async function uploadPollutionToDBFromFile(req, res) {
  if (req.file) {
    const filePath = process.cwd() + '/uploads/' + req.file.filename;
    readXlsxFile(filePath).then(async (rows) => {
    
      const values = Object.values(rows).map(row => {
        return `(${row.map(val => {
          return `'${val}'`;
        }).join(', ')})`;
      }).join(', ');
   
      const query_bd = `INSERT INTO pollution (ID_factory, ID_polluter, Count_pollution, Year_pollution) VALUES ${values};`;
      try {
 
        db.con.query(query_bd);
      
        app.get('/pollution-New-data', function (req, res) {
          console.log(db.sqlDataPollution);
          db.con.query(db.sqlDataPollution, function(err, results) { console.log(JSON.stringify(results));  res.json(JSON.stringify(results));  });

//db.con.query(db.sqlDataPollution)

       // db.con.query('SELECT * FROM factory;', function(err, results) { console.log("upload data on server");    });
      });
       
      } catch (err) {
        console.log('NO success');
        console.error(err);
        res.status(500).json({ error: 'Data not loaded' });
      }
     
    });}}

    app.post('/uploadPolluter', uploadFile.single('file'), uploadPollerToDBFromFile);

async function uploadPollerToDBFromFile(req, res) {
  if (req.file) {
    const filePath = process.cwd() + '/uploads/' + req.file.filename;
    readXlsxFile(filePath).then(async (rows) => {
    
      const values = Object.values(rows).map(row => {
        return `(${row.map(val => {
          return `'${val}'`;
        }).join(', ')})`;
      }).join(', ');
   
      const query_bd = `INSERT INTO polluter (Name_polluter, GDK, GDK_midle, Dangerous_level) VALUES ${values};`;
      try {
 
        db.con.query(query_bd);
      
        app.get('/polluter-New-data', function (req, res) {

        //db.con.query(db.sqlDataPolluter)
        db.con.query( 'SELECT * FROM polluter;', function(err, results) { console.log("upload data on server");  res.json(JSON.stringify(results));  });

       // db.con.query('SELECT * FROM factory;', function(err, results) { console.log("upload data on server");    });
      });
       
      } catch (err) {
        console.log('NO success');
        console.error(err);
        res.status(500).json({ error: 'Data not loaded' });
      }
     
    });}}
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
