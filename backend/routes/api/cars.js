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
    const car = await Car.create(req.body);

    return res.json(car);
    // return res.redirect(`${req.baseUrl}/${car.id}`);
  })
);

router.get(
  '/:carId',
  asyncHandler(async function (req, res) {
    const id = parseInt(req.params.carId, 10);

    const car = await Car.findByPk(id)

    return res.json(car);
  })
)






module.exports = router;
