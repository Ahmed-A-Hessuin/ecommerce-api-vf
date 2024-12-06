const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')

const Category = require('../models/categoryModel');

// @desc    Create Category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name
  const category = await Category.create({ name, slug: slugify(name) })
  res.status(201).json({ data: category })
})

// @desc    Get list of Categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  page = req.query.page * 1 || 1;
  limit = req.query.limit * 1 || 5;
  skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories })
});

// @desc    Get Specific category by id 
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404))
  }
  res.status(200).json({ data: category })
});

// @desc    Update Specific category by id 
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res , next) => {
  const { id } = req.params
  const name = req.body.name
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true });
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404))
  }
  res.status(200).json({ data: category })
});

// @desc    Delete Specific category by id 
// @route   Delete /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No Category for this id ${id}`, 404))
  }
  res.status(204).send();
});

