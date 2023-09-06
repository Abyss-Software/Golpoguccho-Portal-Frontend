import { Accordion, Button, Image, Modal } from '@mantine/core';
import { IEventType, IPackage } from '@/interfaces/packages.interface';

import Imgae2LineIcon from 'remixicon-react/Image2LineIcon';
import { modals } from '@mantine/modals';
import PackageCreateForm, { PackageCreate } from '../package/PackageCreateForm';
import usePackageAction from '@/hooks/usePackageAction';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';

type EventTypeDetailsProps = {
  selectedEvent: IEventType;
  onEditClick: (selectedEvent: IEventType) => void;
  onDeleteClick: (selectedEvent: IEventType) => void;
};

function EventTypeDetails({
  selectedEvent,
  onEditClick,
  onDeleteClick,
}: EventTypeDetailsProps) {

  const handleCreatePackageClick = () => {
    modals.open({
      title: 'Package',
      children: <PackageCreateForm />,
    });
  };


  const { createPackageMutation, deletePackageMutation, updatePackageMutation} = usePackageAction()

  const onPackageCreate = (data: PackageCreate) => {
    createPackageMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          id: 'packageCreation',
          color: 'green',
          title: 'Success',
          message: 'Package Created',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          id: 'eventTypeCreation',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onEventTypeUpdate = (data: EventTypeCreate) => {
    updateEventTypeMutation.mutate(
      { ...data, id: data.id! },
      {
        onSuccess: () => {
          notifications.update({
            id: 'eventTypeUpdate',
            color: 'green',
            title: 'Success',
            message: 'Event Type Updated',
            icon: <CheckIcon size="2rem" />,
          });
          modals.closeAll();
          setDrawer.close();
        },
        onError: (error: any) => {
          notifications.update({
            id: 'eventTypeUpdate',
            color: 'red',
            title: 'Failed',
            message: error?.response?.data?.message || 'Something went wrong',
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  const onEventTypeDelete = (id: string) => {
    deleteEventTypeMutation.mutate(id, {
      onSuccess: () => {
        notifications.update({
          id: 'eventTypeDelete',
          color: 'green',
          title: 'Success',
          message: 'Event Type Deleted',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
        setDrawer.close();
      },
      onError: (error: any) => {
        notifications.update({
          id: 'eventTypeDelete',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };


  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button
          uppercase
          variant="outline"
          onClick={() => onEditClick(selectedEvent)}
        >
          Edit
        </Button>
        <Button
          uppercase
          variant="outline"
          color="red"
          onClick={() => onDeleteClick(selectedEvent)}
        >
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

            <Button
              uppercase
              variant="outline"
              onClick={handleCreatePackageClick}
            >
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
                      <div className="space-x-4">
                        <Button
                          uppercase
                          variant="outline"
                          onClick={() => onEditClick(selectedEvent)}
                        >
                          Edit
                        </Button>
                        <Button
                          uppercase
                          variant="outline"
                          color="red"
                          onClick={() => onDeleteClick(selectedEvent)}
                        >
                          Delete
                        </Button>
                      </div>
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
}

export default EventTypeDetails;
