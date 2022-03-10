const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');


const content = check('content')
  .notEmpty()
  .withMessage('Review cannot be empty')
  .isLength({ min: 9})
  .withMessage('Please tell us a bit more about your experience')
const rating = check('rating')
  .notEmpty()
  .withMessage('Rating cannot be empty')
  .isInt({ min: 1, max: 5 })
  .withMessage('Please submit a rating between 1 and 5')

exports.validateCreate = [
  content,
  rating,
  handleValidationErrors
];

exports.validateUpdate = [
  content,
  rating,
  handleValidationErrors
];
