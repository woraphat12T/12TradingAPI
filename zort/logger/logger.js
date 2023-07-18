const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const moment = require('moment');
require('moment/locale/th');

const currentDate = moment().format('YYYY-MM-DD');
const logFilePath = `zort/logfile/log/query-${currentDate}.json`;

// กำหนดการกำหนดรูปแบบของข้อความในบันทึก
// const logFormat = winston.format.printf(({ level, message, timestamp }) => {
//   return `${timestamp} [${level.toUpperCase()}]: ${message}`;



const logFormat = winston.format.printf(({ level, message, timestamp, query }) => {
  const thaiTimestamp = moment(timestamp).locale('th').format('YYYY-MM-DD[T]HH:mm:ss');
  
  if (query) {
    return `${thaiTimestamp} [${level.toUpperCase()}]: ${query}`;
  }
  return `${thaiTimestamp} [${level.toUpperCase()}]: ${message}`;

});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath })
  ]
});

module.exports = logger;
