class HomeController {
  async index(req, res) {
    res.json('Api rodando sem erros...');
  }
}

export default new HomeController();
