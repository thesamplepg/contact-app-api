const { expect } = require("chai");
const request = require("supertest");
const path = require("path");
const fs = require("fs-extra");

const { uploadImage, deleteImage } = require("../utilits/upload");
const image = path.resolve(__dirname, "../uploads", "14.jpg");

let id;

describe("Functions to handle cloudinary", () => {
  describe("Upload Image function", () => {
    it("should upload image to cloudinary and return data", done => {
      uploadImage(image)
        .then(result => {
          expect(result.secure_url).to.be.a("string");
          expect(result.public_id).to.be.a("string");

          id = result.public_id;

          done();
        })
        .catch(err => done(err));
    });
  });

  describe("Delete Image function", () => {
    it("should remove image from cloudinary", done => {
      deleteImage(id)
        .then()
        .catch(err => {
          if (err.deleted) {
            fs.removeSync(image);
            done();
          } else {
            done(err);
          }
        });
    });
  });
});
