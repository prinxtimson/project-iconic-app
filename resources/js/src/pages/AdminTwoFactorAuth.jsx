import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ReactGA from "react-ga";
import AdminContainer from "../components/AdminContainer";
import {
    verifyCode,
    resendCode,
    reset,
    getCurrentUser,
} from "../features/auth/authSlice";

const AdminTwoFactorAuth = () => {
    const [data, setData] = useState({
        code: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(reset());
        ReactGA.pageview(window.location.pathname);
        document.title = "Two Factor Auth Page";
    }, []);

    useEffect(() => {
        if (isSuccess) {
            message &&
                toast.success(message, { onClose: () => dispatch(reset()) });
            //dispatch(reset());
            dispatch(getCurrentUser());
        }
    }, [isSuccess, message, navigate, dispatch]);

    useEffect(() => {
        if (user) {
            navigate("/admin/dashboard", { replace: true });
        }
        if (message == "Your email address is not verified.") {
            navigate("/email/verify");
        }
    }, [user, isError, isSuccess, message]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyCode(data));
    };

    return (
        <AdminContainer>
            <div className="container-fluid bg-white">
                <div className="form-demo tw-mb-4 tw-text-white">
                    <div className="flex justify-content-center tw-flex-col tw-items-center">
                        <div
                            className="card my-5 m-auto p-2"
                            style={{ maxWidth: "540px" }}
                        >
                            <div className="card-body">
                                <h1 className="text-center fw-bold">
                                    Two Factor Authentication
                                </h1>
                                <div className="my-2 ">
                                    <p className="text-center">
                                        A One-Time Passcode (OTP) has been sent
                                        to your registered email address. Please
                                        enter this here to confirm your
                                        identity. This code is only valid within
                                        the next 10minutes.
                                    </p>
                                </div>
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
                                            className="form-control form-control-lg"
                                            value={data.code}
                                            placeholder="Code"
                                            id="floatingInput"
                                            name="code"
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">
                                            Enter OTP
                                        </label>
                                    </div>
                                    <div className="d-flex justify-content-between col-12 mx-auto">
                                        <button
                                            className={`btn c-btn ${
                                                isLoading ? "btn-secondary" : ""
                                            } btn-lg`}
                                            type="submit"
                                            disabled={isLoading}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className={`btn btn-outline-${
                                                isLoading ? "secondary" : "dark"
                                            } btn-lg`}
                                            type="button"
                                            disabled={isLoading}
                                            onClick={() =>
                                                dispatch(resendCode())
                                            }
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminTwoFactorAuth;
