import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';
import UsuarioModel from '../models/UsuarioModel';

const models = [UsuarioModel];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
