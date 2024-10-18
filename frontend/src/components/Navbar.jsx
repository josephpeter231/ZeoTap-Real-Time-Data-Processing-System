import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Weather Monitoring</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/">Home</Link>
            </li>

            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/daily-summary">Daily Summary</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/alerts">Alerts</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link fw-bold" to="/charts">Visualisation</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
