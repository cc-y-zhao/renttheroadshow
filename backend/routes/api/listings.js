const express = require("express");
const asyncHandler = require("express-async-handler");

const { Car } = require('../../db/models');
const listingValidations = require('../../validations/cars');

const router = express.Router();

router.get(
  '/:userId',
  asyncHandler(async function (req, res) {
    const listings = await Car.findAll({
      where: {
        ownerId: req.params.userId
      }
    });

    return res.json(listings);
  })
);

router.put(
  '/:userId/:carId',
  listingValidations.validateUpdate,
  asyncHandler(async function (req, res) {
    const listing = await Car.update(req.body, {
      where: {
        id: req.params.carId,
        ownerId: req.params.userId
      }
    });
    return res.json(listing);
  })
);

router.delete('/:userId/:carId', asyncHandler(async function (req, res) {
  const listing = await Car.findByPk(req.params.carId);
  const deletedListing = await listing.destroy();

  return res.json(deletedListing);
}));


module.exports = router;
