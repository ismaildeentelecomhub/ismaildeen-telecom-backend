import { db } from "./firebaseAdmin.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        app: "ISMAIL DEEN TELECOM HUB Backend",
        status: "Running"
    });
});
// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "ISMAIL DEEN TELECOM HUB API is working."
    });
});

// Test Route
app.get("/api/test", (req, res) => {
    res.json({
        status: "OK",
        version: "1.0.0"
    });
});
// Server
const PORT = process.env.PORT || 3000;
// Test Firebase Connection
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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});