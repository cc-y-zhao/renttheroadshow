const express = require("express");
const asyncHandler = require("express-async-handler");

const { Review } = require('../../db/models');
const reviewValidations = require('../../validations/reviews');

const router = express.Router();

router.post(
  '/',
  reviewValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const review = await Review.create(req.body);

    return res.json(review);
  })
)

// router.get(
//   '/:userId',
//   asyncHandler(async function (req, res) {
//     const listings = await Car.findAll({
//       where: {
//         ownerId: req.params.userId
//       }
//     });

//     return res.json(listings);
//   })
// );

// router.put(
//   '/:userId/:carId',
//   listingValidations.validateUpdate,
//   asyncHandler(async function (req, res) {
//     const listing = await Car.update(req.body, {
//       where: {
//         id: req.params.carId,
//         ownerId: req.params.userId
//       }
//     });
//     return res.json(listing);
//   })
// );

// router.delete('/:ownerId/:carId', asyncHandler(async function (req, res) {

//   const carId = parseInt(req.params.carId, 10);
//   const ownerId = parseInt(req.params.ownerId, 10);

//   console.log("carId--------------------------", carId);

//   const listing = await Car.findByPk(carId);
//   const reviews = await Review.findAll({
//     where: { carId }
//   });

//   console.log("reviews----------------", reviews);

//   if (reviews.length > 0) {
//     // reviews.forEach((review) => {
//     //   await review.destroy()
//     // })
//     await Review.destroy({
//       where: { carId }
//     })
//     // await reviews.destroy();
//     await listing.destroy();
//   } else {
//     console.log('IM IN HERE--------------')
//     await listing.destroy();
//   }


//   return res.json({ ownerId, carId });
// }));


module.exports = router;
