import House from '../models/House';
import Reserve from '../models/Reserve';

class ReserveController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);

    if (!house) return res.json({ message: 'Casa não existe' });
    if (house.status !== true)
      return res.json({ message: 'Casa não disponível' });

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    if (String(user_id) === String(house.user))
      return res.json({ message: 'Ação não permitida' });

    await (await reserve.populate('house')).populate('user');

    return res.json(reserve);
  }

  async index(req, res) {
    const { user_id } = req.headers;
    const reserves = await Reserve.find({ user: user_id });

    res.json(reserves);
  }

  async destroy(req, res) {
    const { reserve_id } = req.body;
    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.json({ message: 'Excluida com sucesso!' });
  }
}

export default new ReserveController();
