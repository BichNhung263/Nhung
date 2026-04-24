import express from "express";
import cors from "cors";
import "dotenv/config";
import { VNPay } from "vnpay";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const vnpay = new VNPay({
  tmnCode: process.env.VNP_TMN_CODE,
  secureSecret: process.env.VNP_HASH_SECRET,
  testMode: true,
});

app.get("/payment", (req, res) => {
  const { amount, orderId } = req.query;
  console.log(`--- Creating Payment for Order #${orderId} ---`);
  console.log(`Amount: ${amount}`);

  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const vnpUrl = vnpay.buildPaymentUrl({
    vnp_Amount: Number(amount) * 100, 
    vnp_IpAddr: ipAddr,
    vnp_TxnRef: orderId || String(Date.now()),
    vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
    vnp_OrderType: "other",
    vnp_Command: "pay",
    vnp_ReturnUrl: `http://localhost:5173/vnpay-return`,
  });

  console.log("✅ Final VNPay URL:", vnpUrl);
  res.json({ url: vnpUrl });
});

// API kiểm tra trả về từ VNPay
app.get("/", (req, res) => {
  const query = req.query;
  const verify = vnpay.verifyReturnUrl(query);

  console.log("VNPay return query:", query);

  if (verify && query.vnp_ResponseCode === "00") {
    res.send("Thanh toán thành công!");
  } else {
    res.send("Thanh toán thất bại!");
  }
});

app.listen(PORT, () => {
  console.log(`VNPay server running on http://localhost:${PORT}`);
});
