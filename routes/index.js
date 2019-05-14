const router = require("express").Router();
const { ObjectId } = require("mongodb");
const Contact = require("../models/contact");
const validator = require("../utilits/validator");

const validatorConfig = {
  name: 3,
  phone: 10,
  address: 6
};

router.get("/", async (req, res) => {
  const contacts = await Contact.find({});

  res.status(200).json({
    contacts
  });
});

router.post("/", async (req, res) => {
  const contact = await new Contact(req.body).save();

  res.status(200).json({
    contact
  });
});

router.put("/", async (req, res) => {
  if (ObjectId.isValid(req.body._id)) {
    const contact = await Contact.findByIdAndUpdate(
      { _id: ObjectId(req.body.id) },
      {
        $set: { ...req.body }
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

    res.status(200).json({ deletedContact: contact });
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

module.exports = router;
