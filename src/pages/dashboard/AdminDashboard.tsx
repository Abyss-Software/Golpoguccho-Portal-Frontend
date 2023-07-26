import StatCard from '@/components/adminDashboard/StatCard';

import User3LineIcon from 'remixicon-react/User3LineIcon';
import BookmarkLineIcon from 'remixicon-react/BookmarkLineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import { useState } from 'react';

import { Card } from '@mantine/core';
import PieChart from '@/components/adminDashboard/PieChart';
import LineChart from '@/components/adminDashboard/LineChart';

const AdminDashboard = () => {
  const totalBookings = 5;
  const totalEvents = 15;
  const totalUsers = 25;

  return (
    <div className="flex flex-col md:flex-row gap-5">
      {/* First Column */}
      <div className="md:flex-1 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:flex-1">
            <StatCard
              Icon={BookmarkLineIcon}
              title={'Total Bookings'}
              value={totalBookings}
            />
          </div>
          <div className="md:flex-1 ">
            <StatCard
              Icon={CalendarEventLineIcon}
              title={'Total Events'}
              value={totalEvents}
            />
          </div>
          <div className="md:flex-1 ">
            <StatCard
              Icon={User3LineIcon}
              title={'Total Users'}
              value={totalUsers}
            />
          </div>
        </div>
        <div>
          <Card withBorder shadow="sm" radius="md" className="p-5">
            <h2>Orders</h2>
            <Card.Section className="text-center" mt="sm" withBorder>
              <LineChart />
            </Card.Section>
          </Card>
        </div>
      </div>

      {/* Second Column */}
      <div className="md:flex-[.5]">
        <Card withBorder shadow="sm" radius="md" className="p-5">
          <h2>Best Sellers</h2>
          <Card.Section className="text-center" mt="sm" withBorder>
            <PieChart />
          </Card.Section>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
