import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import logo from "../public/assets/hog-logo.png";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body className="bg-light text-dark">
        {/* Top navbar for mobile + brand */}
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
          <div className="container-fluid">
            <Link href="/" className="navbar-brand d-flex align-items-center">
              <Image src={logo} alt="HOG Logo" width={56} height={56} />
              <div className="ms-2">
                <div className="fw-bold">Household Of God</div>
                <small className="text-muted">Admin</small>
              </div>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasSidebar"
              aria-controls="offcanvasSidebar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="d-none d-md-flex ms-auto align-items-center">
              <Link href="/login" className="btn btn-outline-secondary me-2">
                <i className="fa fa-user" /> Admin
              </Link>
              <Link href="/login?logout=1" className="btn btn-warning">
                Sign out
              </Link>
            </div>
          </div>
        </nav>

        {/* Offcanvas sidebar for mobile */}
        <div
          className="offcanvas offcanvas-start d-md-none"
          tabIndex="-1"
          id="offcanvasSidebar"
          aria-labelledby="offcanvasSidebarLabel"
        >
          <div className="offcanvas-header">
            <h5 id="offcanvasSidebarLabel">Menu</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <nav className="nav flex-column">
              <Link href="/" className="nav-link py-2">
                <i className="fa fa-tachometer-alt me-2 text-warning" />{" "}
                Dashboard
              </Link>
              <Link href="/announcement" className="nav-link py-2">
                <i className="fa fa-bullhorn me-2 text-warning" /> Announcement
              </Link>
              <Link href="/banner" className="nav-link py-2">
                <i className="fa fa-image me-2 text-warning" /> Banner
              </Link>
              <Link href="/department" className="nav-link py-2">
                <i className="fa fa-users me-2 text-warning" /> Department
              </Link>
              <Link href="/event" className="nav-link py-2">
                <i className="fa fa-calendar-days me-2 text-warning" /> Event
              </Link>
              <Link href="/gallery" className="nav-link py-2">
                <i className="fa fa-photo-film me-2 text-warning" /> Gallery
              </Link>
              <Link href="/information" className="nav-link py-2">
                <i className="fa fa-info-circle me-2 text-warning" />{" "}
                Information
              </Link>
              <Link href="/sermons" className="nav-link py-2">
                <i className="fa fa-book-open me-2 text-warning" /> Sermons
              </Link>
              <Link href="/hero" className="nav-link py-2">
                <i className="fa fa-images me-2 text-warning" /> Hero Slides
              </Link>
              <Link href="/site" className="nav-link py-2">
                <i className="fa fa-chart-line me-2 text-warning" /> Site
                Overview
              </Link>
              <Link href="/about/church" className="nav-link py-2">
                <i className="fa fa-building me-2 text-warning" /> About Church
              </Link>
              <Link href="/about/pastor" className="nav-link py-2">
                <i className="fa fa-user-tie me-2 text-warning" /> About Pastor
              </Link>
            </nav>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            {/* Sidebar for desktop */}
            <aside className="col-md-2 d-none d-md-block bg-white vh-100 border-end">
              <div className="p-3">
                <div className="mb-3">
                  <div className="fw-bold">Navigation</div>
                </div>
                <nav className="nav flex-column">
                  <Link href="/" className="nav-link py-2">
                    <i className="fa fa-tachometer-alt me-2 text-warning" />{" "}
                    Dashboard
                  </Link>
                  <Link href="/announcement" className="nav-link py-2">
                    <i className="fa fa-bullhorn me-2 text-warning" />{" "}
                    Announcement
                  </Link>
                  <Link href="/banner" className="nav-link py-2">
                    <i className="fa fa-image me-2 text-warning" /> Banner
                  </Link>
                  <Link href="/department" className="nav-link py-2">
                    <i className="fa fa-users me-2 text-warning" /> Department
                  </Link>
                  <Link href="/event" className="nav-link py-2">
                    <i className="fa fa-calendar-days me-2 text-warning" />{" "}
                    Event
                  </Link>
                  <Link href="/gallery" className="nav-link py-2">
                    <i className="fa fa-photo-film me-2 text-warning" /> Gallery
                  </Link>
                  <Link href="/information" className="nav-link py-2">
                    <i className="fa fa-info-circle me-2 text-warning" />{" "}
                    Information
                  </Link>
                  <Link href="/sermons" className="nav-link py-2">
                    <i className="fa fa-book-open me-2 text-warning" /> Sermons
                  </Link>
                  <Link href="/hero" className="nav-link py-2">
                    <i className="fa fa-images me-2 text-warning" /> Hero Slides
                  </Link>
                  <Link href="/site" className="nav-link py-2">
                    <i className="fa fa-chart-line me-2 text-warning" /> Site
                    Overview
                  </Link>
                  <Link href="/about/church" className="nav-link py-2">
                    <i className="fa fa-building me-2 text-warning" /> About
                    Church
                  </Link>
                  <Link href="/about/pastor" className="nav-link py-2">
                    <i className="fa fa-user-tie me-2 text-warning" /> About
                    Pastor
                  </Link>
                </nav>
              </div>
            </aside>

            <main className="col-12 col-md-10 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 d-md-none">
                <div />
                <div>
                  <Link href="/login?logout=1" className="btn btn-warning">
                    Sign out
                  </Link>
                </div>
              </div>

              {children}
            </main>
          </div>
        </div>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          defer
        />
      </body>
    </html>
  );
}
