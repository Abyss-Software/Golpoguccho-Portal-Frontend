import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { useNavigate } from 'react-router-dom';
import { Text, Button, Card } from '@mantine/core';
import { IClient } from '@/interfaces/clients.interface';
import useClientActions from '@/hooks/useClientActions';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import { modals } from '@mantine/modals';
import { clientColumns } from '@/components/clients/clientColumns';

const ClientsListPage = () => {
  const { deleteClientMutation, fetchClients } = useClientActions();

  const { data: clients = [] } = fetchClients();

  const onClientDelete = (id: string) => {
    deleteClientMutation.mutate(id, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'deleteClient',
          color: 'green',
          title: 'Success',
          message: 'Client Deleted',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'deleteClient',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const handleDeleteClient = (row: IClient) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this Client?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => onClientDelete(row.id),
    });
  };

  return (
    <div>
      <h1 className="text-2xl p-4">List of Clients</h1>

      <Card withBorder shadow="lg">
        <CommonDataTable<IClient>
          data={clients}
          columns={clientColumns({
            onClientDelete: handleDeleteClient,
          })}
        />
      </Card>
    </div>
  );
};

export default ClientsListPage;
