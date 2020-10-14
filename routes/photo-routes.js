const express = require("express");
const router = express.Router();
const homeController = require("../config/controllers/home");
const uploadController = require("../config/controllers/upload");
const upload = require("../config/middleware/upload");


let routes = (app) => {
  router.get("/image", homeController.getHome);

  router.post("/upload", upload.single("file"), uploadController.uploadFiles);

  return app.use("/image", router);
};

module.exports = routes;