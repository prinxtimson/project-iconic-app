import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AdminContainer from "../components/AdminContainer";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { resetPass, reset } from "../features/auth/authSlice";

const AdminResetPassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["reset-password"]);
    const { token } = useParams();
    const search = new URLSearchParams(useLocation().search);
    const [visible, setVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);
    const [formData, setFormData] = useState({
        token,
        email: search.get("email"),
        password: "",
        password_confirmation: "",
    });

    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const { password, password_confirmation } = formData;

    const handleOnChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);

        if (isSuccess) {
            message && toast.success(message);
            setFormData({
                ...formData,
                password: "",
                password_confirmation: "",
            });
            navigate("../login");
        }
    }, [isError, isSuccess, message, dispatch]);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        dispatch(resetPass(formData));
    };

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Reset Password Page";
    }, []);

    return (
        <AdminContainer>
            <div className="bg-white">
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "540px" }}
                >
                    <div className="card-body">
                        <h1 className="card-title fw-bold text-center">
                            {t("title")}
                        </h1>
                        <p>
                            Please enter your new password so that your account
                            password reset can be verified and completed.
                        </p>
                        {isError && (
                            <div
                                className={`alert alert-danger py-2`}
                                role="alert"
                            >
                                {message}
                            </div>
                        )}
                        <form
                            onSubmit={handleOnSubmit}
                            className="form row g-3"
                        >
                            <div className="input-group col-12">
                                <div className="form-floating ">
                                    <input
                                        type={visible ? "text" : "password"}
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

                            <div className="input-group col-12">
                                <div className="form-floating ">
                                    <input
                                        type={
                                            confirmPassVisible
                                                ? "text"
                                                : "password"
                                        }
                                        className="form-control form-control-lg"
                                        value={password_confirmation}
                                        placeholder="Confirm password"
                                        id="floatingInput"
                                        name="password_confirmation"
                                        onChange={handleOnChange}
                                        required
                                    />
                                    <label htmlFor="floatingInput">
                                        {t("confirm_password")}
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        setConfirmPassVisible(
                                            !confirmPassVisible
                                        )
                                    }
                                >
                                    {confirmPassVisible ? (
                                        <i className="fa fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa fa-eye"></i>
                                    )}
                                </button>
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
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminResetPassword;
