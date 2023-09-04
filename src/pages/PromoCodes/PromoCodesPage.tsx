import CommonDataTable from '@/components/dataTable/CommonDataTable';
import { promoCodeData } from '@/constants/dummyData';
import { Button, Card } from '@mantine/core';
import {
  IPromoCode,
  promoCodesColumns,
} from '@/interfaces/promoCodes.interface';

const PromoCodesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl ">Promo Codes</h1>
        <Button variant="filled" color="primary" size="md">
          Add Promo Code
        </Button>
      </div>

      <Card withBorder shadow="lg">
        <CommonDataTable<IPromoCode>
          data={promoCodeData}
          columns={promoCodesColumns}
        />
      </Card>
    </div>
  );
};

export default PromoCodesPage;
