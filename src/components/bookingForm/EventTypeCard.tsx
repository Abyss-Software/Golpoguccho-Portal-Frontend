import { EventType } from "./EventTypeSelectForm";
import { twMerge } from "tailwind-merge";

type EventTypeCardProps = {
  eventType: EventType;
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
    <div
      onClick={onClick}
      className={twMerge(
        "bg-white p-2 flex gap-4 rounded-xl shadow items-center cursor-pointer border overflow-hidden hover:shadow-lg transition-shadow",
        selected ? "bg-primaryLighterColor" : error && "bg-red-100"
      )}
    >
      <img
        src={eventType.image}
        alt={eventType.name}
        className="h-28 aspect-square rounded-xl object-cover"
      />
      <div>
        <h1 className="text-xl font-semibold">{eventType.name}</h1>
        <h2 className="text-base">{eventType.packages.length} Packages</h2>
      </div>
    </div>
  );
}

export default EventTypeCard;
