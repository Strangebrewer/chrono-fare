import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
class User {
  constructor(model, sign) {
    if (!model || typeof model !== 'function')
      throw new Error('A valid model must be given to use this class');
      this.User_Model = model;
      this.sign = sign;
  }

  async find(query = {}, populate = []) {
    if (typeof populate == 'string') populate.split(',');
    return await this.Schema.find(query).populate(populate);
  }

  async findWithProjects(id) {
    const response = await this.Schema.findById(id).populate('projects');
    const { _id, email, project_order, projects, url, username } = response;
    return { _id, email, project_order: JSON.parse(project_order), projects, url, username }
  }

  async setProjectOrder(_id, order) {
    try {
      const project_order = JSON.stringify(order);
      const user = await this.Schema.findOneAndUpdate({ _id }, { project_order });
      console.log("User returned: ", user);
      return ({ msg: 'success!' })
    } catch (e) {
      return ({ msg: 'error: ' + e.message });
    }
  }

  async getPublicWorks(req_params) {
    const url = req_params.username.toLowerCase();
    const user = await this.Schema.findOne({ url })
      .populate({
        path: 'projects',
        match: { "published.0": { "$exists": true } },
        populate: { path: 'published', populate: { path: 'texts' } }
      })
    return user;
  }

  async validateInputs(username, email) {
    let emailTest;
    email !== undefined
      ? emailTest = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
      : emailTest = true;

    let userTest;
    username !== undefined
      ? userTest = /^[a-zA-Z0-9]+$/.test(username)
      : userTest = true;

    if (!userTest && !emailTest) {
      return {
        valid: false,
        msg: 'username & email invalid'
      }
    }
    if (!emailTest) {
      return {
        valid: false,
        msg: 'email invalid'
      }
    }
    if (!userTest) {
      return {
        valid: false,
        msg: 'username invalid'
      }
    }
    return { valid: true };
  }

  async checkUserAvailable(username, email) {
    const user = await this.Schema.findOne({ username })
    if (user) {
      return {
        valid: false,
        msg: 'username taken'
      }
    }
    const nextUser = await this.Schema.findOne({ email });
    if (nextUser) {
      return {
        valid: false,
        msg: 'email taken'
      }
    }
    return { valid: true };
  }

  async createNewUser(req_body) {
    const { username, email } = req_body;
    const inputs = await this.validateInputs(username, email);
    if (!inputs.valid) return inputs;
    const avail = await this.checkUserAvailable(username, email);
    if (!avail.valid) return avail;

    const password = this.hashPassword(req_body.password);
    req_body.password = password;
    req_body.url = req_body.username.toLowerCase();
    const user = await this.Schema.create(req_body);
    const { _id, order, projects, url } = user;
    const token = this.sign({
      id: _id,
      username,
    });
    const userData = { _id, email, order, projects, url, username }
    return { msg: "logged in", token, user: userData };
  }

  async updateUser(req_body, req_user) {
    const { username, email } = req_body;
    const inputs = await this.validateInputs(username, email);
    if (!inputs.valid) return inputs;
    const avail = await this.checkUserAvailable(username, email);
    if (!avail.valid) return avail;
    const res = await this.Schema.findOneAndUpdate({ _id: req_user._id }, req_body);
    const { _id, order, projects } = res;
    const token = this.sign({
      id: _id,
      username,
    });
    const user = { _id, email, order, projects, username }
    return { msg: "update successful", token, user };
  }

  async login(req_body) {
    const { username, password } = req_body;
    const res = await this.Schema.findOne({ username })
      .populate('projects');
    const passwordValid = this.checkPassword(password, res.password);
    if (passwordValid) {
      const { _id, email, order, projects, project_order, url } = res;
      const token = this.sign({
        id: _id,
        username,
      });
      const user = { _id, email, order, projects, project_order: JSON.parse(project_order), url, username }
      return { msg: "logged in", token, user };
    }
  }

  async updatePassword(req_body, req_user) {
    const { _id, password } = req_user;
    const { currentPassword, newPassword } = req_body;
    const passwordValid = this.checkPassword(currentPassword, password);
    if (passwordValid) {
      const pw = hashPassword(newPassword);
      const res = await this.Schema.findOneAndUpdate({ _id }, { password: pw });
      const { email, order, projects, username } = res;
      const token = this.sign({
        id: _id,
        username,
      });
      const user = { _id, email, order, projects, username }
      return { msg: "password changed", token, user };
    }
  }

  checkPassword(inputPassword, password) {
    return compareSync(inputPassword, password);
  }

  hashPassword(plainTextPassword) {
    return hashSync(plainTextPassword, genSaltSync(10), null);
  }

}

export default User;