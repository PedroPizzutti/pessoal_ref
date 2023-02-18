"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _LivroController = require('../controllers/LivroController'); var _LivroController2 = _interopRequireDefault(_LivroController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _LivroController2.default.store);
router.put('/:id', _loginRequired2.default, _LivroController2.default.update);
router.delete('/:id', _loginRequired2.default, _LivroController2.default.delete);
router.get('/', _loginRequired2.default, _LivroController2.default.index);
router.get('/details/:id', _loginRequired2.default, _LivroController2.default.show);
router.get('/search', _loginRequired2.default, _LivroController2.default.filter);

exports. default = router;
