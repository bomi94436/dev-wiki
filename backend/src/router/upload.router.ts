import multer from 'multer'
import fs from 'fs'
import path from 'path'
import express from 'express'

import { CustomError } from 'global/utils'
import { checkIsLoggedInUser } from 'middleware/checkAuthentification'
import { STATIC_UPLOAD_FOLDER_PATH } from 'global/constant'

const uploadsFolder = path.join(__dirname, '..', '..', '..', 'uploads')

try {
  fs.accessSync(uploadsFolder)
} catch (error) {
  fs.mkdirSync(uploadsFolder)
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsFolder)
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + Date.now() + ext)
    },
  }),
  limits: { fileSize: 1024 * 1024 * 20 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(null, true)
    } else {
      cb(new CustomError(422, 'File upload is only possible in jpg, jpeg, png format.'))
    }
  },
})

const uploadRouter = express.Router()

uploadRouter.post('/', checkIsLoggedInUser, upload.single('image'), (req, res, next) => {
  if (req.file) {
    res.status(201).json({
      message: 'success upload file',
      file: {
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: `${req.protocol}://${req.headers.host}${STATIC_UPLOAD_FOLDER_PATH}/${req.file.filename}`,
      },
    })
  } else {
    res.status(400).json({
      message: 'fail upload file',
    })
  }
})

export default uploadRouter
