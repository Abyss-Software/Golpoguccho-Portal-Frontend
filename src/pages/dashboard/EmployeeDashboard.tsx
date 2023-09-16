import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { IEvents } from '@/interfaces/createBooking.interface';
import ProfileCard from '@/components/employee/profile/ProfileCard';
import ProfileForm from '@/components/employee/profile/ProfileForm';
import { Tabs } from '@mantine/core';
import { useAuthStore } from '@/contexts/authContext';
import useEmployeeAction from '@/hooks/useEmployeeActions';
import useEventAction from '@/hooks/useEventAction';
import EmployeeEventsTable from '@/components/employee/EmployeeEventsTable';
import { useParams } from 'react-router-dom';

const EmployeeDashboard = () => {
  const { userInfo } = useAuthStore();
  const { fetchEmployee } = useEmployeeAction();
  const { fetchEventsByEmployeeId } = useEventAction();

  const { employeeId } = useParams();

  const { data: employee, isLoading } = fetchEmployee(
    employeeId ? employeeId : userInfo?.id!
  );

  const { data: eventList, isLoading: isEmpEventsLoading } =
    fetchEventsByEmployeeId(employee?.id!);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ProfileCard employeeData={employee} />
          <div className="p-10">
            <Tabs defaultValue="events">
              <Tabs.List grow position="center">
                <Tabs.Tab value="events">Assigned Events</Tabs.Tab>
                <Tabs.Tab value="profile">Profile Details</Tabs.Tab>
                <Tabs.Tab value="earnings">Earnings</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="events" pt="xs">
                {isEmpEventsLoading ? (
                  <>Loading</>
                ) : (
                  <EmployeeEventsTable employeeEvents={eventList} />
                )}
              </Tabs.Panel>

              <Tabs.Panel value="profile" pt="xs">
                <ProfileForm employeeData={employee} />
              </Tabs.Panel>

              <Tabs.Panel value="earnings" pt="xs">
                {/* <CommonDataTable<IEvents>
                 data={eventList}
                 columns={eventsColumns}
                 handleRowClick={(row) => {
                   console.log(row);
                 }}
               /> */}
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
