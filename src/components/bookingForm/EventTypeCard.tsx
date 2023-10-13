import { IEventType } from '@/interfaces/packages.interface';
import { Paper } from '@mantine/core';
import { twMerge } from 'tailwind-merge';

type EventTypeCardProps = {
  eventType: IEventType;
  selected?: boolean;
  onClick: () => any;
  error?: boolean;
};

function EventTypeCard({
  eventType,
  selected,
  onClick,
  error,
}: EventTypeCardProps) {
  return (
    <Paper
      onClick={onClick}
      className={twMerge(
        'border border-transparent p-2 flex gap-4 rounded-xl shadow-md shadow-shadowColor items-center cursor-pointer overflow-hidden hover:shadow-lg transition-shadow',
        selected
          ? 'bg-primaryLightColor dark:text-black'
          : error && 'border-errorColor'
      )}
    >
      <img
        src={eventType.image}
        alt={eventType.title}
        className="h-28 aspect-square rounded-xl object-cover"
      />
      <div>
        <h1 className="text-lg font-semibold whitespace-pre-wrap">
          {eventType.title}
        </h1>
        <h2 className="text-base">{eventType.packages.length} Packages</h2>
      </div>
    </Paper>
  );
}

export default EventTypeCard;
