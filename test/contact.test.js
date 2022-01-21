let mongoose = require("mongoose");
let Contact = require('../models/Contact');
let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
chai.should();
chai.use(chaiHttp);
let should = chai.should();


describe('contact API TEST', () => {
    // afterEach(async () => {
    //     await Comment.deleteMany({});
    //   });
    
            it('it should send message', (done) => {
                const res = chai.request(app)
                .post('/api/contact/send')
                .send({name:"mussa", email:"mussa@example.com",subject:"testing",message:"hi mussa"})
                .end((err,res)=>{
                    res.should.have.status(200)
                    done()
                })
                
            });
         
            // Get all messages
            it('it should GET all the messages', (done) => {
                const res = chai.request(app)
                .get('/api/contact/list')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
              });
            })
            it('it should not send message without email or name', (done) => {
                const res = chai.request(app)
                .post('/api/contact/send')
                .send({email:"abc@example.com",subject:"testing",message:"hi mussa"})
                .end((err, res) => {
                                res.should.have.status(400);
                                res.body.should.be.a('object');
                                res.body.should.have.property('message');
                                res.body.message.should.be.eql('contact validation failed: name: Path `name` is required.');
                            done();
                          });
            })

    });
