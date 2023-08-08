import { Navigate } from "react-router-dom";

const CheckAdmin = ({ isAdmin, children }) => {
    if (!isAdmin) {
        return <Navigate to="/student" replace />;
    }
    return children;
};
export default CheckAdmin;