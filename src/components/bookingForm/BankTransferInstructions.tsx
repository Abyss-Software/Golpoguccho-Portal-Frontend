export default function BankInstructions({ amount }: { amount: number }) {
  return (
    <div className="space-y-4 ">
      <p className="text-[16px] font-semibold text-primaryColor uppercase">
        Bank Transfer Instructions
        <br />
        Amount: {amount} BDT
      </p>

      <div className="space-y-2 text-[15px] font-semibold">
        <p>Account Name: FARHAN FUAD</p>
        <p>Account No: 1111440356252</p>
        <p>Bank Name: Eastern Bank Limited</p>
        <p>Branch Name: Shyamoli Branch</p>
      </div>
    </div>
  );
}
