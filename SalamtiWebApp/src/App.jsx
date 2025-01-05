import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/Firebase";
import routes from "./Components/Routing/RouteConfig";
import ProtectedRoute from "./Components/Routing/ProtectedRoute";
import NotFound from "./Components/Pages/NotFound";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        {routes.map(({ path, component, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected ? (
                <ProtectedRoute user={user}>{component}</ProtectedRoute>
              ) : (
                component
              )
            }
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
