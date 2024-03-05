import Sidebar from "@/components/Sidebar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-wrap flex-row gap-3">
      <Sidebar />
      {children}
    </section>
  );
}
