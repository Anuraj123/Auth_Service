const { User } = require("../models/index");
class UserRepository {
  async create(data) {
    try {
      const response = await User.create(data);
      return response;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw { error };
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw { error };
    }
  }

  async getById(userId) {
    try {
      const response = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return response;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw { error };
    }
  }
  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.log("Something went wrong in Repository layer");
      throw { error };
    }
  }
}

module.exports = UserRepository;
