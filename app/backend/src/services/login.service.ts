/* eslint-disable class-methods-use-this */
import * as bcrypt from 'bcryptjs';
import { Ilogin, Itoken } from '../interfaces/interface';
import User from '../database/models/user';
import TokenGenerate from '../utils/jwtToken';
import HttpException from '../utils/http.exception';

class UserTokenService {
  public async authLogin(userData: Ilogin): Promise<Itoken> {
    const user = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (!user) throw new HttpException(401, 'Incorrect email or password');
    const { password, email } = user;
    const passwordHash = await bcrypt.compare(userData.password, password);
    if (!passwordHash) throw new HttpException(401, 'Incorrect email or password');
    const newToken = new TokenGenerate();
    const token = newToken.generateJwtToken(email);
    return { token };
  }
}

export default UserTokenService;

// ref bcrypt - https://www.npmjs.com/package/bcrypt
