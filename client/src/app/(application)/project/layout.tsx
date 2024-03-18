import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/atoms/PageHeader";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-wrap flex-col">
      <PageHeader title="Projects" />
      {children}
    </section>
  );
}
