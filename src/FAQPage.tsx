import React, { useState } from "react";
import { FAQItem } from "./patterns/faq/faqItem";

export default function FAQPage() {
  const [items, setItems] = useState<FAQItem[]>([
    new FAQItem(
      "How do I reset my password?",
      "Click 'Forgot Password' on the login page and follow the email link."
    ),
    new FAQItem(
      "Can I change my username?",
      "No. Usernames are permanent and cannot be changed once created."
    ),
    new FAQItem(
      "Who do I contact for support?",
      "Email support@example.com and we’ll respond within 24 hours."
    ),
  ]);

  const handleToggle = (index: number) => {
    const copy = [...items];
    copy[index].toggle();
    setItems(copy);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
        FAQ (State Pattern Demo)
      </h2>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #ccc",
            padding: "0.75rem 0",
          }}
        >
          <button
            onClick={() => handleToggle(i)}
            style={{
              all: "unset",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            <span>{item.getQuestion()}</span>
            <span>{item.isOpen() ? "▲" : "▼"}</span>
          </button>

          {item.isOpen() && (
            <p
              style={{
                marginTop: "0.5rem",
                color: "#444",
                fontSize: "0.9rem",
                lineHeight: "1.4rem",
              }}
            >
              {item.getAnswer()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
