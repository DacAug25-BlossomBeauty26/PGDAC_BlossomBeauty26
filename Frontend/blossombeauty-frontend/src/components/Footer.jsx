const Footer = () => {

  return (

    <footer
      id="contact"
      className="text-center py-5"
      style={{ backgroundColor: "#e6f7f7" }}
    >

      <h4 className="mb-3">Contact Us</h4>

      <p>📍 Pune, Maharashtra, India</p>

      <p>📧 support@blossombeauty.com</p>

      <p>📞 +91 8475123690</p>

      <hr style={{ width: "60%", margin: "20px auto" }} />

      <p className="text-muted">

        © {new Date().getFullYear()} Blossom Beauty

      </p>

    </footer>

  );

};

export default Footer;
