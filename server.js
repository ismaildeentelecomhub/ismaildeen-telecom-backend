import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { db } from "./firebaseAdmin.js";
import vtpassRoutes from "./routes/vtpass.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// HOME
// =======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    app: "ISMAIL DEEN TELECOM HUB Backend",
    status: "Running"
  });
});

// =======================
// HEALTH CHECK
// =======================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working successfully."
  });
});

// =======================
// FIREBASE TEST
// =======================
app.get("/api/firebase", async (req, res) => {
  try {
    await db.collection("test").doc("connection").set({
      status: "Connected",
      time: new Date().toISOString()
    });

    res.json({
      success: true,
      message: "Firebase Connected Successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// =======================
// PAYSTACK INITIALIZE
// =======================
app.post("/api/paystack/initialize", async (req, res) => {
  try {

    const { email, amount } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

// =======================
// PAYSTACK VERIFY
// =======================
app.get("/api/paystack/verify/:reference", async (req, res) => {
  try {

    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 3000;
app.use("/api/vtpass", vtpassRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
router.get("/debug-env", (req, res) => {
  res.json({
    apiKey: process.env.VTPASS_API_KEY ? "FOUND" : "MISSING",
    publicKey: process.env.VTPASS_PUBLIC_KEY ? "FOUND" : "MISSING",
    secretKey: process.env.VTPASS_SECRET_KEY ? "FOUND" : "MISSING",
    nodeEnv: process.env.NODE_ENV
  });
});
