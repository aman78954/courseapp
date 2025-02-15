import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Qs5utJufWeMIcTV5cdezc7odSTLEuzN8F6KxGHetmXYHO4iWFNvIsINZfXhZ6FaN7gUwvzl176PpTGkhGwbtamf00dghIUe7W"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);
