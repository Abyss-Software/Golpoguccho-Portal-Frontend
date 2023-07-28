import { PackageType } from './EventTypeSelectForm';
import { twMerge } from 'tailwind-merge';

type PackageCardProps = {
  packageOption: PackageType;
  selected?: boolean;
  error?: boolean;
  onClick: () => any;
};

function PackageCard({
  packageOption,
  selected,
  onClick,
  error,
}: PackageCardProps) {
  return (
    <div
      className={twMerge(
        'cursor-pointer bg-paperColor border shadow-md shadow-shadowColor rounded-lg hover:shadow-lg transition-shadow',
        selected ? 'bg-primaryLighterColor' : error && 'bg-red-100'
      )}
      onClick={onClick}
    >
      <img
        src={packageOption.image}
        alt={packageOption.name}
        className="w-full h-48 rounded-t-lg object-cover"
      />
      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{packageOption.name}</h1>
        <p className="text-base">{packageOption.description}</p>
        <h2 className="text-lg font-bold">Price: ${packageOption.price}</h2>
      </div>
    </div>
  );
}

export default PackageCard;
