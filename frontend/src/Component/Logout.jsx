// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// function Logout() {
//   const [confirmLogout, setConfirmLogout] = useState(false);

  

//   useEffect(() => {
//     if (!confirmLogout) {
//       const confirm = window.confirm("Are you sure you want to logout?");
//       if (confirm) {
//         onLogout();
//         setConfirmLogout(true);
//       }
//     }
//   }, []);

//   // If user confirms logout, navigate to "/login", otherwise, do nothing
//   return (
//     <>
//       {confirmLogout && <Navigate to="/login" replace />}
//     </>
//   );
// }

// export default Logout;
