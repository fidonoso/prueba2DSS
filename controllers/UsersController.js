const connection = require("../config/db");
const utils = require("../resources/utils");
//const avatar = require('../resources/img/avatar')

const testMysql = (request, response) => {
  connection.query("SELECT * FROM users", function (err, results, fields) {
    response.json(results[1]);
  });
};
const createUser = (request, response) => {
  const req = utils.limpiador(request.body);
  console.log(req);
  if (utils.compararObjetos(req, request.body)) {
    let consulta =
      "insert into users(name, lastname, password) values ( ?, ?, ?)";
    let values = [req.name, req.lastname, utils.btoa(req.password)];

    connection.query(consulta, values, function (err, results, fields) {
      if (err) {
        response.json({
          message: "Ha ocurrido un error en la insercion " + err,
        });
      } else {
        console.log(`Registros insertados: ${results.affectedRows}`);
        response.json({ message: "Correcto!" });
      }
    });
  } else {
    response.json({
      message:
        "Se detectó un intento de injección de código. No se alteró la base de datos",
    });
  }
};
const getUserById = (request, response) => {
  let consulta = "SELECT * FROM users where id =?";
  let values = [request.body.id];
  connection.query(consulta, values, function (err, results, fields) {
    response.json(results);
  });
};
const setLogin = (request, response) => {
//   const usuario = utils.limpiarRequest(request.body);
  const req = utils.limpiador(request.body);
  let consulta = "SELECT * FROM users where name = ? and password = ?";
  let values = [req.usuario, utils.btoa(req.password)];
  connection.query(consulta, values, function (err, userResult, fields) {
    console.log(userResult);
    if (userResult.length > 0) {
      const user = userResult[0];
      response.json({
        message: "Login Exitoso",
        state: true,
        user_id: userResult[0].id,
      });
    } else {
      response.json({ message: "Login Fallido", state: false });
    }
  });
};
const getAvatar = (request, response) => {
  // response.render(avatar)
};
module.exports = { testMysql, createUser, getUserById, setLogin, getAvatar };
