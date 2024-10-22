import React, { useState } from "react";
import emailjs from "emailjs-com";
import Image from "next/image";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_xxfx7l5", // Replace with your EmailJS service ID
        "template_rinsfrh", // Replace with your EmailJS template ID
        formData,
        "Pt8XQT-0aToBCEO8x" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setSuccessMessage("Your message has been sent!");
          setLoading(false);
          setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
        },
        (err) => {
          console.log("Failed to send email. Error:", err);
          setErrorMessage("Failed to send your message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <div id="contact" className="container">
      <div className="contact-section row">
        <div className="contact-info col-md-5">
          <div className="ang_1">
            <h3>Get In Touch</h3>
            <p>
              For Web Analytics and Google Analytics services to make data-driven decisions that enhance your business growth.
            </p>
          </div>
          <Image className="objct" src="/images/object.png" alt="Object" width={200} height={100} />
        </div>

        <div className="col-md-7">
          <form className="fom_1" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name*"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail*"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-block snd_msg1" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;
