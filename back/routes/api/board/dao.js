const db = require('../../../config/db');
const conn = db.init();

exports.list = (req, res) => {
    conn.query("select * from tbl_board", (err, row) => {
        if (err) throw err;
        res.send({
            success: true,
            data: row
        })
    })
}

exports.add = (req, res) => {
    body = req.body;
    sql = "INSERT INTO tbl_board (board_code, subject, cont, id) values (?, ?, ?, ?)";
    conn.query(sql,
        [
            body.board_code,
            body.subject,
            body.cont,
            body.id
        ],
        (err, result) => {
            if (err) throw err;

            res.send({success: true});
        })
}