//saving image to mysql 

const fs = require("fs");

const db = require("../models");
const Image = db.image;

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __dirname+ "../config/middlewareconfig/middleware/static/images" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __dirname + "../config/middlewareconfig/middleware/static/images/tmp" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles,
};