import House from '../models/House';

class DashboardController {
  async show(req, res) {
    const { user_id } = req.headers;
    console.log(user_id);
    const houses = await House.find({ user: user_id });
    res.json(houses);
  }
}

export default new DashboardController();
