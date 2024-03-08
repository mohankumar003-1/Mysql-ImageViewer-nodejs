
const db = require('../db.js');
const getData = (req,res)  => {
    try{
        const responseData = {
        message : 'hello! this is the end point',
        timestamp : new Date().toISOString(),

        };
        res.json(responseData);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'Internal server error'});

    }

};

const test = (req,res) => {
    try{
        console.log("hi");
    }
    catch(error){
        console.log(error);

    }
}
const createTable = async (res,req)=>{
    try{
        const row = await db.execute('create table image1


            ');
        res.json(row);
    }
    catch(error){
        console.log(error);
    }

};


module.exports = { getData,test,createTable };
