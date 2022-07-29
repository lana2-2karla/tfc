/* eslint-disable class-methods-use-this */
import { Ilogin } from '../interfaces/interface';
import User from '../database/models/user';
import TokenGenerate from '../utils/jwtToken';

class UserTokenService {
  public async authLogin(userData: Ilogin) {
    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: userData.email,
      },
    });

    if (user === null) throw new Error('invalid user');
    const newToken = new TokenGenerate();
    const token = newToken.generateJwtToken(user.email);
    return { token };
  }
}

export default UserTokenService;
