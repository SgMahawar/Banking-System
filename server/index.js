const express=require('express');
const app=express();
const mysql=require('mysql');
const bodyParser=require('body-parser');
const cors=require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(8000,()=>{
  console.log("Server running!");
});

const db=mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cruddb'
});

app.post('/api/insert', (req,res)=>{
  const sqlInsert="INSERT INTO branch VALUES (?,?,?);";
  // console.log(req.body.bname);
  db.query(sqlInsert,[
    req.body.bcode,
    req.body.bname,
    req.body.badd
  ],(err,result)=>{
    if(!err) res.send(result);
    else throw err;
  });
});

app.get('/api/blist',(req,res)=>{
  db.query("SELECT * FROM branch;",
    (err,result)=>{
      if(!err) {
        res.send(result);
        // console.log(result[result.length-1].branch_code);
      }
      else throw err;
    }
  );
});

app.get('/api/elist',(req,res)=>{
  db.query("SELECT employee.*,branch.* FROM employee JOIN branch ON employee.br_code=branch.branch_code;",
    (err,result)=>{
      if(!err) {
        res.send(result);
        // console.log(result[result.length-1].branch_code);
      }
      else throw err;
    }
  );
});

app.get('/api/clist',(req,res)=>{
  db.query("SELECT * FROM customer;",
    (err,result)=>{
      if(!err) {
        res.send(result);
        // console.log(result[result.length-1].branch_code);
      }
      else throw err;
    }
  );
});

app.post('/api/tlist',(req,res)=>{
  db.query("SELECT * FROM transaction WHERE acc_num = ?;",[
    req.body.acc_no
  ],(err,result)=>{
      if(!err) {
        res.send(result);
        // console.log(result[result.length-1].branch_code);
      }
      else throw err;
    }
  );
});

app.post('/api/bal',(req,res)=>{
  db.query("SELECT * FROM customer WHERE acc_no= ?",[
    req.body.acc_no
  ],(err,result)=>{
    if(!err) res.send(result);
  })
});

app.post('/api/register',(req,res)=>{
  // console.log(req.body.gender);
  db.query("INSERT INTO customer VALUES (DEFAULT,?,?,?,?,?,?,?,?,?)",[
    req.body.fullName,
    req.body.gender,
    req.body.acc_type,
    req.body.mobile,
    0,
    req.body.dob,
    req.body.pin,
    req.body.bcode,
    req.body.address
  ],(err,result)=>{
    if(!err) res.send(result);
    else res.send(err);
  });
});

app.post('/api/empreg',(req,res)=>{
  db.query('INSERT INTO employee VALUES(DEFAULT,?,?,?,?)',[
    req.body.fullName,
    req.body.bcode,
    req.body.password,
    req.body.designation
  ],(err,result)=>{
    if(!err) res.send(result);
    else throw err;
  });
});

app.post('/api/transaction',(req,res)=>{
  console.log(req.body);
  var bal=0;
  var pin=0;
  db.query('SELECT * FROM customer WHERE acc_no = ?',[
    req.body.sender
  ],(err,result)=>{
    if(!err){
      console.log(result[0]);
      this.pin=result[0].pin;
      this.bal=result[0].balance;
      console.log(this.bal);
      console.log(this.pin);

      console.log("Herer");
      if(req.body.pin!=this.pin) {
      // console.log(pin);
      // console.log("WP");
      res.send("Wrong Pin");
      }
      else{
        if(req.body.type=='Deposit'){
          db.query("UPDATE customer SET balance = balance + ? WHERE acc_no = ?",[
            req.body.amount,
            req.body.sender
          ],(err,result)=>{
            // console.log(result);
            db.query("INSERT INTO transaction VALUES (DEFAULT,?,'Cr',?,?);",[
              req.body.sender,
              req.body.amount,
              new Date
            ],(ee,rr)=>{
              if(ee) throw ee;
            });
            if(!err) res.send(result);
            else res.send(err);
          });
        }
        else if(req.body.amount>this.bal) {
          // console.log("IB");
          res.send("Insufficient Bal");
        }
        else{
          if(req.body.type=='Withdraw'){
            db.query("UPDATE customer SET balance = balance - ? WHERE acc_no = ?",[
              req.body.amount,
              req.body.sender
            ],(err,result)=>{
              // console.log(result);

              db.query("INSERT INTO transaction VALUES (DEFAULT,?,'Dr',?,?);",[
                req.body.sender,
                req.body.amount,
                new Date
              ],(ee,rr)=>{
                if(ee) throw ee;
              });
              if(!err) res.send(result);
              else res.send(err);
            })
          }
          if(req.body.type=='Transfer'){
            console.log("this is transfer");
            db.query("UPDATE customer SET balance = balance - ? WHERE acc_no = ?;",[
              req.body.amount,
              req.body.sender
            ],(err,result)=>{
              db.query("UPDATE customer SET balance = balance + ? WHERE acc_no = ?;",[
              req.body.amount,
              req.body.receiver
              ],(e,r)=>{
                console.log(result);
                console.log("success");
                const date=new Date;
                db.query("INSERT INTO transaction VALUES (DEFAULT,?,'Cr',?,?);",[
                  req.body.sender,
                  req.body.amount,
                  date
                ],(ee,rr)=>{
                  if(ee) throw ee;
                });
                db.query("INSERT INTO transaction VALUES (DEFAULT,?,'Dr',?,?);",[
                  req.body.receiver,
                  req.body.amount,
                  date
                ],(ee,rr)=>{
                  if(ee) throw ee;
                });
                if(!e) res.send(r);
                else throw e;
              });
              console.log(result);
              // if(!err) res.send(result);
              // res.send(err);
            })
          }
        }
        
    
      }
    }
    else throw err;
  });
});

app.post('/api/emplogin',(req,res)=>{
  // console.log(req.body);
  db.query("SELECT * FROM employee WHERE emp_id = ? AND password = ?",[
    req.body.username,
    req.body.password
  ],(err,result)=>{
    if(!err){
      // console.log(result[0]);
      res.send(result);
    }
    else throw err;
  });
});

app.get('/',(req,res)=>{
  res.send("this works");
});