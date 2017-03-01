module.exports = {
  connector: 'mysql',
  host     : process.env.DB_HOST || 'localhost',
  port     : process.env.DB_PORT || 3306,
  user     : process.env.DB_USER || 'localuser',
  password : process.env.DB_PASSWORD || 'localpassword',
  database : process.env.DB_NAME || 'timecards',
};