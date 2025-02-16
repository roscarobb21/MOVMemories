import { Row, Col } from "reactstrap";
import insta_logo from "../assets/instagram_inverted.svg";
import facebook_logo from "../assets/facebook_inverted.svg";
import tiktok_logo from "../assets/tiktok_inverted.svg";
import youtube_logo from "../assets/youtube_inverted.svg";

import "./Socials.css";

function Socials() {
  return (
    <div className="socials-padding socials-margin">
      <div className="inverted-color-text stick-to-bottom space-grotesk-1">
        Join us in our own little social media world
      </div>
      <div>
        <Row className="d-flex justify-content-center">
          <Col className="d-flex justify-content-center">
            <span>
              <a href="https://instagram.com">
                <img
                  className="social-logo-small"
                  alt="instagram_logo"
                  src={insta_logo}
                ></img>
              </a>
            </span>

            <a href="https://instagram.com">
              <img
                className="social-logo-small"
                alt="instagram_logo"
                src={facebook_logo}
              ></img>
            </a>

            <a href="https://instagram.com">
              <img
                className="social-logo-small"
                alt="instagram_logo"
                src={tiktok_logo}
              ></img>
            </a>

            <a href="https://instagram.com">
              <img
                className="social-logo-small"
                alt="instagram_logo"
                src={youtube_logo}
              ></img>
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Socials;
