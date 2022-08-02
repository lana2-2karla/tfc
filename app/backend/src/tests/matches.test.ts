import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Valida rota matches', () => {

  let chaiHttpResponse : Response;

  it("valida que se inProgress for 'false' retorna as partidas filtradas e o status 200", async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    
    const chaiLength = chaiHttpResponse.body.length;
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0].inProgress).to.be.false;
    expect(chaiHttpResponse.body[chaiLength -1].inProgress).to.be.false;
  });

  it("valida que se inProgress for 'true' retorna as partidas filtradas e o status 200", async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    const chaiLength = chaiHttpResponse.body.length;
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0].inProgress).to.be.true;
    expect(chaiHttpResponse.body[chaiLength -1].inProgress).to.be.true;
  });

  it("valida que se inProgress for 'undefined' retorna todas as partidas e o status 200", async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    
    const chaiLength = chaiHttpResponse.body.length;
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body[0]).to.have.property('inProgress');
    expect(chaiHttpResponse.body[0].inProgress).to.be.false;
    expect(chaiHttpResponse.body[chaiLength -1].inProgress).to.be.true;
  });
});
