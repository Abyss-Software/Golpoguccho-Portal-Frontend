import { Accordion, Button, Image, Modal, Text } from "@mantine/core";
import { IEventType, IPackage } from "@/interfaces/packages.interface";
import PackageCreateForm, { PackageCreate } from "../package/PackageCreateForm";

import { AiOutlineCheckCircle as CheckIcon } from "react-icons/ai";
import { BiErrorCircle as ErrorIcon } from "react-icons/bi";
import Imgae2LineIcon from "remixicon-react/Image2LineIcon";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import useEventTypeAction from "@/hooks/useEventTypeAction";
import usePackageAction from "@/hooks/usePackageAction";

type EventTypeDetailsProps = {
  eventTypeId: string;
  onEventUpdate: (selectedEvent: IEventType) => any;
  onEventDelete: (selectedEvent: IEventType) => any;
};

export default function EventTypeDetails({
  eventTypeId,
  onEventUpdate,
  onEventDelete,
}: EventTypeDetailsProps) {
  const { fetchEventTypeById } = useEventTypeAction();

  const {
    createPackageMutation,
    deletePackageMutation,
    updatePackageMutation,
  } = usePackageAction();

  const { data: eventType } = fetchEventTypeById(eventTypeId);

  const onPackageCreate = (data: PackageCreate) => {
    createPackageMutation.mutate(
      {
        ...data,
        eventTypeId,
      },
      {
        onSuccess: () => {
          modals.closeAll();

          notifications.update({
            id: "packageCreation",
            color: "green",
            title: "Success",
            message: "Package has been created",
            icon: <CheckIcon size="2rem" />,
          });
        },
        onError: (error: any) => {
          notifications.update({
            id: "packageCreation",
            color: "red",
            title: "Failed",
            message: error?.response?.data?.message || "Something went wrong",
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  const onPackageUpdate = (data: PackageCreate) => {
    updatePackageMutation.mutate(
      { ...data, id: data.id! },
      {
        onSuccess: () => {
          modals.closeAll();

          notifications.update({
            id: "packageUpdate",
            color: "green",
            title: "Success",
            message: "Package has been updated",
            icon: <CheckIcon size="2rem" />,
          });
        },
        onError: (error: any) => {
          notifications.update({
            id: "packageUpdate",
            color: "red",
            title: "Failed",
            message: error?.response?.data?.message || "Something went wrong",
            icon: <ErrorIcon size="2rem" />,
          });
        },
      }
    );
  };

  const onPackageDelete = (id: string) => {
    deletePackageMutation.mutate(id, {
      onSuccess: () => {
        modals.closeAll();

        notifications.update({
          id: "packageDelete",
          color: "green",
          title: "Success",
          message: "Package has been deleted",
          icon: <CheckIcon size="2rem" />,
        });
      },
      onError: (error: any) => {
        notifications.update({
          id: "packageDelete",
          color: "red",
          title: "Failed",
          message: error?.response?.data?.message || "Something went wrong",
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const handleCreatePackageClick = () => {
    modals.open({
      title: "Create Package",
      centered: true,
      size: "lg",
      children: <PackageCreateForm onPackageCreate={onPackageCreate} />,
    });
  };

  const handlePackageUpdateClick = (pkg: IPackage) => {
    modals.open({
      title: "Update Package",
      size: "lg",
      centered: true,
      children: (
        <PackageCreateForm
          onPackageUpdate={onPackageUpdate}
          defaultValues={pkg}
          isUpdate
        />
      ),
    });
  };

  const handlePackageDeleteClick = (pkg: IPackage) =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this package?</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => onPackageDelete(pkg.id!),
    });

  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button
          uppercase
          variant="outline"
          onClick={() => onEventUpdate(eventType!)}
        >
          Edit
        </Button>
        <Button
          uppercase
          variant="outline"
          color="red"
          onClick={() => onEventDelete(eventType!)}
        >
          Delete
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Image height={250} src={eventType?.image} alt="" />

        <div>
          <h1 className="text-lg font-bold py-2">Description:</h1>

          <p>{eventType?.description}</p>
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
          {eventType?.packages?.map((pkg: IPackage, index: number) => (
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
                      <div className="space-x-4">
                        <Button
                          uppercase
                          variant="outline"
                          onClick={() => handlePackageUpdateClick(pkg)}
                        >
                          Edit
                        </Button>
                        <Button
                          uppercase
                          variant="outline"
                          color="red"
                          onClick={() => handlePackageDeleteClick(pkg)}
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
