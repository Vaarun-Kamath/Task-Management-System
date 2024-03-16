import Sidebar from "@/components/Sidebar";

export default async function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap">
      <Sidebar />
      <div className="flex flex-grow w-full lg:w-auto">
        {children}
      </div>
    </div>
  );
}
