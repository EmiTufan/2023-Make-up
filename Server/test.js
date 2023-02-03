const { createPool} = require('mysql')



const pool = createPool({
    host: '127.0.0.1',
    user: 'xxx',
    password: 'xxx',
    database: 'Login',
    connectionLimit: 10,
    port:3306
})



pool.query(`select * from login`, (err, result, fields)=>{
    if(err){
        console.log(err)
    }else{
        console.log('succes')
    }
})