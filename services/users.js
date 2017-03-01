const db = require('../db/connection');

const removeQuotes = str => str.slice(1, -1);

const prepareSearchTerm = str => removeQuotes(db.escape(str)).toLowerCase();

class UserService {
  async searchByName(name) {
    return new Promise((resolve, reject) => {
      if (!name) {
        reject('No search term provided');
      }

      const searchTerm = prepareSearchTerm(name);
      const sql        = `SELECT * 
                          FROM chat_classifier_user 
                          WHERE LOWER(last_name) LIKE "%${searchTerm}%" 
                          OR LOWER(first_name) LIKE "%${searchTerm}%" 
                          ORDER BY last_name`;

      db.query(sql,
        (error, rows) => {
          if (error) {
            reject(error);
          }

          if (!rows.length) {
            reject('Nothing found');
          }

          resolve(rows);
        });
    });
  }

  async getByLastName(lastName) {
    return new Promise((resolve, reject) => {
      if (!lastName) {
        reject('No search term provided');
      }

      const searchTerm = prepareSearchTerm(lastName);
      const sql        = `SELECT * 
                          FROM chat_classifier_user 
                          WHERE LOWER(last_name) LIKE "%${searchTerm}%" 
                          ORDER BY id`;

      db.query(sql,
        (error, rows) => {
          if (error) {
            reject(error);
          }

          if (!rows.length) {
            reject('Nothing found');
          }

          resolve(rows[ 0 ]);
        });
    });
  }
}

module.exports = UserService;