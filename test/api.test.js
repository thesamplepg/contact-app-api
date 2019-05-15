const { expect } = require("chai");
const request = require("supertest");

process.env.NODE_ENV = "test";

const app = require("../app");
const db = require("../utilits/database");

let id;

describe("API test", () => {
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

  describe("POST request", () => {
    it("creating a new contact address, should return a new contact", done => {
      const contact = { name: "Test", address: "testtest", phone: "423842123" };

      request(app)
        .post("/api")
        .send(contact)
        .then(res => {
          const { contact } = res.body;
          expect(contact).to.contain.property("_id");
          expect(contact).to.contain.property("address");
          expect(contact).to.contain.property("name");
          expect(contact).to.contain.property("phone");

          id = contact._id;

          done();
        })
        .catch(err => done(err));
    });
  });

  describe("PUT request", () => {
    it("update contact address", done => {
      request(app)
        .put("/api")
        .send({
          _id: id,
          name: "Updated"
        })
        .then(res => {
          const { ok, n } = res.body.contact;

          expect(ok).to.be.equal(1);
          expect(n).to.be.equal(1);

          done();
        })
        .catch(err => done(err));
    });
  });

  describe("DELETE request", () => {
    it("should delete contact and return it", done => {
      request(app)
        .delete("/api")
        .send({ _id: id })
        .then(res => {
          const { deletedContact } = res.body;

          expect(deletedContact).not.to.be.a("undefined");
          expect(deletedContact._id).to.equal(id);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe("GET request", () => {
    it("get all contacs, should return 0 contacts", done => {
      request(app)
        .get("/api")
        .then(res => {
          const { contacts } = res.body;
          expect(contacts.length).to.equal(0);
          done();
        })
        .catch(err => done(err));
    });
  });
});
