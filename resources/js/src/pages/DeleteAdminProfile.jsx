import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import { deleteAccount, reset } from "../features/auth/authSlice";

const DeleteAdminProfile = () => {
    const { t } = useTranslation(["profile"]);

    const dispatch = useDispatch();
    const { user, isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Delete Profile Page";
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [isError]);

    const handleDeleteAccount = () => {
        if (
            window.confirm(
                'You have requested to permanently delete your account. This will mean you will no longer be able to access the portal. Click "YES" if you are sure you really want to permanently delete your account. Click "NO" to stop or continue to access your account.'
            )
        ) {
            dispatch(deleteAccount());
        }
    };

    return (
        <AdminDashboardContainer>
            <div className="container">
                <div className="my-4">
                    <h1 className="card-title fw-bold text-center">
                        Delete Admin Account
                    </h1>
                </div>
                <div
                    className="card my-5 m-auto p-2"
                    style={{ maxWidth: "440px" }}
                >
                    <div className="card-body">
                        {isError && (
                            <div
                                className={`alert alert-danger py-2`}
                                role="alert"
                            >
                                {message}
                            </div>
                        )}
                        <div className="form row g-3">
                            <div className="py-2 position-relative">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="rounded-circle mx-auto d-block"
                                    width={150}
                                    height={150}
                                />
                            </div>
                            <div className="text-center py-4">
                                <h5>{user.name}</h5>
                            </div>
                        </div>
                        <div className="d-grid gap-2 col-12 py-3 mx-auto">
                            <button
                                className={`btn btn-${
                                    isLoading ? "secondary" : "danger"
                                } btn-lg text-white`}
                                type="button"
                                disabled={isLoading}
                                onClick={handleDeleteAccount}
                            >
                                {t("delete_btn")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardContainer>
    );
};

export default DeleteAdminProfile;
