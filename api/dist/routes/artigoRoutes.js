"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ArtigoController = require('../controllers/ArtigoController'); var _ArtigoController2 = _interopRequireDefault(_ArtigoController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _ArtigoController2.default.store);
router.put('/:id', _loginRequired2.default, _ArtigoController2.default.update);
router.delete('/:id', _loginRequired2.default, _ArtigoController2.default.delete);
router.get('/', _loginRequired2.default, _ArtigoController2.default.index);
router.get('/details/:id', _loginRequired2.default, _ArtigoController2.default.show);
router.get('/search', _loginRequired2.default, _ArtigoController2.default.filter);

exports. default = router;
