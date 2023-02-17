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
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
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
                                window.location.pathname ===
                                "/admin/dashboard/analytics"
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
                                    className="dropdown-item"
                                >
                                    Generate Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics/export-report"
                                    className="dropdown-item "
                                >
                                    Export Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics/archived-report"
                                    className="dropdown-item "
                                >
                                    Archived Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/analytics/deleted-report"
                                    className="dropdown-item"
                                >
                                    Deleted Report
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className={` nav-link fw-bold dropdown-toggle ${
                                window.location.pathname ===
                                "/admin/dashboard/manage-account"
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
                                    className="dropdown-item"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account/edit-profile"
                                    className="dropdown-item"
                                >
                                    Review Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account/change-password"
                                    className="dropdown-item"
                                >
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-account/delete-account"
                                    className="dropdown-item"
                                >
                                    Delete Admin Account
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                            className={`nav-link dropdown-toggle fw-bold ${
                                window.location.pathname ===
                                "/admin/dashboard/manage-users"
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
                                    className="dropdown-item"
                                >
                                    Manage Subscription
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/manage-users"
                                    className="dropdown-item"
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
                                window.location.pathname ===
                                "/admin/dashboardsettings"
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
