const { Grid } = require('gridfs-stream');
const mongoose = require('mongoose');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer')
const crypto = require('crypto')
require('dotenv').config()


let conn;

let gfs;

exports.initGirdfs = () => {
    console.log("chekecek")
    conn = mongoose.createConnection(process.env.DB_URL);
    conn.once('once', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    })
}

const storage = new GridFsStorage({
    url: process.env.DB_URL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  exports.upload = multer({ storage }) ;


  exports.getFiles = (req, res) => {

    // const conn = mongoose.createConnection(process.env.DB_URL);
    // conn.once('once', () => {
    //     gfs = Grid(conn.db, mongoose.mongo);
    //     gfs.collection('uploads');
    //     console.log(gfs);
    // })

    gfs.files.find().toArray((err,files) => {

        //Check if files exist
        if( !files || files.length === 0){
            return res.status(400).json({
                message: 'Files Not Exist'
            })
        }

        res.json({files});
    })
  }


