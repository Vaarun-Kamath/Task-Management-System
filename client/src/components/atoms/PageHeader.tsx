export default function PageHeader(props: { title: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-3xl text-gray-900 ml-2">{props.title}</h1>
      <hr className="border-gray-300 mt-2 w-full" />
    </div>
  );
}
