/**
 * Created by levy on 2018/7/8.
 */
// import node modules package
const fs = require('fs');
const path = require('path');
const sqlite3 = require("sqlite3").verbose();

//import own package
//const propath = require('../dir/handle');

// database file
const file = "./lottery.db";

//define error information
const createGiftTableErr = 'errone';
const createStuffTableErr = 'errtwo';

//define success information
const createGiftTableSucc = 'succone';
const createStuffTableSucc = 'succtwo';

var initDataBase={};

/*
 * method:This funbction used to get the linkeye.db directory
 * params:no
 * return:linkeye.db directory
 */
// function getDbFilePath(flag) {
//     var dir =  propath.handlePath();
//     var dbDir = path.resolve(dir, '../../../');
//     var linkFileDir = dbDir + flag + file;
//     return linkFileDir;
// }

/*
 * method:This funbction used to check the linkeye.db file is exist or not
 * params:no
 * return:no
 */
initDataBase.checkCreateLinkeyeDb = function (){
    var db;
    //var linkDirFile = getDbFilePath("./sqlData/");
    var exists = fs.existsSync(file);
    if(!exists) {
        db = new sqlite3.Database(file);
        console.log('create linkeye.db success');
    }else {
        db = new sqlite3.Database(file);
        console.log('linkeye.db is already exist');
    }
    return db;
}

/*
 * method:This funbction used to create account table
 * params:tableName
 * params:db
 * return:integer PRIMARY KEY NOT NULL AUTO_INCREMENT
 */
initDataBase.createStuffTable = function(tableName, db, callback) {
    if (!tableName || !db ){
        console.log("table name or db is null");
        return callback({data:createStuffTableErr});
    }else {
        db.run("CREATE TABLE IF NOT EXISTS  "+ tableName + "  (" +
            "id          INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name        varchar(100) , " +
            "tel         varchar(11) , " +
            "birth       varchar(50), " +
            "create_time  datetime default (datetime('now', 'localtime')) " +
            //"unique（name,birth,create_time) " +
            ") ");

        console.log("create stuff table success");
    }
    return callback({data:createStuffTableSucc});
};

/*
 * method:This funbction used to create send table
 * params:tableName
 * params:db
 * return:
 */
initDataBase.createGiftTable = function(tableName, db, callback) {
    if (!tableName || !db){
        console.log("table name or db  is null");
        return callback({data:createGiftTableErr});
    }else {
        db.run("CREATE TABLE IF NOT EXISTS  "+ tableName + "  (" +
            "id           INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "title        varchar(255) ," +
            "notes        varchar(255) ," +
            "count        int(5)  ," +
            "category     int(5)  ," +
            "status       int(2) ," +
            "create_time  datetime default (datetime('now', 'localtime'))" +
            ") ");

        console.log("create send table success");
    }
    return callback({data:createGiftTableSucc});
};

module.exports = initDataBase;