const AuthorModel = require("../models/AuthorModel")
const jwt = require("jsonwebtoken");



//=======================================(API 1)======================================


const createAuthor = async function (req, res) {
  try {
    let data = req.body;
    let savedData = await AuthorModel.create(data);
    return res.status(201).send({status: true, data: savedData })
  }
  catch (error) {
    console.log("This is the error :", error.message)
    return res.status(500).send({ msg: "Error", error: error.message })
  }
};



//=======================================(API 2.1)====================================


const loginAuthor = async function (req, res) {
  try{
  let email = req.body.email;
  let password = req.body.password;

  let Author = await AuthorModel.findOne({ email: email, password: password });
  if (!Author) return res.status(400).send({ status: false, msg: "Email-Id or the password is not exist" });

  let token = jwt.sign(
    {
      AuthorId: Author._id.toString(),
      batch: "Radon",
      organisation: "FunctionUp",
    },
    "functionup-project-1"
  );
  res.setHeader("x-api-key", token);
  return res.status(201).send({ status: true, data: "User login has a correct successful response", token: token });
  }
  catch (error) {
    console.log("This is the error :", error.message)
    return res.status(500).send({ msg: "Error", error: error.message })
}
};






module.exports.createAuthor = createAuthor
module.exports.loginAuthor = loginAuthor
