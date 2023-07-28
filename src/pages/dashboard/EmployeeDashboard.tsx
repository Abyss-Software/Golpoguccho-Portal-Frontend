import CommonDataTable from '@/components/dataTable/CommonDataTable';
import ProfileCard from '@/components/employee/profile/ProfileCard';
import { Tabs } from '@mantine/core';
import React from 'react';
import { IEvents } from '@/interfaces/createBooking.interface';

import { eventsColumns, eventList } from '@/constants/dummyData';
import ProfileForm from '@/components/employee/profile/ProfileForm';

const EmployeeDashboard = () => {
  return (
    <div>
      <ProfileCard />
      <div className="p-10">
        <Tabs defaultValue="events">
          <Tabs.List grow position="center">
            <Tabs.Tab value="events">Assigned Events</Tabs.Tab>
            <Tabs.Tab value="profile">Profile Details</Tabs.Tab>
            <Tabs.Tab value="earnings">Earnings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="events" pt="xs">
            <CommonDataTable<IEvents>
              data={eventList}
              columns={eventsColumns}
              handleRowClick={(row) => {
                console.log(row);
              }}
            />
          </Tabs.Panel>
          <Tabs.Panel value="profile" pt="xs">
            <ProfileForm />
          </Tabs.Panel>
          <Tabs.Panel value="earnings" pt="xs">
            <CommonDataTable<IEvents>
              data={eventList}
              columns={eventsColumns}
              handleRowClick={(row) => {
                console.log(row);
              }}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
