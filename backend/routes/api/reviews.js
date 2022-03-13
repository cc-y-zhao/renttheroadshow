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
    // console.log("HELLO FROM REVIEWS ROUTER-----------");

    const carId = parseInt(req.params.carId, 10);
    // console.log("carId-----------", carId);

    const reviews = await Review.findAll({
      where: {
        carId: req.params.carId
      }
    });
    // console.log("REVIEWS FROM REVIEWS ROUTER-------------", reviews);

    return res.json(reviews);
  })
);

router.get(
  '/users/:userId',
  asyncHandler(async function (req, res) {
    console.log("HELLO FROM REVIEWS ROUTER-----------");

    const userId = parseInt(req.params.userId, 10);
    console.log("userId FROM REVIEWS ROUTER-----------", userId);

    const reviews = await Review.findAll({
      where: {
        userId: req.params.userId
      }
    });
    console.log("REVIEWS FROM REVIEWS ROUTER-------------", reviews);

    return res.json(reviews);
  })
);

router.delete('/:userId/:reviewId', asyncHandler(async function (req, res) {

  const reviewId = parseInt(req.params.reviewId, 10);
  const userId = parseInt(req.params.userId, 10);

  console.log("reviewId--------------------------", reviewId);

  const review = await Review.findByPk(reviewId);

  console.log("FOUND REVIEW----------------", review);

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

    console.log("updated review from routes------------", oldReview);
    return res.json(oldReview);

    // const updatedReview = await Review.update(req.body, {
    //   where: {
    //     id: req.params.reviewId
    //   }
    // });
    // console.log("updated review from routes------------", updatedReview);
    // return res.json(updatedReview);
  })
);


module.exports = router;
