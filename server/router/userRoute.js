const router = require('express').Router();
const {login, register} = require('../controller/userController');
const auth = require('../middleware/auth');
const {admin,supperadmin} = require('../middleware/admin');

router.post('/login',login);

router.post('/register',register);

router.post('/recoverypassword',auth,admin,(req, res) =>{
    res.json({
        message:'Hello this is recoveryPassword'
    })
});


module.exports = router;