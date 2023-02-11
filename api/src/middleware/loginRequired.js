import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      erros: ['É preciso estar logado!'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dadosToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dadosToken;

    req.idUsuario = id;
    req.emailUsuario = email;

    return next();
  } catch (e) {
    return res.status(401).json({
      erros: ['Token expirado ou inválido'],
    });
  }
};
