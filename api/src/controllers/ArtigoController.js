import ArtigoModel from '../models/ArtigoModel';

class LivroController {
  async store(req, res) {
    try {
      const dadosArtigo = req.body;
      dadosArtigo.id_usuario = req.idUsuario;
      const artigoCriado = await ArtigoModel.criaArtigo(dadosArtigo);
      return res.json(artigoCriado);
    } catch (e) {
      trataErro(e);
    }
  }

  async update(req, res) {
    try {
      const idArtigo = req.params.id;

      if(!idArtigo) {
        return res.status(400).json({
            erros: ['Faltando ID...'],
          });
      }

      const artigo = await ArtigoModel.localizaArtigo(idArtigo);

      if(!artigo) {
        return res.status(400).json({
          erros: ['Artigo não encontrado...'],
        });
      }

      const artigoAtualizado = await ArtigoModel.atualizaArtigo(artigo, req.body);

      return res.json(artigoAtualizado);
    } catch (e) {
      return res.status(400)
        .json({
          erros: e.errors?.map((erro) => erro.message),
        })
    }
  }

  async delete(req, res) {
    try {
      const idArtigo = req.params.id;

      if(!idArtigo) {
        return res.status(400).json({
          erros: ['Faltando ID...'],
        });
      }

      const artigo = await ArtigoModel.localizaArtigo(idArtigo);

      if(!artigo) {
        return res.status(400).json({
          erros: ['Artigo não encontrado...'],
        });
      }

      await ArtigoModel.deletaArtigo(artigo);

      return res.json(null);
    } catch (e) {
      return res.status(400)
        .json({
          erros: e.errors?.map((erro) => erro.message),
        });
    }
  }

  async index(req, res) {
    const artigosEncontrados = await ArtigoModel.buscaArtigosUsuario(req.idUsuario);
    return res.json(artigosEncontrados);
  }

  async show(req, res) {
    try {
      const idArtigo = req.params.id;

      if(!idArtigo) {
        return res.status(400).json({
          erros: ['Faltando ID...']
        });
      }

      const artigo = await ArtigoModel.localizaArtigo(idArtigo);

      if(!artigo) {
        return res.status(400).json({
          erros: ['Artigo não encontrado...']
        });
      }

      return res.json(artigo);
    } catch (e) {
      return res.status(400)
      .json({
        erros: e.errors?.map((erro) => erro.message),
      });
    }

  }
}

export default new LivroController();
