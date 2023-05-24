const express = require('express');
const router = express.Router();
const { member } = require('../../controllers');

router.get('/', (req, res)=>{
    res.render('login');
});

router.post('/', member.create);

module.exports = router;