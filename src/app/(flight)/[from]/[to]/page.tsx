export default function Page({
  params,
}: {
  params: { from: string; to: string };
}) {
  const { from, to } = params;

  return (
    <>
      <div>{from}</div>
      <div>{to}</div>
    </>
  );
}
