const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Contact = require("../models/contact");
const { multer, uploadImage, deleteImage } = require("../utilits/upload");
const fs = require("fs-extra");

router.get("/", async (req, res) => {
  const contacts = await Contact.find({});

  res.status(200).json({
    contacts
  });
});

router.post("/", multer.single("avatar"), async (req, res) => {
  if (req.file) {
    uploadImage(req.file.path)
      .then(result => {
        req.body.image = {
          url: result.secure_url,
          id: result.public_id
        };

        return new Contact(req.body).save();
      })
      .then(contact => {
        res.status(200).json({
          contact
        });

        fs.remove(req.file.path);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" });
      });
  } else {
    const contact = await new Contact(req.body).save();

    res.status(200).json({
      contact
    });
  }
});

router.put("/", async (req, res) => {
  if (ObjectId.isValid(req.body._id)) {
    const contact = await Contact.updateOne(
      { _id: ObjectId(req.body._id) },
      {
        $set: req.body
      }
    );

    res.status(200).json({ contact });
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

router.delete("/", async (req, res) => {
  if (ObjectId.isValid(req.body._id)) {
    const contact = await Contact.findByIdAndRemove({
      _id: ObjectId(req.body._id)
    });

    if (contact.image) {
      deleteImage(contact.image.id).catch(err => {
        if (!err.deleted) console.log(err);
      });
    }

    res.status(200).json({ deletedContact: contact });
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

module.exports = router;
