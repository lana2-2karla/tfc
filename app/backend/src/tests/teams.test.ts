import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida rota teams', () => {

  let chaiHttpResponse : Response;

  it('retorna todos os times e o status 200', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
    
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
  });
});
