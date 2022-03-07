const express = require("express");
const asyncHandler = require("express-async-handler");

const { Car } = require('../../db/models');

const carValidations = require('../../validations/cars');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async function (_req, res) {
    const cars = await Car.findAll();
    return res.json(cars);
  })
);

router.post(
  '/',
  carValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const id = await PokemonRepository.create(req.body);
    return res.redirect(`${req.baseUrl}/${id}`);
  })
);





module.exports = router;
