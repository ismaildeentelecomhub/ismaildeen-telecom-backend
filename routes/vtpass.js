import express from "express";

const router = express.Router();

router.get("/balance", (req, res) => {
  res.json({
    success: true,
    message: "VTpass route is working."
  });
});

export default router;
