import StatCard from "@/components/adminDashboard/StatCard";

import User3LineIcon from "remixicon-react/User3LineIcon";
import BookmarkLineIcon from "remixicon-react/BookmarkLineIcon";
import CalendarEventLineIcon from "remixicon-react/CalendarEventLineIcon";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* First Column */}
      <div className="md:flex-1 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:flex-1">
            <StatCard
              icon={User3LineIcon}
              title={"Total Bookings"}
              value={totalBookings}
            />
          </div>
          <div className="md:flex-1 ">
            <StatCard />
          </div>
          <div className="md:flex-1 ">
            <StatCard />
          </div>
        </div>
        <div className="bg-red-200">5</div>
      </div>

      {/* Second Column */}
      <div className="md:flex-[.5] bg-red-200">4</div>
    </div>
  );
};

export default AdminDashboard;
