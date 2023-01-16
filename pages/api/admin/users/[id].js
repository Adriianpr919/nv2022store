import User from '../../../../models/User';
import db from '../../../../utils/db';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('Se Requiere Inicio De Sesión De Administrador.');
  }

  if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Método NO Permitido.' });
  }
};

const deleteHandler = async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    if (user.email === 'admin123@example.com') {
      return res.status(400).send({ message: 'NO Se Puede Eliminar El Administrador.' });
    }
    await user.remove();
    await db.disconnect();
    res.send({ message: 'Usuario Eliminado.' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Usuario NO Encontrado.' });
  }
};

export default handler;