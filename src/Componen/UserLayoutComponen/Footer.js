const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xs-12">
              <div className="right-text-content">
                <ul className="social-icons">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="logo">
                <a href="index.html">
                  {/* <img src="/img_user/images/white-logo.png" alt /> */}
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-xs-12">
              <div className="left-text-content">
                <p>
                  © GyzCountercv
                  <br />
                  Design: TemplateMo
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
