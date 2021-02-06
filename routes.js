//set an app
const express = require('express');
const router = express.Router();

const { storeById, isAuth, create, read, search, update, remove , retrieve} = require('./controller');

// routes
router.get('/store/list',isAuth, read);
router.post('/store/add',isAuth , create);
router.put('/store/:storeId',isAuth, update);
router.delete('/store/:storeId',isAuth, remove);
router.get('/store/search', isAuth, search);
router.get('/store/retrieve/:storeId', isAuth, retrieve);

router.param('storeId', storeById);
//export router
module.exports = router;