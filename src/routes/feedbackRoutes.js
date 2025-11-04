import express from "express";
import { currentUser, productRequests } from "../seeds/feedbackSeeds.js";

const router = express.Router();

router.get("/currentUser", (req, res) => {
  res.json(currentUser);
});

router.get("/productRequests", (req, res) => {
  res.json(productRequests);
});

router.get("/productRequests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const request = productRequests.find((pr) => pr.id === id);
  if (!request)
    return res.status(404).json({ message: "Product request not found" });
  res.json(request);
});

export default router;
