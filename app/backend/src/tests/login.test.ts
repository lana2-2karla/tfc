import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida o login do usuário', () => {

  let chaiHttpResponse : Response;

  it('retorna o token e o status com o código 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
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
      email: 'admin@admin.com',
    });

    expect(chaiHttpResponse).to.have.status(400);
    expect(chaiHttpResponse.body).to.have.property('message').equal('All fields must be filled') 
  });

  it('valida que retorna um erro se o email estiver incorreto', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.co',
      password: 'secret_admin',
    })
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message').equal('Incorrect email or password') 
  });

  it('valida que retorna um erro se a senha estiver incorreto', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admi',
    })
    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body).to.have.property('message').equal('Incorrect email or password') 
  });
});
