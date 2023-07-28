import { Accordion, Button, Image } from "@mantine/core";
import { IEventType, IPackage } from "@/interfaces/packages.interface";

import Imgae2LineIcon from "remixicon-react/Image2LineIcon";

type EventTypeDetailsProps = {
  selectedEvent: IEventType;
};

const EventTypeDetails = ({ selectedEvent }: EventTypeDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button uppercase variant="outline">
          Edit
        </Button>
        <Button uppercase variant="outline" color="red">
          Delete
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Image height={250} src={selectedEvent.image} alt="" />

        <div>
          <h1 className="text-lg font-bold py-2">Description:</h1>

          <p>{selectedEvent.description}</p>
        </div>
        <Accordion variant="contained" transitionDuration={500} multiple>
          <div className="flex justify-between items-center py-4">
            <h1 className="text-lg font-bold">Packages:</h1>

            <Button uppercase variant="outline">
              Add New Package
            </Button>
          </div>
          {selectedEvent?.packages?.map((pkg: IPackage, index: number) => (
            <div key={index}>
              <Accordion.Item value={index.toString()}>
                <div key={index} className="p-2">
                  <Accordion.Control
                    icon={<Imgae2LineIcon className="text-primaryColor" />}
                  >
                    <h4 className="text-xl font-bold">
                      <span className="text-primaryColor">
                        Package {index + 1}:
                      </span>{" "}
                      {pkg.title}
                    </h4>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <div className="space-y-1 px-2">
                      <Image height={250} src={pkg.image} alt="" />
                      <p>
                        <span className="font-bold">Package:</span> {pkg.title}
                      </p>
                      <p>
                        <span className="font-bold">Description:</span>{" "}
                        {pkg.description}
                      </p>
                      <p>
                        <span className="font-bold">Price:</span> {pkg.price}
                      </p>
                    </div>
                  </Accordion.Panel>
                </div>
              </Accordion.Item>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default EventTypeDetails;
