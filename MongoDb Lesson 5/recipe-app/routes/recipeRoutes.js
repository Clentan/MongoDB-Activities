// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createRecipe, 
  getAllRecipes, 
  getRecipeById, 
  updateRecipe, 
  deleteRecipe 
} = require('../controllers/recipeController');
const { validateRecipeMiddleware } = require('../middleware/validationMiddleware');

// Create a new recipe
router.post('/', validateRecipeMiddleware, createRecipe);

// Get all recipes with pagination
router.get('/', getAllRecipes);

// Get a specific recipe by ID
router.get('/:id', getRecipeById);

// Update a recipe
router.put('/:id', validateRecipeMiddleware, updateRecipe);

// Delete a recipe
router.delete('/:id', deleteRecipe);

module.exports = router;