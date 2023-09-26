// utils/auth.js
export function protectRoute(Component) {
    return (props) => {
      // Check user authentication or authorization here
      // Redirect to login page or perform other actions if necessary
  
      return <Component {...props} />;
    };
  }
  