const express = require("express");
const asyncHandler = require("express-async-handler");

const { Car } = require('../../db/models');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async function (_req, res) {
    const cars = await Car.findAll();
    return res.json(cars);
  })
)





module.exports = router;
