"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _UsuarioModel = require('../models/UsuarioModel'); var _UsuarioModel2 = _interopRequireDefault(_UsuarioModel);
var _LivroModel = require('../models/LivroModel'); var _LivroModel2 = _interopRequireDefault(_LivroModel);
var _ArtigoModel = require('../models/ArtigoModel'); var _ArtigoModel2 = _interopRequireDefault(_ArtigoModel);

const models = [_UsuarioModel2.default, _LivroModel2.default, _ArtigoModel2.default];

const connection = new (0, _sequelize.Sequelize)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
