const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getSubCategoryValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid SubCategory id format')
        .notEmpty()
        .withMessage('subcategory required'),
    validatorMiddleware,
];

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('SubCategory required')
        .isLength({ min: 2 })
        .withMessage('Too short subcategory name')
        .isLength({ max: 32 })
        .withMessage('Too long subcategory name'),
    check('category')
        .notEmpty()
        .withMessage('subcategory must be blong to category')
        .isMongoId()
        .withMessage('Invalid subcategory id format'),
    validatorMiddleware,
];

exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Subcategory id format'),
    validatorMiddleware,
];