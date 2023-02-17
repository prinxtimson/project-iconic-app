import Subscription from "../components/SubscriptionTable";
import ReactGA from "react-ga";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import { useEffect } from "react";

const SubscriptionTable = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "Subscription Table Page";
    }, []);

    return (
        <AdminDashboardContainer>
            <Subscription />
        </AdminDashboardContainer>
    );
};

export default SubscriptionTable;
