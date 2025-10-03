import React, { useState } from "react";
import { db } from "../firebase"; // Firebase ka sahi path
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setSuccess(`Thank you, ${formData.name}! Your message has been sent.`);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Firestore Error:", err);
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <main
      style={{
        maxWidth: 1300,
        margin: "120px auto 80px",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
        lineHeight: 1.6,
      }}
    >
      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .contact-hero h1 { font-size: 32px !important; }
          .contact-hero p { font-size: 16px !important; }
        }
        @media (max-width: 500px) {
          .contact-info, .contact-form { padding: 20px !important; }
          .contact-form input, .contact-form textarea { font-size: 14px !important; }
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="contact-hero"
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          borderRadius: 12,
          marginBottom: 60,
          boxShadow: "0 10px 30px rgba(15,23,42,0.5)",
        }}
      >
        <h1 style={{ fontSize: 48, marginBottom: 30, fontWeight: "900" }}>
          Contact TechNova
        </h1>
        <p style={{ fontSize: 20, maxWidth: 700, margin: "0 auto" }}>
          Have questions? We’re here to help. Reach out via the form below or through our contact information.
        </p>
      </section>

      {/* Contact Info & Form */}
      <section
        className="contact-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60 }}
      >
        {/* Contact Details */}
        <div
          className="contact-info"
          style={{
            backgroundColor: "#e0e7ff",
            borderRadius: 12,
            padding: 30,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "2px solid black",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: "700", marginBottom: 50, color: "#1e40af", borderBottom: "3px solid #3b82f6", paddingBottom: 6, textAlign: "left" }}>
            Get in Touch
          </h2>

          <div style={{ marginBottom: 25 }}>
            <h3 style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>📍 Our Location</h3>
            <p style={{ fontSize: 18, color: "#334155" }}>123 TechNova Street, Silicon Valley, CA 94043, USA</p>
          </div>

          <div style={{ marginBottom: 25 }}>
            <h3 style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>📧 Email Us</h3>
            <p style={{ fontSize: 18, color: "#334155" }}>support@technova.com</p>
          </div>

          <div>
            <h3 style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}>📞 Call Us</h3>
            <p style={{ fontSize: 18, color: "#334155" }}>+1 (555) 123-4567</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#f8fafc",
            borderRadius: 12,
            padding: 30,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            border: "2px solid black",
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: "700", marginBottom: 10, color: "#1e40af", borderBottom: "3px solid #3b82f6", paddingBottom: 6 }}>
            Send Us a Message
          </h2>

          {["name", "email", "subject"].map((field) => (
            <div key={field} style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ color: "black", fontWeight: "600", marginBottom: 4 }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={formData[field]}
                onChange={handleChange}
                required
                style={{ padding: 12, fontSize: 16, borderRadius: 6, border: "1px solid #ccc", outline: "none", backgroundColor: "white", color: "black" }}
              />
            </div>
          ))}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ color: "black", fontWeight: "600", marginBottom: 4 }}>Message</label>
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{ padding: 12, fontSize: 16, borderRadius: 6, border: "1px solid #ccc", outline: "none", resize: "vertical", backgroundColor: "white", color: "black" }}
            />
          </div>

          {/* Success & Error Messages */}
          {success && <p style={{ color: "green", fontWeight: "600" }}>{success}</p>}
          {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}

          <button
            type="submit"
            style={{ backgroundColor: "#3b82f6", color: "#fff", padding: 15, border: "2px solid black", borderRadius: 8, fontSize: 18, fontWeight: "700", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Google Map */}
      <section style={{ marginBottom: 60, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <iframe
          title="TechNova Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019994828665!2d-122.08424908468173!3d37.42206597982585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb0b5e5b1a85d%3A0x4c5d6c53ee3450b9!2s123%20TechNova%20Street%2C%20Silicon%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1692700000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
}

export default Contact;
