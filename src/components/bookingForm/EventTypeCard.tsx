import { IEventType } from "@/interfaces/packages.interface";
import { twMerge } from "tailwind-merge";

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
    <div
      onClick={onClick}
      className={twMerge(
        "bg-paperColor p-2 flex gap-4 rounded-xl shadow-md shadow-shadowColor items-center cursor-pointer border overflow-hidden hover:shadow-lg transition-shadow",
        selected ? "bg-primaryLighterColor" : error && "bg-red-100"
      )}
    >
      <img
        src={eventType.image}
        alt={eventType.title}
        className="h-28 aspect-square rounded-xl object-cover"
      />
      <div>
        <h1 className="text-xl font-semibold">{eventType.title}</h1>
        <h2 className="text-base">{eventType.packages.length} Packages</h2>
      </div>
    </div>
  );
}

export default EventTypeCard;
