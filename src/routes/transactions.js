const express = require("express");
const router = express.Router();

const Transaction = require("../models/transaction");

router.get("/", async (req, res) => {
  try {
    let transaction = await Transaction.find({});
    res.status(200).render("transaction/index", { transaction: transaction });
  } catch (error) {
    res.status(500).render("pages/error", { error: "Erro ao exibir as listas" });
  }
});

router.get("/new", async (req, res) => {
  try {
    let transaction = new Transaction();
    res.status(200).render("transaction/new", { transaction: transaction });
  } catch (error) {
    res.status(500).render("pages/error", { errors: "Erro ao exibir o formulários" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    res.status(200).render("transaction/edit", { transaction: transaction });
  } catch (error) {
    res.status(500).render("pages/error", { error: "Erro ao exibir as listas de tarefas" });
  }
});

router.post("/", async (req, res) => {
  const amount = parseFloat(req.body.transaction.amount);
  console.log(amount);
  let { name } = req.body.transaction;
  let transaction = new Transaction({ name, amount });
  try {
    await transaction.save({ name });
    res.redirect("/transaction");
  } catch (error) {
    console.log(error);
    res.status(422).render("transaction/new", { transaction: { ...transaction, error } });
  }
});

router.put("/:id", async (req, res) => {
  let { name } = req.body.transaction;
  let transaction = await Transaction.findById(req.params.id);

  try {
    await transaction.updateOne({ name });
    res.redirect("/transaction");
  } catch (error) {
    let errors = error.errors;
    res.status(422).render("transaction/edit", { transaction: { ...transaction, errors } });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let transaction = await Transaction.findByIdAndDelete(req.params.id);
    res.redirect("/transaction");
  } catch (error) {
    res.status(500).render("pages/error", { error: "Erro ao exibir as listas de tarefas" });
  }
});

module.exports = router;
