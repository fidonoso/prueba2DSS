const utils = require("../resources/utils");
const moment = require("moment");
const connection = require("../config/db");

const userPost = (request, response) => {
  const req = utils.limpiador(request.body);
  if (utils.compararObjetos(req, request.body)) {
  let consulta ="SELECT *,date_format(date,'%d/%m/%Y %h:%i:%s') as fixed_date FROM users join posts on (users.id = posts.user_id) where users.id = ?";
  let values = [req.user_id];
  connection.query(consulta, values, function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    response.json(result);
  });
}else {
  response.json({
    message:
      "Se detectó un intento de injección de código.",
  });
}
};
const postComment = (request, response) => {
  const req = utils.limpiador(request.body);
  if (utils.compararObjetos(req, request.body)) {
    let consulta ="INSERT INTO posts (user_id,title,content, date) VALUES(?, ?, ?, current_timestamp());";
    let values = [req.user_id, req.title, req.content];
    connection.query(consulta, values, function (err) {
      if (err) {
        message = err;
        response.json({ state: false, message });
      } else {
        response.json({ state: true, message: "Se insertó el comentario" });
      }
    });
  } else {
    response.json({
      message:
        "Se detectó un intento de injección de código. No se alteró la base de datos",
    });
  }
};

module.exports = {
  userPost,
  postComment,
};
