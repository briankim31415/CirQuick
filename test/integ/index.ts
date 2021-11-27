import app from "../../src/index";
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

chai.use(chaiHttp);
let userId = "";
let userId2 = "";
let projectId = "";

describe("Integration Tests", () => {
  before(() => {
    const makeServer = async () => {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri());
    };
    return new Promise((resolve, reject) => {
      if (
        mongoose.connection.readyState === 1 ||
        mongoose.connection.readyState === 2
      ) {
        console.log("Disconnecting from DB");
        mongoose.disconnect().then(() => {
          makeServer()
            .then(() => {
              resolve(null);
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        makeServer()
          .then(() => {
            resolve(null);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  });

  it("Sign Up", function (done) {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: "test",
        password: "test",
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body.userId).to.not.be.null;
        userId = res.body.userId;
        done();
      });
  });
  it("Sign In", function (done) {
    chai
      .request(app)
      .post("/signin")
      .send({
        username: "test",
        password: "test",
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it("Create Resource", function (done) {
    chai
      .request(app)
      .post("/resource/create")
      .send({
        hwSetId: "testId",
        hwSetName: "testName",
        capacity: 100,
        availablity: 100,
        transactions: [],
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it("Get Resource", function (done) {
    chai
      .request(app)
      .get("/resource/testId")
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body.hwSetId).to.equal("testId");
        chai.expect(res.body.hwSetName).to.equal("testName");
        chai.expect(res.body.capacity).to.equal(100);
        chai.expect(res.body.availablity).to.equal(100);
        done();
      });
  });

  it("Create Project", function (done) {
    chai
      .request(app)
      .post("/project/create")
      .send({
        userId: userId,
        description: "string",
        name: "testProject",
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body.projectId).to.not.null;
        projectId = res.body.projectId;
        done();
      });
  });

  it("CheckOut", function (done) {
    chai
      .request(app)
      .post("/checkinout/checkout")
      .send({
        userId: userId,
        projectId: projectId,
        hwSetId: "testId",
        amount: 75,
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });
  it("Get Project After Checkout", function (done) {
    chai
      .request(app)
      .get("/project/" + projectId)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body.description).to.equal("string");
        chai.expect(res.body.name).to.equal("testProject");
        chai.expect(res.body.transactions).to.have.length.greaterThanOrEqual(0);
        done();
      });
  });

  it("CheckIn", function (done) {
    chai
      .request(app)
      .post("/checkinout/checkin")
      .send({
        userId: userId,
        projectId: projectId,
        hwSetId: "testId",
        amount: 50,
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });

  it("Get Project After CheckIn", function (done) {
    chai
      .request(app)
      .get("/project/" + projectId)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body.description).to.equal("string");
        chai.expect(res.body.name).to.equal("testProject");
        chai.expect(res.body.transactions).to.have.length.greaterThanOrEqual(0);
        done();
      });
  });

  it("Get User Project", function (done) {
    chai
      .request(app)
      .get("/user/projects?userId=" + userId)
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.have.length(1);
        done();
      });
  });

  it("Get User", function (done) {
    chai
      .request(app)
      .post("/user")
      .send({
        userId: userId,
        username: "test2",
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(500);
        //chai.expect(res.body).to.true;
        done();
      });
  });
  it("Create User2", function (done) {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: "test2",
        password: "test2",
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body.userId).to.not.be.null;
        userId2 = res.body.userId;
        done();
      });
  });
  it("Add User2 to Project", function (done) {
    chai
      .request(app)
      .post("/project/addUser")
      .send({
        projectId: projectId,
        userId: userId2,
      })
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        done();
      });
  });
  after(() => {
    mongoose.disconnect();
    process.exit(1);
  });
});
