import Image from "next/image";
import logo from "../public/assets/hog-logo.png";
import Link from "next/link";

export default async function Home() {
  let data = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/site/overview`,
      { cache: "no-store" }
    );
    if (res.ok) data = await res.json();
  } catch (err) {
    // ignore and fallback
  }

  if (!data) {
    data = {
      converts: 0,
      mediaCount: 0,
      welcomeText: "",
      todaysAnnouncement: "",
      infoOverview: { address: "", phone: "", members: 0 },
    };
  }

  return (
    <div className="container">
      <div className="row my-4 align-items-center">
        <div className="col-12 col-md-8 d-flex align-items-center gap-3">
          <Image
            src={logo}
            alt="House of God Logo"
            width={64}
            height={64}
            priority
          />
          <div>
            <h2 className="mb-0">Household Of God — Admin</h2>
            <small className="text-muted">Welcome back — Admin dashboard</small>
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
          <button className="btn btn-outline-secondary me-2">Profile</button>
          <button className="btn btn-warning">Sign out</button>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">New Converts</h6>
              <p className="display-6 mb-0 text-warning">{data.converts}</p>
              <small className="text-muted">This month</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Posted Media</h6>
              <p className="display-6 mb-0">{data.mediaCount}</p>
              <small className="text-muted">Total uploads</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Members</h6>
              <p className="display-6 mb-0">{data.infoOverview.members}</p>
              <small className="text-muted">Total members</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-warning">
            <div className="card-body">
              <h6 className="card-title">Today</h6>
              <p className="mb-0">{new Date().toLocaleDateString()}</p>
              <small className="text-muted">Current date</small>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Welcome</h5>
              <p className="card-text">{data.welcomeText}</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Today&#39;s Announcement</h5>
              <p className="card-text">{data.todaysAnnouncement}</p>
              <Link
                href="/announcement"
                className="btn btn-sm btn-outline-primary"
              >
                View all announcements
              </Link>
            </div>
          </div>
        </div>

        <aside className="col-12 col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title">Information Overview</h6>
              <ul className="list-unstyled mb-0">
                <li>
                  <strong>Address:</strong> {data.infoOverview.address}
                </li>
                <li>
                  <strong>Phone:</strong> {data.infoOverview.phone}
                </li>
                <li>
                  <strong>Members:</strong> {data.infoOverview.members}
                </li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Quick Actions</h6>
              <div className="d-grid gap-2">
                <Link
                  href="/announcement"
                  className="btn btn-outline-warning btn-sm"
                >
                  Post Announcement
                </Link>
                <Link
                  href="/gallery"
                  className="btn btn-outline-secondary btn-sm"
                >
                  Manage Media
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
