import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import { useTranslation } from "react-i18next";
import AdminContainer from "../components/AdminContainer";

const AdminHome = () => {
    const { t } = useTranslation(["home"]);

    const { user, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Admin Home Page";
    }, []);

    return (
        <AdminContainer>
            <div className="" style={{ minHeight: "100%" }}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <h1
                            className="display-3 fw-bold text-center "
                            //style={{ color: "blue" }}
                        >
                            {t("welcome")}
                        </h1>
                        <div className="col">
                            <h2 className="fs-1 text-center">Elint-X</h2>

                            <p>
                                Elint-X is focused on ensuring that users are
                                provided with data trends that are consistent
                                with the current AI market trends. Elint-X
                                serves customers around the world and focuses on
                                providing rich data that can be used by
                                marketers, researchers, business start-ups and
                                individuals to improve their decision making.
                                Elint-X provides access to vital resources to
                                enable a global community aggregate solution to
                                real life challenges. Our mission is to ensure
                                we create a platform that provides a superlative
                                user experience for analysing real-world data
                                empowering individuals to make cutting edge
                                decisions.
                            </p>
                        </div>
                        <div className="col d-sm-none d-md-block">
                            <img
                                style={{ width: "100%" }}
                                src="/images/IoT-Analytics.jpg"
                                alt="Metrix"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminContainer>
    );
};

export default AdminHome;
