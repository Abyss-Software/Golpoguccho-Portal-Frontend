export default function BkashInstructions({ amount }: { amount: number }) {
  const amountWithFee = amount + (amount * 2) / 100;
  return (
    <div className="space-y-4 ">
      <p className="text-[16px] font-semibold text-primaryColor uppercase">
        Bkash No: 01927195229 (Personal)
        <br />
        Amount: {amountWithFee} BDT
      </p>

      <div className="space-y-2 text-[15px] font-semibold">
        <p>1. Go to your bKash Mobile Menu by dialing *247#</p>
        <p>2. Choose “Send Money”</p>
        <p>
          3. Enter the bKash Account Number <strong>01927195229</strong>
        </p>
        <p>
          4. Enter the amount <strong>{amountWithFee}</strong> BDT
        </p>
        <p>5. Enter your name as reference (**Name used in booking form)</p>
        <p>6. Finally, enter your bKash PIN to confirm the transaction</p>
        <p>Done! You will receive a confirmation message from bKash</p>
      </div>
    </div>
  );
}
