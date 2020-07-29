const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
  const candidate = await Organization.findOne({
    email: req.body.email
  });

  if (candidate) {
    //Проверка пароля
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      //Генерация токена
      const token = jwt.sign({
        email: candidate.email,
        organizationId: candidate._id
      }, keys.jwt, {
        expiresIn: 60 * 60
      });

      res.status(200).json({
        token: `Bearer ${token}`
      });

    } else {
      res.status(401).json({
        message: 'Пароли не совпадают.'
      });
    }
  } else {
    res.status(404).json({
      message: 'Организация с таким email не найдена'
    });
  }
}

module.exports.register = async function (req, res) {
  const candidate = await Organization.findOne({
    email: req.body.email,
  });
  hashPassword = bcrypt.hashSync(req.body.password, 10);
  if (candidate) {
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    });
  } else {
    //Создание организации
    const oraganization = new Organization({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });
    try {
      await oraganization.save();
      res.status(200).json(oraganization);
    } catch (e) {
      errorHandler(res, e);
    }
  }
}