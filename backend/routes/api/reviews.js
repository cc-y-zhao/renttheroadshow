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
);


router.get(
  '/cars/:carId',
  asyncHandler(async function (req, res) {

    const carId = parseInt(req.params.carId, 10);

    const reviews = await Review.findAll({
      where: {
        carId: req.params.carId
      }
    });

    return res.json(reviews);
  })
);

router.get(
  '/users/:userId',
  asyncHandler(async function (req, res) {

    const userId = parseInt(req.params.userId, 10);

    const reviews = await Review.findAll({
      where: {
        userId: req.params.userId
      }
    });

    return res.json(reviews);
  })
);

router.delete('/:userId/:reviewId', asyncHandler(async function (req, res) {

  const reviewId = parseInt(req.params.reviewId, 10);
  const userId = parseInt(req.params.userId, 10);

  const review = await Review.findByPk(reviewId);

  await review.destroy();

  return res.json({ reviewId });
}));

router.put(
  '/:reviewId',
  reviewValidations.validateUpdate,
  asyncHandler(async function (req, res) {
    const {
      reviewId,
      userId,
      carId,
      rating,
      content
      } = req.body;
    const oldReview = await Review.findByPk(reviewId);

    oldReview.rating = rating;
    oldReview.content = content;

    await oldReview.save();

    return res.json(oldReview);

    // const updatedReview = await Review.update(req.body, {
    //   where: {
    //     id: req.params.reviewId
    //   }
    // });
    // return res.json(updatedReview);
  })
);


module.exports = router;
