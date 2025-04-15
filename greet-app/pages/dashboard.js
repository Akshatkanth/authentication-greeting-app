export default function handler(req, res) {
    // In real apps, you would check user auth
    res.status(200).json({ message: "Welcome to the Dashboard!" });
  }
  