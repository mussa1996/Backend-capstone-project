let mongoose = require("mongoose");
let Comment = require('../models/Comment');
let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
chai.should();
chai.use(chaiHttp);
let should = chai.should();

let testId1="61d1841ea3720fda865a40d0";
describe('COMMENT API TEST', () => {
    // afterEach(async () => {
    //     await Comment.deleteMany({});
    //   });
    describe('CRD Comment', () => {
            it('it should CREATE a comment', (done) => {
                const res = chai.request(app)
                .post('/api/v2/comments/comment?id='+testId1)
                .send({full:"mussa", comment:"testing comments",testId1})
                .end((err,res)=>{
                    res.should.have.status(201)
                    res.body.should.be.a('object');
                    done()
                })
                
            });
            it('it should not send a comment without comment message', (done) => {
                const res = chai.request(app)
                .post('/api/v2/comments/comment?id='+testId1)
                .send({full:"mussa"})
                .end((err,res)=>{
                    res.should.have.status(404)
                    done()
                })
                
            });
         
            // Get all comments
            it('it should GET all the comments', (done) => {
                const res = chai.request(app)
                .get('/api/v2/comments/comment?=id'+testId1)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                done();
              });
            })

    });
});