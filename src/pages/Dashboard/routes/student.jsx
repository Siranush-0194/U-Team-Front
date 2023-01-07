import React from "react";
import { Route } from "react-router-dom";

// Pages

const StudentRoutes = () => {
  return (
      <>
        <Route exact path="/dashboard">
          <div className="welcome">Welocome to Admin dashboard</div>
        </Route>
      </>
  );
};

export default StudentRoutes;
