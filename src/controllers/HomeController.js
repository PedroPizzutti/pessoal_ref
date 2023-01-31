class HomeController {
  async index(req, res) {
    res.json('Api no ar!');
  }
}

export default new HomeController();
