const db                        = require('../db/connection');
const moment                    = require('moment');
const camelize                  = require('camelize');
const { bitTypeCast }           = require('../helpers/typeCast');
const { generateScreenshotUrl } = require('../helpers/aws');

class TimeCardService {
  async getByUserId(userId) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT e.id, e.user_id, e.timestamp, e.is_chat, c.is_manually_verified
              FROM chat_classifier_entry AS e 
              LEFT JOIN chat_classifier_chat AS c 
              ON c.entry_id = e.id
              WHERE e.user_id = ?
              ORDER BY e.timestamp`;

      const queryOptions = {
        sql,
        typeCast: bitTypeCast
      };

      const queryParams = [ userId ];

      const handleDbResponse = (error, rows) => {
        if (error) {
          reject(error);
        }

        resolve(rows.map(camelize).map(timeCard => {
          const date          = moment.unix(timeCard.timestamp);
          const screenshotUrl = generateScreenshotUrl(
            date.format('YYYY-MM-DD'),
            timeCard.userId,
            timeCard.id
          );
          return Object.assign(timeCard, {
            thumbnailUrl: `${screenshotUrl}_thumb`,
            screenshotUrl
          });
        }));
      };

      db.query(queryOptions, queryParams, handleDbResponse);
    });
  }

  async updateWithManualStatus(id, status) {
    return new Promise((resolve, reject) => {
      const sqlQuery = `UPDATE chat_classifier_chat 
                        SET is_manually_verified = ? 
                        WHERE entry_id = ?`;

      const sqlParams = [ status, id ];

      const handleDbResponse = (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(!!result.changedRows);
      };

      db.query(sqlQuery, sqlParams, handleDbResponse);
    });
  }

}

module.exports = TimeCardService;