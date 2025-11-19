import express from "express";
import { currentUser, productRequests } from "../seeds/feedbackSeeds.js";

const router = express.Router();

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function fixImagePaths(data) {
  if (Array.isArray(data)) return data.map(fixImagePaths);
  if (data && typeof data === "object") {
    const fixed = {};
    for (const [key, value] of Object.entries(data)) {
      if (key === "image" && typeof value === "string") {
        fixed[key] = `${BASE_URL}/${value.replace(/^\.\/+/, "")}`;
      } else {
        fixed[key] = fixImagePaths(value);
      }
    }
    return fixed;
  }
  return data;
}

router.get("/currentUser", (req, res) => {
  res.json(fixImagePaths(currentUser));
});

router.get("/productRequests", (req, res) => {
  res.json(fixImagePaths(productRequests));
});

router.get("/productRequests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const request = productRequests.find((pr) => pr.id === id);
  if (!request)
    return res.status(404).json({ message: "Product request not found" });
  res.json(fixImagePaths(request));
});

router.post("/productRequests", (req, res) => {
  const { content, productId } = req.body;

  // Validate
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "Comment content is required" });
  }

  // Find the product request by ID
  const productRequest = productRequests.find((pr) => pr.id === productId);

  if (!productRequest) {
    return res.status(404).json({ message: "Product request not found" });
  }

  // Create the comment in EXACT SEED FORMAT
  const newComment = {
    id: Date.now(),
    content,
    user: {
      image: currentUser.image,
      name: currentUser.name,
      username: currentUser.username,
    },
    replies: [],
  };

  // Add to comments
  productRequest.comments.push(newComment);

  // Return updated PR
  res.status(201).json({
    message: "Comment added successfully",
    updatedRequest: productRequest,
  });
});

export default router;
