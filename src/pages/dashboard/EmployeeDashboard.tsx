import ProfileCard from '@/components/employee/profile/ProfileCard';
import ProfileForm from '@/components/employee/profile/ProfileForm';
import { Button, Card, Tabs } from '@mantine/core';
import { useAuthStore } from '@/contexts/authContext';
import useEmployeeAction from '@/hooks/useEmployeeActions';
import useEventAction from '@/hooks/useEventAction';
import EmployeeEventsTable from '@/components/employee/EmployeeEventsTable';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';
import SalaryPaymentForm from '@/components/employee/profile/SalaryPaymentForm';

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

  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    if (eventList?.length > 0) {
      let total = 0;
      eventList.forEach((event: any) => {
        total += event.payment;
      });
      setEarnings(total);
    }
  }, [eventList]);

  const handleMakeSalary = () => {
    modals.open({
      title: 'Make Salary Payment',
      centered: true,
      size: 'lg',
      zIndex: 50,
      children: <SalaryPaymentForm employeeId={employee?.id!} />,
    });
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <ProfileCard employeeData={employee} />
          <div className="flex items-center justify-between gap-4 m-5">
            <Card
              shadow="sm"
              radius="md"
              className="p-5 text-center"
              style={{ width: '32%' }}
            >
              <h4>Earnings: {earnings}</h4>
            </Card>
            <Card
              shadow="sm"
              radius="md"
              className="p-5 text-center"
              style={{ width: '32%' }}
            >
              <h4>Paid: {employee?.paid}</h4>
            </Card>
            <Card
              shadow="sm"
              radius="md"
              className="p-5 text-center"
              style={{ width: '32%' }}
            >
              <h4>Due: {earnings - employee?.paid!}</h4>
            </Card>

            {userInfo?.role === 'ADMIN' && (
              <Button
                color="green"
                size="lg"
                className=""
                onClick={handleMakeSalary}
              >
                Pay Salary
              </Button>
            )}
          </div>
          <div className="p-10">
            <Tabs defaultValue="events">
              <Tabs.List grow position="center">
                <Tabs.Tab value="events">Assigned Events</Tabs.Tab>
                <Tabs.Tab value="profile">Profile Details</Tabs.Tab>
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
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
