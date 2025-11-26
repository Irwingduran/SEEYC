import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Session Debug</h1>
      <pre className="bg-gray-100 p-4 rounded mt-4">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}