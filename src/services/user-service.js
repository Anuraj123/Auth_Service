const { UserRepository } = require("../repository/index");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const response = await this.userRepository.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong in service layer");
      throw { error };
    }
  }

  async signIn(email, plainPassword) {
    try {
      const user = await this.userRepository.getByEmail(email);
      const passwordMatch = this.checkPassword(plainPassword, user.password);

      if (!passwordMatch) {
        console.log("Password dosen't match");
        throw { error: "Incorrect Password" };
      }
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      console.log("Something went wrong in the sign in process");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("Something went wrong in token creation", error);
      throw { error };
    }
  }

  verifyToken(token) {
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw { error };
    }
  }
  checkPassword(userInputPassword, encyriptedPassword) {
    try {
      return bcrypt.compareSync(userInputPassword, encyriptedPassword);
    } catch (error) {
      console.log("Something went wrong in password comparison", error);
      throw error;
    }
  }
  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: "Invalid Token" };
      }
      const user = this.userRepository.getById(response.id);
      if (!user) {
        throw { error: "No user with the corrosponding token exist" };
      }
      return user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }
}
module.exports = UserService;
