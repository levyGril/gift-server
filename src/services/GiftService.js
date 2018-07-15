//import GiftModel from '../models/GiftModel'
const init = require('../repositories/init');
const sql = require('../repositories/sqlite');
var db = init.checkCreateLinkeyeDb();
const dateTime = require('date-time');

class GiftService{

    /**
     *
     * @constructor
     */
    constructor(){}

    async createTable(){
        return new Promise((resolve,reject)=>{
            init.createGiftTable("gift_info", db, function (res) {
                if(res.data.indexOf("err")>-1){
                    resolve(res);
                }else{
                    reject(res);
                }
            });
        }).then(result=>{
            return result;
        }).catch(err=>{
            throw err;
        })

    }

    async add(title, notes, count, category){
        var sqlone = `INSERT OR REPLACE  INTO gift_info(
            title, notes, count, category,status,create_time
            ) VALUES (${title}, ${notes}, ${count}, ${category},0,new Date())`;
        // var err = sql.executeNoQuerySql(sqlone, db);
        return new Promise((resolve, reject)=>{
            sql.executeNoQuerySql(sqlone, db, function (res) {
                if(res.data.indexOf("succ")>-1){
                    resolve(res);
                }else{
                    reject(res);
                }
            });
        }).then((res)=>{
            return res;
        }).catch(err=>{
            throw err;
        });
    }

    async update(id){
        var sqlone = "update gift_info " +
            "set count = count-1 where id = "+id+" and status = 0 ";
        // var err = sql.executeNoQuerySql(sqlone, db);
        console.log(sqlone);
        return new Promise((resolve, reject)=>{
            sql.executeNoQuerySql(sqlone, db, function (res) {
                if(res.data.indexOf("succ")>-1){
                    resolve(res);
                }else{
                    reject(res);
                }
            });
        }).then((res)=>{
            return res;
        }).catch(err=>{
            throw err;
        });
    }

    async getData(){
        const sqltwo = "select * from gift_info where status = 0 ";
        console.log(sqltwo);
        return new Promise((resolve, reject)=>{
            sql.executeQuerySql(sqltwo, db, function (res) {
                if(res.success){
                    resolve(res);
                }else{
                    reject(res);
                }
            });
        }).then(result=>{
            return result;
        }).catch((err)=>{
            throw err;
        });
    }

    async getDataById(id){
        const sqltwo = "select * from gift_info where status = 0 and id = "+id;
        console.log(sqltwo);
        return new Promise((resolve, reject)=>{
            sql.executeQuerySql(sqltwo, db, function (res) {
                if(res.success){
                    resolve(res);
                }else{
                    reject(res);
                }
            });
        }).then(result=>{
            return result;
        }).catch((err)=>{
            throw err;
        });
    }
}

export default GiftService;