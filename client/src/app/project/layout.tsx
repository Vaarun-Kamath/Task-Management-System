import Sidebar from "@/components/Sidebar";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-wrap flex-row">
      <Sidebar />
      {children}
    </section>
  );
}
