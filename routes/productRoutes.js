const express = require('express');
const upload = require('../middlewares/multer');
const { isAdmin, AuthenticatorJWT } = require('../middlewares/authenticator');
const { getProductById, updateProduct, deleteProduct, getRelatedProducts, uploadProduct, getLimitedProducts, getLimitedProductsByCat, getAllProducts, getAllSellerProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/get', getAllProducts);
router.get('/seller', AuthenticatorJWT, getAllSellerProducts);
router.get('/get/:page', getLimitedProducts);
router.get('/product/:id', getProductById);
router.post('/cat/:id', getLimitedProductsByCat);
router.post('/create', upload.single('file'), AuthenticatorJWT, isAdmin, uploadProduct);
router.post('/update/:id', upload.single('file'), AuthenticatorJWT, isAdmin, updateProduct);
router.get('/get/related/:id', getRelatedProducts);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteProduct);

module.exports = router;