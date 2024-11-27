// models/Recipe.js
const mongoose = require('mongoose');
const Joi = require('joi');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  ingredients: [{
    type: String,
    trim: true,
    required: [true, 'Ingredient cannot be empty']
  }],
  instructions: [{
    type: String,
    trim: true,
    required: [true, 'Instruction cannot be empty']
  }],
  prepTime: {
    type: Number,
    min: 0,
    max: 1440 // Maximum prep time of 24 hours
  },
  cookTime: {
    type: Number,
    min: 0,
    max: 1440 // Maximum cook time of 24 hours
  },
  servings: {
    type: Number,
    min: 1,
    max: 20
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Joi validation schema
const recipeValidationSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required(),
  description: Joi.string()
    .max(500)
    .optional(),
  ingredients: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .required(),
  instructions: Joi.array()
    .items(Joi.string().trim())
    .min(1)
    .required(),
  prepTime: Joi.number()
    .min(0)
    .max(1440)
    .optional(),
  cookTime: Joi.number()
    .min(0)
    .max(1440)
    .optional(),
  servings: Joi.number()
    .min(1)
    .max(20)
    .optional(),
  difficulty: Joi.string()
    .valid('Easy', 'Medium', 'Hard')
    .optional(),
  tags: Joi.array()
    .items(Joi.string().trim())
    .optional()
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {
  Recipe,
  validateRecipe: (recipe) => recipeValidationSchema.validate(recipe)
};