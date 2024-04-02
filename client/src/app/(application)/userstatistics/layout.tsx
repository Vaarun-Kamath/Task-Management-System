import PageHeader from "@/components/atoms/PageHeader";

export default async function UserStatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-wrap flex-col">
      <PageHeader title="Your Statistics" />
      {children}
    </section>
  );
}
