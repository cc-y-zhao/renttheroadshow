const express = require("express");
const asyncHandler = require("express-async-handler");

const { Car } = require('../../db/models');

const router = express.Router();

router.get(
  '/:userId',
  asyncHandler(async function (_req, res) {
    const listings = await Car.findAll({
      where: {
        ownerId: req.params.userId
      }
    });
    console.log("user's listings----------", listings);
    return res.json(listings);
  })
);

// router.post(
//   '/',
//   carValidations.validateCreate,
//   asyncHandler(async function (req, res) {
//     const id = await Car.create(req.body);
//     return res.redirect(`${req.baseUrl}/${id}`);
//   })
// );






module.exports = router;
