import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { Button, Card, Text } from '@mantine/core';
import { IPromoCode, IPromoDto } from '@/interfaces/promoCodes.interface';
import usePromoAction from '@/hooks/usePromoAction';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { AiOutlineCheckCircle as CheckIcon } from 'react-icons/ai';
import { BiErrorCircle as ErrorIcon } from 'react-icons/bi';
import PromoForm from '@/components/promos/PromoForm';
import { promoCodesColumns } from '@/components/promos/promoColumns';

const PromoCodesPage = () => {
  const {
    fetchPromos,
    createPromoMutation,
    updatePromoMutation,
    deletePromoMutation,
  } = usePromoAction();

  const { data: promos } = fetchPromos();

  const onPromoCreate = (data: IPromoDto) => {
    createPromoMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'promoCreation',
          color: 'green',
          title: 'Success',
          message: 'Promo Created',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'promoCreation',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onPromoUpdate = (data: IPromoDto) => {
    updatePromoMutation.mutate(data, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'promoUpdate',
          color: 'green',
          title: 'Success',
          message: 'Promo Updated',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'promoUpdate',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const onPromoDelete = (id: string) => {
    deletePromoMutation.mutate(id, {
      onSuccess: () => {
        notifications.update({
          withBorder: true,
          id: 'promoDelete',
          color: 'green',
          title: 'Success',
          message: 'Promo Deleted',
          icon: <CheckIcon size="2rem" />,
        });
        modals.closeAll();
      },
      onError: (error: any) => {
        notifications.update({
          withBorder: true,
          id: 'promoDelete',
          color: 'red',
          title: 'Failed',
          message: error?.response?.data?.message || 'Something went wrong',
          icon: <ErrorIcon size="2rem" />,
        });
      },
    });
  };

  const handleCreatePromo = () => {
    modals.open({
      title: 'Create Promo Code',
      centered: true,
      size: 'lg',
      children: <PromoForm onPromoCreate={onPromoCreate} />,
    });
  };

  const handleUpdatePromo = (row: IPromoCode) => {
    modals.open({
      title: 'Update Promo Code',
      centered: true,
      size: 'lg',
      children: (
        <PromoForm
          onPromoUpdate={onPromoUpdate}
          isUpdate
          defaultValues={{
            id: row.id,
            promoCode: row.promo_code,
            description: row.description,
            discountPercentage: row.percentage,
            maxUse: row.max_use,
            maxDiscount: row.max_discount,
            expiryDate: row.expiry_date,
            status: row.status,
          }}
        />
      ),
    });
  };

  const handleDeletePromo = (row: IPromoCode) => {
    modals.openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this Promo Code?</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => onPromoDelete(row.promo_code!),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl ">Promo Codes</h1>
        <Button
          variant="filled"
          color="primary"
          size="md"
          onClick={handleCreatePromo}
        >
          Add Promo Code
        </Button>
      </div>

      <Card withBorder shadow="lg">
        {promos?.body && (
          <CommonDataTable<IPromoCode>
            data={promos?.body!}
            columns={promoCodesColumns({
              onPromoUpdate: handleUpdatePromo,
              onPromoDelete: handleDeletePromo,
            })}
            defaultSortField="createdAt"
          />
        )}
      </Card>
    </div>
  );
};

export default PromoCodesPage;

// {
//   handleUpdatePromo,
//   handleDeletePromo,
// }
