import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ManagerOnly({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== "manager") {
        return <Navigate to="/no-permission" replace />;
    }
    return children;
}