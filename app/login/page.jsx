"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  useEffect(() => {
    // read search params from window.location on the client to avoid
    // using `useSearchParams` which can cause a Suspense-related build error
    // when prerendering. This runs only in the browser.
    try {
      const params = new URLSearchParams(window.location.search);
      const logout = params.get("logout");
      if (logout) {
        try {
          localStorage.removeItem("hog_admin_token");
        } catch (e) {}
        router.replace("/");
      }
    } catch (e) {
      // ignore when not available
    }
  }, [router]);

  function handleSubmit(e) {
    e.preventDefault();
    // simple local auth: any non-empty credential creates a session token
    if (!user || !pass) return alert("Enter username and password");
    try {
      localStorage.setItem("hog_admin_token", btoa(`${user}:${pass}`));
    } catch (e) {
      console.error(e);
    }
    router.push("/");
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-3">Admin Login</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="Username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-warning">Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
