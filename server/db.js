'use strict'
const sqlite3 = require('sqlite3').verbose()

class Db {
  constructor (file) {
    this.db = new sqlite3.Database(file)
    this.createUserTable()
    this.createDataTable()
  }
  createUserTable () {
    const sql = `
    CREATE TABLE IF NOT EXISTS user (
      id integer PRIMARY KEY,
      name text,
      email text UNIQUE,
      password text,
      is_admin integer)`
    return this.db.run(sql)
  }
  createDataTable () {
    const datasql = `
    CREATE TABLE IF NOT EXISTS data (
      id integer UNIQUE PRIMARY KEY,
      userid text,
      title text,
      date text,
      time text,
      venue text,
      speaker text,
      affiliation text,
      host text,
      abst text,
      supp text
    )`
    return this.db.run(datasql)
  }
  selectByEmail (email, callback) {
    return this.db.get(
      `SELECT * FROM user WHERE email =?`,
      [email], function (err, row) {
        callback(err, row)
      })
  }
  selectById (id, callback) {
    return this.db.get(
      `SELECT * FROM data WHERE id=?`,
      [id], function (err, row) {
        callback(err, row)
      })
  }
  selectDataByUserId (userid, callback) {
    return this.db.all(
      `SELECT *, strftime('%W', date) WeekNumber
      FROM data WHERE userid=? ORDER BY date`,
      [userid], function (err, rows) {
        callback(err, rows)
      })
  }
  insertAdmin (user, callback) {
    return this.db.run(
      'INSERT INTO user(name, email, password, is_admin) VALUES (?, ?, ?, ?)',
      user, (err) => {
        callback(err)
      })
  }
  selectAll (callback) {
    return this.db.all(`SELECT * FROM user`, function (err, rows) {
      callback(err, rows)
    })
  }
  selectAllData (dateb, datee, callback) {
    return this.db.all(`SELECT * FROM data WHERE date BETWEEN ? AND ? ORDER BY date ASC`, [dateb, datee], function (err, rows) {
      callback(err, rows)
    })
  }
  selectAllSearchData (s, callback) {
    return this.db.all(`SELECT * FROM data WHERE INSTR (title || speaker || host || affiliation, ?)>0`, s, function (err, rows) {
      callback(err, rows)
    })
  }
  insert (user, callback) {
    return this.db.run(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
      user, (err) => {
        callback(err)
      })
  }
  insertData (data, callback) {
    return this.db.run(
      'INSERT INTO data (userid, title, date, time, venue, speaker, affiliation, host, abst, supp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      data, (err) => {
        callback(err)
      })
  }
  updateById (data, callback) {
    return this.db.run( 'UPDATE data SET title = ?, date = ?, time = ?, venue = ?, speaker = ?, affiliation = ?, host = ?, abst = ?, supp = ? WHERE id=?',
      [data.title, data.date, data.time, data.venue, data.speaker, data.affiliation, data.host, data.abst, data.supp, data.id], (err) => {
        callback(err)
      })
  }
  delete(id, callback) {
    return this.db.run(
      'DELETE FROM data WHERE id = ?',
      id, (err) => {
        callback(err)
      })
  }
}
module.exports = Db
