
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
type Types = {
   isLoggedIn: boolean
   children: ReactNode
}
const ProtectedRoute = ({ isLoggedIn, children }: Types) => {
   if (!isLoggedIn) {
      return <Navigate to="/" />;
   } else {
      return <Navigate to="/login" />;
   }
   return children;
};
export default ProtectedRoute;
