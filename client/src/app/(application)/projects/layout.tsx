export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-wrap flex-col">{children}</section>
  );
}
