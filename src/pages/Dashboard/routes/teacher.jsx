import React from "react";
import { Route } from "react-router-dom";

// Pages

const TeacherRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Techer dashboard</div>
        </Route>
      </>
  );
};

export default TeacherRoutes;