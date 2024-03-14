import LoginForm from "@/components/forms/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | null };
}) {
  const callbackUrl = searchParams.callbackUrl! || "/home";
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </>
  );
}
