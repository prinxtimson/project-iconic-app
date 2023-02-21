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
    const [searchResult, setSearchResult] = useState({
        pages: [],
        users: [],
        reports: [],
    });
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

    const handleSearch = async () => {
        if (searchText) {
            let _filteredSearch = searchData.filter(
                (data) =>
                    data.content
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    data.name.toLowerCase().includes(searchText.toLowerCase())
            );

            let res = await axios.get(`/api/users/search?search=${searchText}`);
            let users = res.data || [];
            res = await axios.get(`/api/report/search?search=${searchText}`);
            let reports = res.data || [];

            setSearchResult({
                ...searchResult,
                pages: _filteredSearch,
                users,
                reports,
            });
        }
    };

    const handleOnClose = () =>
        setSearchResult({ pages: [], users: [], reports: [] });

    const handleToggle = () => setIsActive(!isActive);

    return (
        <div
            className="flex-grow-1 d-flex flex-column"
            style={{ maxHeight: "100%" }}
        >
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
                className="navbar navbar-light navbar-expand-lg bg-white py-0"
                style={{ minHeight: 60 }}
            >
                <div className="container-fluid px-3">
                    <Link
                        id="brand"
                        className="navbar-brand "
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
                                className="btn nav-link text-danger fw-bold mx-4"
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
                        className={`navbar sidebar flex-column flex-shrink-0 px-3 py-2  d-lg-flex d-none bg-white `}
                        style={{ minWidth: 250 }}
                        id="sidebarMenu"
                    >
                        <ul className="navbar-nav nav-pills flex-column py-5 w-100">
                            <li className="nav-item ">
                                <Link
                                    to="/admin/dashboard"
                                    className={`c-navlink px-3 nav-link fw-bold ${
                                        window.location.pathname ===
                                        "/admin/dashboard"
                                            ? "c-active"
                                            : ""
                                    }`}
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a
                                    className={`c-navlink px-3 nav-link fw-bold ${
                                        window.location.pathname.match(
                                            /\/admin\/dashboard\/analytics(\/[a-z]*-?[a-z]*)?/
                                        )
                                            ? "c-active"
                                            : ""
                                    }`}
                                    href="#"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#analytics"
                                    aria-expanded="false"
                                    aria-controls="analytics"
                                >
                                    Analytics
                                </a>
                                <div className="collapse" id="analytics">
                                    <ul className="navbar-nav nav-pills flex-column ">
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        /^\/admin\/dashboard\/analytics$/
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Generate Report
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics/export-report"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/analytics/export-report"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Export Report
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics/archived-report"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/analytics/archived-report"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Archived Report
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/analytics/deleted-report"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/analytics/deleted-report"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Deleted Report
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li>
                                <a
                                    className={`c-navlink px-3 nav-link fw-bold ${
                                        window.location.pathname.match(
                                            /\/admin\/dashboard\/manage-account(\/[a-z]*-?[a-z]*)?/
                                        )
                                            ? "c-active"
                                            : ""
                                    }`}
                                    type="button"
                                    href="#"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample"
                                    aria-expanded="false"
                                    aria-controls="collapseExample"
                                >
                                    Manage Account
                                </a>
                                <div className="collapse" id="collapseExample">
                                    <ul className="navbar-nav nav-pills flex-column mb-auto">
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        /^\/admin\/dashboard\/manage-account$/
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account/edit-profile"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/manage-account/edit-profile"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Review Profile
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account/change-password"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/manage-account/change-password"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Change Password
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-account/delete-account"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/manage-account/delete-account"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Delete Admin Account
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <a
                                    className={`c-navlink px-3 nav-link fw-bold ${
                                        window.location.pathname.match(
                                            /\/admin\/dashboard\/manage-users(\/[a-z]*-?[a-z]*)?/
                                        )
                                            ? "c-active"
                                            : ""
                                    }`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#manageUsers"
                                    aria-expanded="false"
                                    aria-controls="manageUsers"
                                >
                                    Manage Subscription
                                </a>
                                <div className="collapse" id="manageUsers">
                                    <ul className="navbar-nav nav-pills flex-column mb-auto">
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-users/subscription"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        "/admin/dashboard/manage-users/subscription"
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
                                            >
                                                Manage Subscription
                                            </Link>
                                        </li>
                                        <li className="ps-3">
                                            <Link
                                                to="/admin/dashboard/manage-users"
                                                className={`nav-link fw-bold c-sub-navlink px-3 ${
                                                    window.location.pathname.match(
                                                        /^\/admin\/dashboard\/manage-users$/
                                                    )
                                                        ? "c-sub-active"
                                                        : ""
                                                }`}
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
                                    className={`c-navlink px-3 nav-link fw-bold ${
                                        window.location.pathname.match(
                                            "/admin/dashboard/settings"
                                        )
                                            ? "c-active"
                                            : ""
                                    }`}
                                >
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex-grow-1 d-flex flex-column">
                        <div
                            className="flex-grow-1 overflow-auto"
                            style={{ maxHeight: "80vh" }}
                        >
                            {children}
                        </div>

                        <AdminFooter dark={true} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboardContainer;
