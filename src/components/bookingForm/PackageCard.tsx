import { IPackage } from '@/interfaces/packages.interface';
import { twMerge } from 'tailwind-merge';

type PackageCardProps = {
  packageOption: IPackage;
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
        'cursor-pointer h-full bg-paperColor border shadow-md shadow-shadowColor rounded-lg hover:shadow-lg transition-shadow',
        selected ? 'bg-primaryLighterColor' : error && 'bg-red-100'
      )}
      onClick={onClick}
    >
      <img
        src={packageOption.image}
        alt={packageOption.title}
        className="w-full h-48 rounded-t-lg object-cover"
      />
      <div className="p-4 space-y-4 h-full">
        <h1 className="text-2xl font-bold">{packageOption.title}</h1>
        <p className="text-base whitespace-pre-wrap">
          {packageOption.description}
        </p>
        <h2 className="text-lg font-bold">Price: ${packageOption.price}</h2>
      </div>
    </div>
  );
}

export default PackageCard;
