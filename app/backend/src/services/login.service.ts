/* eslint-disable class-methods-use-this */
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
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
    const { password, id, role, email } = user;
    const passwordHash = await bcrypt.compare(userData.password, password);
    if (!passwordHash) throw new HttpException(401, 'Incorrect email or password');
    const newToken = new TokenGenerate();
    const token = await newToken.generateJwtToken({ id, role, email });
    return { token };
  }

  public async roleUser(token?: string): Promise<Pick<User, 'role'>> {
    if (!token) throw new HttpException(404, 'User not found');
    const userToken = new TokenGenerate();
    const { role } = await userToken.authenticateToken(token) as JwtPayload;
    return { role };
  }
}

export default UserTokenService;

// ref bcrypt - https://www.npmjs.com/package/bcrypt
