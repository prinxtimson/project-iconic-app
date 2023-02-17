import UsersTable from "../components/UsersTable";
import ReactGA from "react-ga";
import AdminDashboardContainer from "../components/AdminDashboardContainer";
import { useEffect } from "react";

const AllUsers = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
        document.title = "User Activities Page";
    }, []);

    return (
        <AdminDashboardContainer>
            <UsersTable />
        </AdminDashboardContainer>
    );
};

export default AllUsers;
