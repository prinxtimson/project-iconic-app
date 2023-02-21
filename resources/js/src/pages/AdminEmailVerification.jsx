import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminContainer from "../components/AdminContainer";
import ReactGA from "react-ga";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { resendVerification, reset } from "../features/auth/authSlice";

const AdminEmailVerification = () => {
    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        dispatch(reset());
        ReactGA.pageview(window.location.pathname);
        document.title = "Email Verification Page";
    }, []);

    useEffect(() => {
        if (isSuccess) {
            message &&
                toast.success(message, { onClose: () => dispatch(reset()) });
        }
    }, [isError, isSuccess, message, dispatch]);

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
                                    Email Verification
                                </h1>
                                {isError && (
                                    <div
                                        className={`alert alert-danger py-2`}
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                )}
                                <div className="my-5 ">
                                    <p className="text-center">
                                        Congratulations you have successfully
                                        created your admin account. Please check
                                        your registered email address inbox to
                                        confirm and verify your email address.
                                    </p>
                                </div>

                                <div className="d-grid gap-2 col-12 mx-auto my-2">
                                    <button
                                        className={`btn c-btn ${
                                            isLoading ? "btn-secondary" : ""
                                        } btn-lg`}
                                        type="submit"
                                        disabled={isLoading}
                                        onClick={() =>
                                            dispatch(resendVerification())
                                        }
                                    >
                                        Resend Verification Email
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminEmailVerification;
