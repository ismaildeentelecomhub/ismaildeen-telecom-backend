// Buy Data
router.post("/buy-data", async (req, res) => {
  try {
    const {
      network,
      phone,
      variation_code,
      amount,
      request_id
    } = req.body;

    // Debug logs
    console.log("API KEY:", process.env.VTPASS_API_KEY);
    console.log("PUBLIC KEY:", process.env.VTPASS_PUBLIC_KEY);
    console.log("SECRET KEY:", process.env.VTPASS_SECRET_KEY);

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
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
});
