import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/atoms/PageHeader";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-wrap flex-col">
      <PageHeader title="Home" />
      {children}
    </section>
  );
}
