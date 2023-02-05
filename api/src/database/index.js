import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import UsuarioModel from '../models/UsuarioModel';
import LivroModel from '../models/LivroModel';
import ArtigoModel from '../models/ArtigoModel';

const models = [UsuarioModel, LivroModel, ArtigoModel];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
