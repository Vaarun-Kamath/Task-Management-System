import React from "react";
import UserContributions from "@/components/charts/UserContributions";

const UserStatistics = () => {
  return (
    <div>
      <h1>Tasks Completion Insights</h1>
      <h1>Tasks Insights</h1>
      <UserContributions projectId="65fc000186af725e003b0042" />
    </div>
  );
};

export default UserStatistics;
