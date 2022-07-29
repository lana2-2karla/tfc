import { SignOptions, sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
// import { Ilogin } from '../interfaces/interface';
import HttpException from './http.exception';

const SECRET = process.env.JWT_SECRET || '';

const jwtDefaultConfig: SignOptions = {
  algorithm: 'HS256',
};

class TokenGenerate {
  constructor(private jwtConfig?: SignOptions) {
    if (!jwtConfig) this.jwtConfig = jwtDefaultConfig;
    else this.jwtConfig = jwtConfig;
  }

  public generateJwtToken(payload: string) {
    return sign(payload, SECRET, this.jwtConfig);
  }

  public async authenticateToken(token: string) {
    if (!token) throw new HttpException(401, 'undefined token');
    try {
      const introspection = await verify(token, SECRET, this.jwtConfig);
      return introspection;
    } catch (error) {
      throw new HttpException(401, 'invalid token');
    }
  }
}

export default TokenGenerate;
