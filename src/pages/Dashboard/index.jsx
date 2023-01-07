import React, { useMemo, lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import "./style.scss";

// Components
import Menu from "../../components/Menu";

// Rule Routes
const AdminRoutes = lazy(() => import("./routes/admin"));
const StudentRoutes = lazy(() => import("./routes/student"));

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
      }
    };

    return routes[rule]();
  }, [rule]);

  return (
    <div className="dashboard">
      <aside>
        <Menu />
      </aside>

      <section style={{ width: "100%" }}>
        <Suspense>{RouteRules}</Suspense>
      </section>
    </div>
  );
};

export default Dashboard;
