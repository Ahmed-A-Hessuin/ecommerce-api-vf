const express = require('express');

const {
    createSubCategory,
    getSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObj
} = require('../services/subCategoryService');

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidater');

// mergeParams : allow as to access parameters on other routers
// ex : we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .post(setCategoryIdToBody,createSubCategoryValidator, createSubCategory)
    .get(createFilterObj,getSubCategories);

router
    .route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);


module.exports = router;