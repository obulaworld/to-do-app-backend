import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
import { chisom, task1, task2, task3 } from "./__mock_data__";
import userSeeder from "../database/seeders/userSeeder";
const should = chai.should();

chai.use(chaiHttp);
let id, taskId;

before(userSeeder.emptyUserTable);

describe("User Controller", () => {
  it("should Create New User", done => {
    chai
      .request(server)
      .post("/api/v1/users")
      .send(chisom)
      .end((err, res) => {
        id = res.body.user.id;
        task1.userId = id;
        task3.userId = id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("user");
        done();
      });
  });
});

describe("User Task Controller", () => {
  it("should Create New Task with created user", done => {
    chai
      .request(server)
      .post("/api/v1/tasks")
      .send(task1)
      .end((err, res) => {
        taskId = res.body.task.id;
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("task");
        done();
      });
  });

  it("should Return 400 for incomplete payload", done => {
    chai
      .request(server)
      .post("/api/v1/tasks")
      .send(task2)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error");
        done();
      });
  });
  it("should Update created task", done => {
    chai
      .request(server)
      .put(`/api/v1/tasks/${taskId}`)
      .send(task3)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("task");
        done();
      });
  });

  it("should get all created tasks for a user", done => {
    chai
      .request(server)
      .get(`/api/v1/tasks/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        res.body.should.have.property("tasks");
        done();
      });
  });

  it("should Return 400 for invalid id for deletion", done => {
    chai
      .request(server)
      .delete("/api/v1/tasks/a")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("error");
        done();
      });
  });

  it("should delte created task", done => {
    chai
      .request(server)
      .delete(`/api/v1/tasks/${taskId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("success");
        done();
      });
  });
});
