const express = require("express");
const asyncHandler = require("express-async-handler");

const { Car, Review } = require('../../db/models');
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
    console.log("listing from routes-------", listing); // listing = [1]
    return res.json(listing);
  })
);

router.delete('/:ownerId/:carId', asyncHandler(async function (req, res) {

  const carId = parseInt(req.params.carId, 10);
  const ownerId = parseInt(req.params.ownerId, 10);

  console.log("carId--------------------------", carId);

  const listing = await Car.findByPk(carId);
  const reviews = await Review.findAll({
    where: {carId}
  });

  console.log("reviews----------------", reviews);

  if (reviews.length > 0) {
    // reviews.forEach((review) => {
    //   await review.destroy()
    // })
    await Review.destroy({
      where: {carId}
    })
    // await reviews.destroy();
    await listing.destroy();
  } else {
    console.log('IM IN HERE--------------')
    await listing.destroy();
  }


  return res.json({ownerId, carId});
}));


module.exports = router;
