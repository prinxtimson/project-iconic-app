import { Link } from "react-router-dom";

const OffcanvasNavbar = ({ user }) => {
    return (
        <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
        >
            <div className="offcanvas-header">
                <Link
                    id="brand"
                    className="navbar-brand mx-auto"
                    to={user ? "/admin/dashboard" : "/admin"}
                >
                    <img
                        src="/images/Elint_x.png"
                        alt="Elint X"
                        width="69"
                        height="68"
                    />
                </Link>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div className="offcanvas-body">
                <ul className="navbar-nav flex-grow-1 pe-3">
                    <li className="nav-item">
                        <Link
                            to="/admin/dashboard"
                            className={` nav-link fw-bold ${
                                window.location.pathname === "/admin/dashboard"
                                    ? "active"
                                    : ""
                            }`}
                            aria-current="page"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className={` nav-link fw-bold dropdown-toggle ${
                                window.location.pathname.match(
                                    /\/admin\/dashboard\/analytics(\/[a-z]*-?[a-z]*)?/
                                )
                                    ? "active"
                                    : ""
                            }`}
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Analytics
                        </a>

                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            /^\/admin\/dashboard\/analytics$/
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Generate Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics/export-report"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/analytics/export-report"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Export Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics/archived-report"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/analytics/archived-report"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Archived Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics/deleted-report"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/analytics/deleted-report"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Deleted Report
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className={` nav-link fw-bold dropdown-toggle ${
                                window.location.pathname.match(
                                    /\/admin\/dashboard\/manage-account(\/[a-z]*-?[a-z]*)?/
                                )
                                    ? "active"
                                    : ""
                            }`}
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Manage Account
                        </a>

                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            /^\/admin\/dashboard\/manage-account$/
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account/edit-profile"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/manage-account/edit-profile"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Review Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account/change-password"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/manage-account/change-password"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account/delete-account"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/manage-account/delete-account"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Delete Admin Account
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className={`nav-link dropdown-toggle fw-bold ${
                                window.location.pathname.match(
                                    /\/admin\/dashboard\/manage-users(\/[a-z]*-?[a-z]*)?/
                                )
                                    ? "active"
                                    : "text"
                            }`}
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Manage Subscription
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-users/subscription"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/manage-users/subscription"
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Manage Subscription
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-users"
                                    className={`dropdown-item ${
                                        window.location.pathname.match(
                                            /^\/admin\/dashboard\/manage-users$/
                                        )
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    View Users Activities
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Link
                            to="/admin/dashboard/settings"
                            className={`nav-link fw-bold ${
                                window.location.pathname.match(
                                    "/admin/dashboard/settings"
                                )
                                    ? "active"
                                    : ""
                            }`}
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OffcanvasNavbar;
