import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida o login do usuário', () => {

  let chaiHttpResponse : Response;

  before(async () => {

    const resultExecute = {
      id: 1,
      userName: 'Example A',
      role: 'Example role',
      email: 'example@gmail.com',
      password: '1234',
    }

    sinon
      .stub(User, "findOne")
      .resolves(resultExecute as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('retorna o token e o status com o código 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'example@gmail.com',
      password: '1234'
    })

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('valida que o email é obrigatório', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({})

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message').equal('All fields must be filled') 
  });

  it('valida que a senha é obrigatória', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'example@gmail.com',
    })

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message').equal('All fields must be filled') 
  })

});
