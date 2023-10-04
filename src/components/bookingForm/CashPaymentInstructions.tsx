export default function CashPaymentInstructions({
  amount,
}: {
  amount: number;
}) {
  return (
    <div className="space-y-4 ">
      <p className="text-[16px] font-semibold text-primaryColor uppercase">
        Cash Payment Instructions
        <br />
        Amount: {amount} BDT
      </p>

      <div className="space-y-2 text-[15px] font-semibold">
        <p>1. Talk to our representitive for cash payment</p>
        <p>
          2. Provide Booking title and necessary details while making payment
        </p>
        <p>3. We will update the booking status after confirming the payment</p>
        <p>
          4. For any enquiry, contact <strong>+8801709295729</strong>
        </p>
      </div>
    </div>
  );
}
