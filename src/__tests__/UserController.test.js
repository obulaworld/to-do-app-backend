import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
import userSeeder from '../database/seeders/userSeeder';
import {
  chisom,
  esther,
  cynthia
} from "./__mock_data__";
const should = chai.should();

chai.use(chaiHttp);

let id;
before(userSeeder.emptyUserTable);


describe("User Controller", () => {
  it("should Create New User", done => {
    chai
      .request(server)
      .post("/api/v1/users")
      .send(chisom)
      .end((err, res) => {
        id = res.body.user.id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("user");
        done();
      });
  });
  it("should Return 400 for incomplete user name", done => {
    chai
      .request(server)
      .post("/api/v1/users")
      .send(esther)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error");
        done();
      });
  });
  it("should Update created user", done => {
    chai
      .request(server)
      .put(`/api/v1/users/${id}`)
      .send(cynthia)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("user");
        done();
      });
  });

  it("should get all created users", done => {
    chai
      .request(server)
      .get("/api/v1/users")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("users");
        done();
      });
  });

  it("should Return 400 for invalid id for deletion", done => {
    chai
      .request(server)
      .delete("/api/v1/users/a")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error");
        done();
      });
  });

  it("should delte created user", done => {
    chai
      .request(server)
      .delete(`/api/v1/users/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        done();
      });
  });
});
