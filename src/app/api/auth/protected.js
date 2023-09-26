// utils/auth.js
export function protectRoute(Component) {
    return (props) => {
      // Check if the user is authenticated using Passport.js
      if (userIsAuthenticated()) {
        return <Component {...props} />;
      } else {
        // Redirect to the login page or perform other actions
        router.push('/login');
        return null; // Render nothing or a loading spinner while redirecting
      }
    };
  }
  
  // pages/protected.js
  import { protectRoute } from '../utils/auth';
  
  function ProtectedPage() {
    return <div>This is a protected page.</div>;
  }
  
  export default protectRoute(ProtectedPage);
  