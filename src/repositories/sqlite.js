/**
 * Created by levy on 2018/7/8.
 */
/*
 * This Package used to execute sql operation
 */
const init = require('./init');


// error code
const execSqlErr = 'err';
const execSqlSucc = 'succ';

// init database handle
var sql = {};

/*
 * Method:This function is used to execute sql sentence
 * params: sql-sql sentence
 * params: db-database handle
 * return: fail to return error code
 */
sql.executeNoQuerySql = function (sql, db, callback) {
    if (!sql) {
        console.log("sql sentence is null")
        return callback({data: execSqlErr});
    }else {
        db.run(sql);
        return callback({data: execSqlSucc});
    }
}

/*
 * Method:This function is used to execute sql sentence
 * params: sql-sql sentence
 * params: db-database handle
 * return: success to return result set; fail to print error
 */
sql.executeQuerySql = function(sql, db, callback) {
    if (!sql) {
        console.log("sql sentence is null")
    }else {
        db.all(sql, function(err, res) {
            if(!err) {
                callback( {success: true, data: JSON.stringify(res)});
                //return {success: true, data: JSON.stringify(res)};
            } else {
                console.log(err);
                callback({success: false, data: {}});
            }
        });
    }
};

module.exports = sql;