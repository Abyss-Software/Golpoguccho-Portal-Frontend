import StatCard from '@/components/adminDashboard/StatCard';
import User3LineIcon from 'remixicon-react/User3LineIcon';
import BookmarkLineIcon from 'remixicon-react/BookmarkLineIcon';
import CalendarEventLineIcon from 'remixicon-react/CalendarEventLineIcon';
import { useEffect, useState } from 'react';
import { LoadingOverlay, Button, Card } from '@mantine/core';
import PieChart from '@/components/adminDashboard/PieChart';
import LineChart from '@/components/adminDashboard/LineChart';
import useStatAction from '@/hooks/useStatAction';
import { DateInput } from '@mantine/dates';
import { useIsMutating } from '@tanstack/react-query';
import useEventAction from '@/hooks/useEventAction';

const AdminDashboard = () => {
  const {
    fetchCountsBetweenMutation,
    fetchMonthlyCountsBetweenMutation,
    fetchTotals,
    fetchBestSellers,
  } = useStatAction();
  const { fetchEvents } = useEventAction();

  const [monthlyCounts, setMonthlyCounts] = useState();
  const [stats, setStats] = useState({
    bookings: null,
    events: null,
    users: null,
  });
  const { data: totals, isLoading } = fetchTotals();
  const { data: events, isLoading: isEventsLoading } = fetchEvents();
  const { data: bestSellers, isLoading: isBestSellersLoading } =
    fetchBestSellers();

  const [startDate, setStartDate] = useState<Date | null>(
    new Date('2023-09-15')
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [eventStatus, setEventStatus] = useState({
    completedEvents: 0,
    upcomingEvents: 0,
  });

  console.log(events);

  useEffect(() => {
    let completedEvents = 0;
    let upcomingEvents = 0;
    if (events?.length > 0) {
      events.forEach((event: any) => {
        if (event.status === 'completed') {
          completedEvents++;
        } else {
          upcomingEvents++;
        }
      });
    }
    setEventStatus({ completedEvents, upcomingEvents });
  }, [events]);

  const handleCountsBetween = async () => {
    fetchCountsBetweenMutation.mutate(
      { start: startDate!, end: endDate! },
      {
        onSuccess: (res) => {
          setStats(res.body);
        },
      }
    );

    fetchMonthlyCountsBetweenMutation.mutate(
      { start: startDate!, end: endDate! },
      {
        onSuccess: (res) => {
          console.log(res.data);
          setMonthlyCounts(res.data);
        },
      }
    );
  };

  console.log(stats);

  const isMutating = useIsMutating();

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <LoadingOverlay visible={isMutating > 0} overlayBlur={2} />

      <div className="md:flex-1 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:flex-1">
            <StatCard
              Icon={BookmarkLineIcon}
              title={'Total Bookings'}
              value={
                stats.bookings !== null
                  ? stats.bookings
                  : totals?.body?.bookings
              }
            />
          </div>
          <div className="md:flex-1 ">
            <StatCard
              Icon={CalendarEventLineIcon}
              title={'Total Events'}
              value={
                stats.events !== null ? stats.events : totals?.body?.events
              }
            />
          </div>
          <div className="md:flex-1 ">
            <StatCard
              Icon={User3LineIcon}
              title={'Total Users'}
              value={stats.users !== null ? stats.users : totals?.body?.users}
            />
          </div>
        </div>
        <div className="flex items-end gap-3 ">
          <DateInput
            label="Start Date"
            placeholder="Start Date"
            size="lg"
            className="w-full"
            value={startDate}
            onChange={setStartDate}
          />
          <DateInput
            label="End Date"
            placeholder="End Date"
            size="lg"
            className="w-full"
            value={endDate}
            onChange={setEndDate}
          />

          <Button
            onClick={handleCountsBetween}
            loading={isLoading}
            color="green"
            size="lg"
            className=""
          >
            Get Stats
          </Button>
        </div>
        <div>
          <Card withBorder shadow="sm" radius="md" className="p-5">
            <h2>Monthly Stats</h2>
            <Card.Section className="text-center" mt="sm" withBorder>
              {monthlyCounts ? (
                <LineChart stats={monthlyCounts} />
              ) : (
                <div className="text-center">
                  <div className="animate-spin rounded-full 2 border-b-2 border-primaryColor"></div>
                  <h3 className="text-primaryColor">
                    Select Start Date and End Date
                  </h3>
                </div>
              )}
            </Card.Section>
          </Card>
        </div>
      </div>

      {/* Second Column */}
      <div className="md:flex-[.5]">
        <Card withBorder shadow="sm" radius="md" className="p-5">
          <h2>Best Selling Packages</h2>
          <Card.Section className="text-center" mt="sm" withBorder>
            {bestSellers && <PieChart stats={bestSellers.body} />}
          </Card.Section>
          <Card.Section className="text-center" mt="sm" withBorder>
            {events && (
              <div className="flex flex-col gap-3 m-4">
                <p className="">Total Events: {events.length} </p>
                <p className="text-sky-700">
                  Upcoming Events: {eventStatus.upcomingEvents}{' '}
                </p>
                <p className="text-primaryColor">
                  Completed Events: {eventStatus.completedEvents}
                </p>
              </div>
            )}
          </Card.Section>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
