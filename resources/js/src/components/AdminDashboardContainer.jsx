import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { logout, markNotification, reset } from "../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import searchData from "../utils/searchData";
import SearchDialog from "./SearchDialog";
import Moment from "react-moment";
import AdminFooter from "./AdminFooter";
import OffcanvasNavbar from "./OffcanvasNavbar";

const AdminDashboardContainer = ({ children }) => {
    const { t } = useTranslation(["dashboard"]);
    const { routeName } = useParams();
    const dropBtnRef = useRef(null);
    const dropBellRef = useRef(null);
    const [searchText, setSearchText] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, notifications, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [isError]);

    useEffect(() => {
        if (!user) {
            return <Navigate to="/admin/login" />;
        }
    }, [user]);

    useEffect(() => {
        const notificationMenu = document.getElementById("notificationMenu");
        notificationMenu?.addEventListener("hidden.bs.dropdown", function (e) {
            dispatch(markNotification());
        });

        return () =>
            notificationMenu?.removeEventListener(
                "hidden.bs.dropdown",
                function (e) {
                    dispatch(markNotification());
                }
            );
    }, []);

    const handleSearch = () => {
        if (searchText) {
            let _filteredSearch = searchData.filter(
                (data) =>
                    data.content
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.name.toLowerCase().includes(searchText.toLowerCase())
            );

            setSearchResult(_filteredSearch);
        }
    };

    const handleOnClose = () => setSearchResult([]);

    const handleToggle = () => setIsActive(!isActive);

    return (
        <div className="flex-grow-1 d-flex flex-column">
            <SearchDialog
                searchResult={searchResult}
                handleOnClose={handleOnClose}
            />
            <div
                className="position-fixed"
                style={{ zIndex: 10, top: 60, right: 20 }}
            >
                {isError && (
                    <div
                        className="toast align-items-center text-white bg-danger border-0 my-2 show"
                        role="alert"
                        aria-live="assertive"
                    >
                        <div className="toast-body">{message}</div>
                    </div>
                )}
            </div>
            <nav
                className="navbar navbar-light bg-white py-0 "
                style={{ minHeight: 60 }}
            >
                <div className="container-fluid px-3">
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

                    <OffcanvasNavbar user={user} />
                    <div className="flex-grow-1 py-2">
                        <ul className="navbar-nav d-lg-flex flex-row d-none">
                            <li className="nav-item mx-2">
                                <Link
                                    to="/admin/dashboard"
                                    className={` nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboard"
                                            ? "active"
                                            : ""
                                    }`}
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item mx-2 dropdown">
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
                            <li className="nav-item dropdown mx-2">
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
                            <li className="nav-item dropdown mx-2">
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
                            <li className="nav-item mx-2">
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

                    <div className="flex-shrink-0 d-flex align-items-center">
                        <div className="me-2 dropdown">
                            <a
                                className="d-none dropdown-toggle"
                                type="button"
                                ref={dropBtnRef}
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                data-bs-auto-close="false"
                                data-bs-display="static"
                            ></a>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="submit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#searchModal"
                                    onClick={handleSearch}
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </div>

                        <div className="d-flex mx-2 align-items-center">
                            <img
                                src={user?.avatar}
                                alt={user?.name}
                                className="rounded-circle me-2"
                                width="32"
                                height="32"
                            />
                            <a
                                className="btn nav-link text-dark fw-bold mx-4"
                                href="#"
                                type="button"
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </a>
                        </div>
                        <button
                            className="navbar-toggler d-lg-none d-flex"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>
            <div className=" flex-grow-1 d-flex">
                <main className="flex-grow-1 wrapper d-flex align-items-stretch">
                    <nav
                        className={`sidebar flex-column flex-shrink-0 px-3 py-2 text-white d-lg-flex d-none bg-white `}
                        style={{ minWidth: 250 }}
                        id="sidebarMenu"
                    >
                        <ul className="nav nav-pills flex-column mb-auto py-5">
                            <li className="">
                                <Link
                                    to="/admin/dashboard"
                                    className={` nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboard"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <button
                                    className={`btn nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboard/analytics"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#analytics"
                                    aria-expanded="false"
                                    aria-controls="analytics"
                                >
                                    Analytics
                                </button>
                                <div className="collapse" id="analytics">
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics"
                                                className="nav-link"
                                            >
                                                Generate Report
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics/export-report"
                                                className="nav-link "
                                            >
                                                Export Report
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics/archived-report"
                                                className="nav-link "
                                            >
                                                Archived Report
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics/deleted-report"
                                                className="nav-link "
                                            >
                                                Deleted Report
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <button
                                    className={`btn nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboard/manage-account"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    Manage Account
                                </button>
                                <div className="collapse" id="collapseExample">
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account"
                                                className="nav-link "
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account/edit-profile"
                                                className="nav-link "
                                            >
                                                Review Profile
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account/change-password"
                                                className="nav-link "
                                            >
                                                Change Password
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account/delete-account"
                                                className="nav-link "
                                            >
                                                Delete Admin Account
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <button
                                    className={`btn nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboard/manage-users"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#manageUsers"
                                    aria-expanded="false"
                                    aria-controls="manageUsers"
                                >
                                    Manage Subscription
                                </button>
                                <div className="collapse" id="manageUsers">
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-users/subscription"
                                                className="nav-link "
                                            >
                                                Manage Subscription
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-users"
                                                className="nav-link "
                                            >
                                                View Users Activities
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <Link
                                    to="/admin/dashboard/settings"
                                    className={`nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboardsettings"
                                            ? "active-tab"
                                            : ""
                                    }`}
                                >
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex-grow-1 d-flex flex-column">
                        <div className="flex-grow-1">{children}</div>

                        <AdminFooter dark={true} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardContainer;
