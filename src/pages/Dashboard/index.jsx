import React, { useMemo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

// Components
import Menu from "../../components/Menu";

// Rule Routes
const AdminRoutes = lazy(() => import("./routes/admin"));
const StudentRoutes = lazy(() => import("./routes/student"));
const TeacherRoutes = lazy(() => import("./routes/teacher"));

const Dashboard = () => {

  const rule = useSelector(function (state) {
    return state.rule;
  });

  const RouteRules = useMemo(() => {
    const routes = {
      admin: function () {
        return <AdminRoutes />;
      },
      student: function () {
        return <StudentRoutes />;
      },
      teacher: function () {
        return <TeacherRoutes />;
      },
    };

    return routes[rule]();
  }, [rule]);

  return (
      <div className="dashboard">
        <Menu />

        <section style={{ width: "100%", padding: 10 }}>
          <Suspense>{RouteRules}</Suspense>
        </section>
      </div>
  );
};

export default Dashboard;
