//Validation Middleware

// middleware/validationMiddleware.js
const validateRecipeMiddleware = (req, res, next) => {
  const { error } = require('../models/Recipe').validateRecipe(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

module.exports = { validateRecipeMiddleware };