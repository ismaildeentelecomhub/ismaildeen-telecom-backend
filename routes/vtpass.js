import express from "express";
import axios from "axios";

const router = express.Router();

// =======================
// API STATUS
// =======================
router.get("/balance", (req, res) => {
  res.json({
    success: true,
    message: "VTpass API Ready"
  });
});

// =======================
// TEST AUTH
// =======================
router.get("/test-auth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sandbox.vtpass.com/api/service-variations?serviceID=mtn-data",
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "public-key": process.env.VTPASS_PUBLIC_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

// =======================
// GET DATA PLANS
// =======================
router.get("/data-plans/:network", async (req, res) => {
  try {
    const { network } = req.params;

    const response = await axios.get(
      `https://sandbox.vtpass.com/api/service-variations?serviceID=${network}`,
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "public-key": process.env.VTPASS_PUBLIC_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});

// =======================
// BUY DATA
// =======================
router.post("/buy-data", async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const {
      network,
      phone,
      variation_code,
      amount,
      request_id
    } = req.body;

    const response = await axios.post(
      "https://sandbox.vtpass.com/api/pay",
      {
        request_id,
        serviceID: network,
        billersCode: phone,
        variation_code,
        amount,
        phone
      },
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "public-key": process.env.VTPASS_PUBLIC_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);

    res.status(500).json({
      success: false,
      status: error.response?.status,
      error: error.response?.data || error.message
    });
  }
});
router.get("/wallet", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sandbox.vtpass.com/api/balance",
      {
        headers: {
          "api-key": process.env.VTPASS_API_KEY,
          "public-key": process.env.VTPASS_PUBLIC_KEY
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || { error: error.message });
  }
});
export default router;
