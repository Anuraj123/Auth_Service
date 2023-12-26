const express = require("express");
const app = express();
const apiRoutes=require('./routers/index')
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const prepareAndStartServer = () => {
  app.listen(PORT, () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", apiRoutes);

    console.log(`server started on Port ${PORT}`);
  });
};

prepareAndStartServer();
