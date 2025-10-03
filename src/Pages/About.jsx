import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function About() {
  return (
    <>
      <main
        style={{
          maxWidth: 1100,
          margin: "120px auto 80px", // to clear header space on top
          padding: "0 20px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#222",
          lineHeight: 1.6,
        }}
      >
        {/* Hero Section */}
        <section
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
            About TechNova Laptops
          </h1>
          <p style={{ fontSize: 20, maxWidth: 700, margin: "0 auto" }}>
            Empowering your productivity and creativity with cutting-edge laptop
            technology. Crafted for professionals, gamers, and innovators who demand
            excellence and style.
          </p>
        </section>

        {/* Our Mission */}
        <section style={{ marginBottom: 50 }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: "700",
              marginBottom: 15,
              borderBottom: "3px solid #3b82f6",
              display: "inline-block",
              paddingBottom: 6,
            }}
          >
            Our Mission
          </h2>
          <p style={{ fontSize: 18, maxWidth: 800 }}>
            At TechNova, we believe technology should empower everyone. Our mission is
            to provide innovative, reliable, and powerful laptops that inspire
            creativity, boost productivity, and deliver seamless performance. We
            combine the latest hardware advancements with sleek design to create
            laptops that fit perfectly into your professional and personal life.
          </p>
        </section>

        {/* Why Choose Us */}
        <section style={{ marginBottom: 50 }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: "700",
              marginBottom: 25,
              borderBottom: "3px solid #3b82f6",
              display: "inline-block",
              paddingBottom: 6,
            }}
          >
            Why Choose TechNova?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 30,
            }}
          >
            {[
              {
                title: "Cutting-Edge Performance",
                desc: "Latest processors and graphics cards that handle multitasking, gaming, and creative workflows effortlessly.",
                icon: "⚡",
              },
              {
                title: "Stunning Display",
                desc: "Crisp, vibrant displays with high resolutions and fast refresh rates, perfect for design and entertainment.",
                icon: "🖥️",
              },
              {
                title: "Sleek & Durable Design",
                desc: "Premium build quality with lightweight materials for portability and longevity.",
                icon: "💼",
              },
              {
                title: "Long Battery Life",
                desc: "Power through your day with batteries designed for hours of uninterrupted productivity.",
                icon: "🔋",
              },
              {
                title: "Exceptional Support",
                desc: "Dedicated customer service and warranty plans that keep you running worry-free.",
                icon: "🤝",
              },
            ].map(({ title, desc, icon }) => (
              <div
                key={title}
                style={{
                  backgroundColor: "#e0e7ff",
                  borderRadius: 12,
                  padding: 25,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 15 }}>{icon}</div>
                <h3
                  style={{
                    fontWeight: "700",
                    fontSize: 22,
                    marginBottom: 12,
                    color: "#1e40af",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 16, color: "#1e293b" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section>
          <h2
            style={{
              fontSize: 32,
              fontWeight: "700",
              marginBottom: 25,
              borderBottom: "3px solid #3b82f6",
              display: "inline-block",
              paddingBottom: 6,
            }}
          >
            Meet Our Team
          </h2>
          <p style={{ fontSize: 18, maxWidth: 700, marginBottom: 40 }}>
            Our passionate team of engineers, designers, and customer support experts
            work tirelessly to bring you the best laptops and services.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 30,
              justifyContent: "center",
            }}
          >
            {[
              {
                name: "Ayesha Khan",
                role: "Chief Technology Officer",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Ali Raza",
                role: "Lead Engineer",
                img: "https://randomuser.me/api/portraits/men/46.jpg",
              },
              {
                name: "Sara Malik",
                role: "Head of Design",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "Omar Farooq",
                role: "Customer Success Manager",
                img: "https://randomuser.me/api/portraits/men/67.jpg",
              },
            ].map(({ name, role, img }) => (
              <div
                key={name}
                style={{
                  maxWidth: 220,
                  backgroundColor: "#f8fafc",
                  padding: 20,
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={img}
                  alt={name}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: 15,
                    border: "4px solid #3b82f6",
                  }}
                />
                <h4 style={{ marginBottom: 5, fontWeight: "700" }}>{name}</h4>
                <p style={{ fontSize: 16, color: "#334155" }}>{role}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
