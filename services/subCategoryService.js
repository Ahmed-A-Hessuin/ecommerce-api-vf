const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')

const SubCategory = require('../models/subCategoryModel');

// @desc    Create CategorySubCategory
// @route   POST /api/v1/subcategories
// @access  Private

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId
  next()
}

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  })
  res.status(201).json({ data: subCategory })
})

exports.createFilterObj = (req, res, next) => {
  let filterObject = {}
  if (req.params.categoryId) filterObject = { category: req.params.categoryId }
  req.filterObj = filterObject
  next()
}

// @desc    Get list of subCategories
// @route   GET /api/v1/subcategories
// @access  Public

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip).limit(limit);
  res.status(200).json({ results: subCategories.length, page, data: subCategories })
});

// @desc    Get Specific subCategory by id 
// @route   GET /api/v1/subcategories/:id
// @access  Public

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404))
  }
  res.status(200).json({ data: subCategory })
});

// @desc    Update Specific Subcategory by id 
// @route   PUT /api/v1/subcategories/:id
// @access  Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { name, category } = req.body
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true });
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404))
  }
  res.status(200).json({ data: subCategory })
});

// @desc    Delete Specific Subcategory by id 
// @route   Delete /api/v1/subcategories/:id
// @access  Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404))
  }
  res.status(204).send();
});

