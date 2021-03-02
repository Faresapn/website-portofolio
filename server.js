const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();


//Koneksi ke mysql database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_portofolio'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Koneksi berhasil');
});

app.use(bodyParser.json());
app.listen(4000, () => console.log('Server berjalan di port 4000'));
app.use(express.static('public'));

//Baca Semua Data
app.get('/read',(req, res) => {

  let sql = "SELECT * FROM tbl_portofolio";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});

//Baca Data Berdasarkan no
app.get('/readbyno/:no', async (req, res) =>{
    const no = req.params.no;
    console.log(no);

    let sql = "SELECT * FROM tbl_portofolio Where no = "+ no +"";
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
      });
});

//route untuk insert data
app.post('/api', (req, res) => {
    let action = req.body.action;
    let data = {no: req.body.no, name: req.body.name, category: req.body.category, description: req.body.description};
    let sql;

    if(action === 'Simpan'){
        sql = "INSERT INTO tbl_portofolio SET ?";    
    }else{
        sql = `UPDATE tbl_portofolio SET name='`+req.body.name+`', 
                category='`+req.body.category+`', description='`+ req.body.description +`' 
                WHERE no='`+req.body.no+`';`
    }
    
    console.log(sql);
    let query = conn.query(sql, data,(err, results) => {
       if(err) throw err;
       res.json(results);
       console.log(results);
    });
});

//Baca Data Berdasarkan no
app.get('/hapus/:no', async (req, res) =>{
    const no = req.params.no;
    console.log(no);

    let sql = `DELETE FROM tbl_portofolio Where no = '`+ no +`';`
      let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
      });
});