import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import AdminContainer from "../components/AdminContainer";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { login, reset } from "../features/auth/authSlice";

const AdminLogin = () => {
    const { t } = useTranslation(["login"]);
    const [checkBox, setCheckBox] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Admin Login Page";
        setFormData({
            email: localStorage.getItem("maxximo_user_email") || "",
            password: localStorage.getItem("maxximo_user_pass") || "",
        });
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            navigate("/admin/two-factor-auth");
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const { email, password } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (checkBox) {
            localStorage.setItem("maxximo_user_email", email);
            localStorage.setItem("maxximo_user_pass", password);
        }
        dispatch(login(formData));
    };

    return (
        <AdminContainer>
            <div className="container-fluid bg-white">
                <div className="row align-items-center">
                    <div className="col">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "540px" }}
                        >
                            <div className="card-body">
                                <h1 className="card-title fw-bold text-center">
                                    Account Login
                                </h1>
                                <p className="lead text-center">
                                    <i className="fas fa-user"></i>{" "}
                                    {t("sub_title")}
                                </p>
                                {isError && (
                                    <div
                                        className={`alert alert-danger alert-dismissible fade show`}
                                        role="alert"
                                    >
                                        {message}
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="alert"
                                            aria-label="Close"
                                            onClick={() => dispatch(reset())}
                                        ></button>
                                    </div>
                                )}
                                <form
                                    onSubmit={handleOnSubmit}
                                    className="form row g-3 "
                                >
                                    <div className="form-floating col-12">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            value={email}
                                            placeholder="Email"
                                            id="floatingInput"
                                            name="email"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            {t("email")}
                                        </label>
                                    </div>
                                    <div className="input-group col-12">
                                        <div className="form-floating ">
                                            <input
                                                type={
                                                    visible
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control form-control-lg"
                                                value={password}
                                                placeholder="Password"
                                                id="floatingInput"
                                                name="password"
                                                onChange={handleOnChange}
                                                required
                                            />
                                            <label htmlFor="floatingInput">
                                                {t("password")}
                                            </label>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            onClick={() => setVisible(!visible)}
                                        >
                                            {visible ? (
                                                <i className="fa fa-eye-slash"></i>
                                            ) : (
                                                <i className="fa fa-eye"></i>
                                            )}
                                        </button>
                                    </div>

                                    <div className="">
                                        {/* <ReCAPTCHA
                                            sitekey="6LecV4AeAAAAAK2akj_MsDO7nm4IzleCo6MY2rVX"
                                            onChange={onChange}
                                        /> */}
                                    </div>
                                    <div className="my-1 d-flex justify-content-between">
                                        <div className="">
                                            {/* <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value=""
                                                    id="flexCheckChecked"
                                                    defaultChecked={checkBox}
                                                    onClick={toggleCheckBox}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="flexCheckChecked"
                                                >
                                                    {t("remember_me")}
                                                </label>
                                            </div> */}
                                        </div>
                                        <div className="">
                                            <Link to="/admin/forgot-password">
                                                {t("forgot_password")}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-12 mx-auto">
                                        <button
                                            className={`btn c-btn ${
                                                isLoading ? "btn-secondary" : ""
                                            } btn-lg`}
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            {t("btn_text")}
                                        </button>
                                    </div>
                                </form>
                                {/* <p className="my-1">
                                    {`${t("do_not_have_account")} `}
                                    <Link to="/register">{t("register")}</Link>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminLogin;
