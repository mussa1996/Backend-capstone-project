process.env.NODE_ENV = "test";
let app = require("../server");
const fs = require("fs");
let chai = require("chai");
let chaiHttp = require("chai-http");

let should = chai.should();
const jwt = require("jsonwebtoken");
let userId = "61ec65d74cd112aacbe583fd";
require("dotenv").config();
let testId1 = "";
let testErrorID = "ad";

chai.use(chaiHttp);
chai.should();
chai.use(chaiHttp);
let loggedUser = {};
const testuser = {
  email: "edgar8@gmail.com",
  password: "123456789",
  token:jwt.sign({_id:userId}, process.env.MY_SECRET)
};

const fakeUSer = {
  email: "mussa@gmil.com",
  password: "",
};

let token = "";
describe("user handling", () => {
  it("it should create user", () => {
    chai
      .request(app)
      .post("/api/v2/users/create")
      .send({
        username: "aisha1",
        email: "aisha1@gmail.com",
        password: "123456789",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message");
        res.body.should.have.property("user");
        res.body.should.have.property("token");
      });
  });
  it("should signin user", (done) => {
    chai
      .request(app)
      .post("/api/v2/users/login")
      .send({ email: testuser.email, password: testuser.password })
      .end((err, res) => {
        res.should.have.status(201);
        token = res.body.user.token;
        userId = res.body.user._id;
        loggedUser = res.body.user;
        done();
      });
  });
  it("should not signin user without email", (done) => {
    chai
      .request(app)
      .post("/api/v2/users/login")
      .send({ email: fakeUSer.email, password:fakeUSer.password })
      .end((err, res) => {
        res.should.have.status(404);

        done();
      });
  });
  it("should get one user", (done) => {
    chai
      .request(app)
      .get("/api/v2/users/user?id=" + userId)
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should be delete user", (done) => {
    chai
      .request(app)
      .delete("/api/v2/users/delete?id=" + userId)
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("should get all users", (done) => {
    chai
      .request(app)
      .get("/api/v2/users/listUsers")
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("only admin can login in", (done) => {
    chai
      .request(app)
      .post("/api/v2/users/login")
      .send(fakeUSer)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe("Articles handling", () => {
  it("it should GET all the Articles", (done) => {
    chai
      .request(app)
      .get("/api/v2/articles/listAll")
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("it should POST an Article with all properties ", (done) => {
    chai
      .request(app)
      .post("/api/v2/articles/add")
      .set("Authorization", token)
      .set("content-type", "multipart/form-data")
      .field("title", "the lord of the Rings")
      .field("summary", "this is my first testing sumary")
      .attach(
        "picture",
        fs.readFileSync(`${__dirname}/jeremiah_topic.png1606082328498.png`),
        "test/jeremiah_topic.png1606082328498.png"
      )
      .field("contents", "this is my first testing content")
      .field("owner", userId)

      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eql("article saved successful");
        testId1 = res.body.data._id;
        done();
      });
  });

  it("it should not POST an Article without all properties ", (done) => {
    chai
      .request(app)
      .post("/api/v2/articles/add")
      .set("Authorization", token)
      .set("content-type", "multipart/form-data")
      .field("summary", "this is my first testing sumary")
      .field("contents", "this is my first testing content")
      .attach(
        "picture",
        fs.readFileSync(`${__dirname}/jeremiah_topic.png1606082328498.png`),
        "test/jeremiah_topic.png1606082328498.png"
      )
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });

  it("it return 404 when no article found", (done) => {
    chai
      .request(app)
      .get("/api/v2/articles/listOne?id=" + testErrorID)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message");
        done();
      });
  });

  it("it should UPDATE an article of given id", (done) => {
    chai
      .request(app)
      .patch("/api/v2/articles/update?id=" + testId1)
      .set("Authorization", token)
      .send({
        title: "kalsdjlasjd",
        summary: "da",
        contents: "nfkasidfisdfhsil",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("Article updated successfully");
        done();
      });
  });
  it("no article of given id to update", (done) => {
    chai
      .request(app)
      .patch("/api/v2/articles/update?id=" + testErrorID)
      .set("Authorization", token)
      .send({
        title: "kalsdjlasjd",
        summary: "da",
        contents: "nfkasidfisdfhsil",
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });
  it("it should DELETE an article given the id", (done) => {
    chai
      .request(app)
      .delete("/api/v2/articles/delete?id=" + testId1)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eql("deleted successful");
        done();
      });
  });

  it("no article found to be deleted", (done) => {
    chai
      .request(app)
      .delete("/api/v2/articles/delete?id=" + testErrorID)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("it should GET an article by the given id", (done) => {
    chai
      .request(app)
      .get("/api/v2/articles/listOne?id=" + testId1)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eql("operation successful");
        res.body.should.have.property("article");
        done();
      });
  });
  it("should logout user", (done) => {
    chai
      .request(app)
      .post("/api/v2/users/logout")
      .set("Authorization", token)
      .send(loggedUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("message");
        done();
      });
  });
  it("should not logout unauthenticated user", (done) => {
    chai
      .request(app)
      .post("/api/v2/users/logout")
      .set("Authorization", token)
      .send(loggedUser)
      .end((err, res) => {
        res.should.have.status(500);
        // res.body.should.have.property('message');
        done();
      });
  });
});
