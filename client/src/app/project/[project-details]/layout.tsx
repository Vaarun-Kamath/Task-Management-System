export default async function ProjectDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  );
}
