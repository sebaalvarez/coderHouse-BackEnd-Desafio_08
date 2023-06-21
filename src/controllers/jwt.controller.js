import userModel from "../services/dao/db/models/user.model.js";
import { generateJWToken, isValidPassword } from "../utils.js";

export async function ingreso(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    console.log("Usuario encontrado para login:");
    console.log(user);

    if (!user) {
      console.warn("User doesn't exists with username: " + email);
      return res.status(204).send({
        error: "Not found",
        message: "Usuario no encontrado con username: " + email,
      });
    }

    if (!isValidPassword) {
      console.warn("Invalid credentials for user: " + email);
      return res.status(401).send({
        status: "error",
        error: "El usuario y la contraseña no coinciden!",
      });
    }

    const tokenUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    };

    const access_token = generateJWToken(tokenUser);
    console.log(access_token);

    // Con Cookies
    res.cookie("jwtCookieToken", access_token, {
      maxAge: 60000,
      // httpOnly: false // expone la cookie
      httpOnly: true, // No expone la cookie
    });

    // res.send({ message: "login successful!!", jwt: access_token });
    res.send({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: "error", error: "Error interno de la applicacion." });
  }
}
