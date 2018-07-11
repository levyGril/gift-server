/**
 * Created by levy on 2018/7/7.
 */
const init = require('../repositories/init');
const sql = require('../repositories/sqlite');
var db = init.checkCreateLinkeyeDb();
const dateTime = require('date-time');
class StuffService{
    constructor(){}

    async createTable(){
        return new Promise((resolve, reject)=>{
            init.createStuffTable("stuff", db, function (res) {
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

    async add(name, tel, birth){
        console.log(dateTime());
        let sqlone = "INSERT OR REPLACE  INTO stuff("+
                     " name, tel, birth, create_time "+
                     " ) VALUES (" +
            name +
            "," +
            tel +
            "," +
            birth +
            "," +
            dateTime() +
            ")";
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
    async getData(name, birth){
        let sqltwo = "select * from stuff where 1=1 ";
        if(!(name==""||name==undefined||name==null)){
            sqltwo += " and name = '"+name+"' and birth = '"+birth+"'";
        }
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

export default StuffService;