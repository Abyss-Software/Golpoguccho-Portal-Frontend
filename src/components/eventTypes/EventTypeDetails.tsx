import { Button, Text, Image, Accordion } from '@mantine/core';
import React from 'react';
import Imgae2LineIcon from 'remixicon-react/Image2LineIcon';
const EventTypeDetails = ({ selectedEventType }: any) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Text size={'xl'}>
          <strong>Event Type: {selectedEventType.title}</strong>
        </Text>
        <div>
          <Button
            radius="sm"
            size="md"
            className="uppercase m-4"
            variant="outline"
          >
            Edit
          </Button>
          <Button
            radius="sm"
            size="md"
            className="uppercase m-4"
            variant="outline"
            color="red"
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <Image height={250} src={selectedEventType.image} alt="" />
        <Text size={'md'} weight={400}>
          <strong>Description:</strong>
          <br />
          {selectedEventType.description}
        </Text>
        <Accordion variant="contained" transitionDuration={500} multiple>
          <div className="flex justify-between items-center">
            <Text size={'md'}>
              <strong>Packages:</strong>
            </Text>

            <Button
              radius="sm"
              size="md"
              className="uppercase m-4"
              variant="outline"
            >
              Add New Package
            </Button>
          </div>
          {selectedEventType?.packages?.map((pkg: any, index: number) => (
            <div key={index}>
              <Accordion.Item value={`${index}`}>
                <div key={index} className=" p-2  ">
                  <Accordion.Control icon={<Imgae2LineIcon color="#009247" />}>
                    <h4 className="text-xl font-bold  ">
                      <span className="text-primaryColor">
                        {' '}
                        Package {index + 1}:
                      </span>{' '}
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
                        <span className="font-bold">Description:</span>{' '}
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
