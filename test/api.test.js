const { expect } = require("chai");
const request = require("supertest");

process.env.NODE_ENV = "test";

const app = require("../app");
const db = require("../utilits/database");

before(done => {
  db.connect()
    .then(() => done())
    .catch(() => done());
});

after(done => {
  db.close()
    .then(() => done())
    .catch(() => done());
});

describe("Post request", () => {
  it("OK, creating a new contact address", done => {
    request(app)
      .post("/api")
      .send({ name: "NOTE", address: "lenina7a", phone: "0777128261" })
      .then(res => {
        const { contact } = res.body;
        expect(contact).to.contain.property("_id");
        expect(contact).to.contain.property("address");
        expect(contact).to.contain.property("name");
        expect(contact).to.contain.property("phone");
        done();
      })
      .catch(err => done(err));
  });
});

describe("Get request", () => {
  it("Shuld return contacts", done => {
    request(app)
      .get("/api")
      .then(res => {
        const { contacts } = res.body;
        expect(contacts.length).to.equal(1);
        done();
      })
      .catch(err => done(err));
  });
});
