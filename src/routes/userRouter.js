const { Router } = require('express');

const SessionController = require('../app/controllers/SessionController');
const MeController = require('../app/controllers/MeController');
const PasswordUpdateController = require('../app/controllers/PasswordUpdateController');

const AuthMiddleware = require('../app/middlewares/authMiddleware');

const router = Router();

router.post('/login', SessionController.store);

router.post('/signup', MeController.store);

router.use(AuthMiddleware.protect);

router.patch('/updateMyPassowrd', PasswordUpdateController.update);

router.get('/me', MeController.show);
router.patch('/me', MeController.update);

module.exports = router;
