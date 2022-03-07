const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const description = check('description')
  .notEmpty()
  .withMessage('Please tell us a little bit about your car')
const brand = check('brand')
  .notEmpty()
  .withMessage('Please provide the make (brand) of your car')
  .isLength({ min: 3, max: 50 })
  .withMessage('The make of your car must be between 3 and 50 characters long')
const model = check('model')
  .notEmpty()
  .withMessage('Please provide the model of your car')
const imageURL = check('imageURL')
  .notEmpty()
  .withMessage('Please provide an image URL for your car')
  .isURL({ require_protocol: false, require_host: false });
const price = check('price')
  .notEmpty()
  .withMessage('Please provide the rental price of your car')
  .isInt({ min: 15 })
  .withMessage('Rental price must be at least $15')
const city = check('city')
  .notEmpty()
  .withMessage('Please provide the city where your car is located');
const state = check('state')
  .notEmpty()
  .withMessage('Please provide the state where your car is located');

exports.validateCreate = [
  description,
  brand,
  model,
  imageURL,
  price,
  city,
  state,
  handleValidationErrors
];

exports.validateUpdate = [
  description,
  brand,
  model,
  imageURL,
  price,
  city,
  state,
  handleValidationErrors
];
