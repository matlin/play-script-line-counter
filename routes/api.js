const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();

/* CONSTANTS */
const NODE_ENV = process.env.NODE_ENV;
const DOMAIN = process.env.DOMAIN | "";
const CORS_OPTIONS = {
  origin: (NODE_ENV === "development" ? "localhost" : DOMAIN),
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* MIDDLEWARE */
//use concise color coded logs for development else use Standard Apache
router.use(logger(NODE_ENV === "development" ? "dev" : "common"));
router.use(cors(CORS_OPTIONS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ROUTES */
router.use((req, res, next) => {

});

router.get('/', (req, res) => {
  res.send({'message'})
})

router.get('/analyze/:url', (req, res, next) => {
  //hash url -> check hash -> respond from cache OR -> download -> analyze
});
