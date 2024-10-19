import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <nav className="footer-section">
      <section className="footer-container">
        <div className="footer-container__logo">
          <Link to="/">
            <h1 className="footer-section__logo-container--text">
              HAPPY PAWS!
            </h1>
          </Link>
        </div>
        <div className="footer-container__links">
          <p className="footer-container__links-text">Overview</p>
          <p className="footer-container__links-text">Features</p>
          <p className="footer-container__links-text">Price</p>
          <p className="footer-container__links-text">Help</p>
          <p className="footer-container__links-text">Privacy</p>
        </div>
      </section>
      <section className="footer-section__TCs__container">
        <p className="footer-section__TCs__text">2024 Happy Paws. All rights reserved.</p>
      </section>
    </nav>
  );
};

export default Footer;
