import { getN8nExecutions } from "@/lib/n8n";

export default async function AIDashboard() {
  const data = await getN8nExecutions();
  const logs = data.data || [];

  const totalExecutions = logs.length;

  const successCount = logs.filter(
    (ex: any) => ex.status === "success"
  ).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          AI Automation Dashboard
        </h1>

        <p className="text-gray-500">
          Live n8n workflow executions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border bg-white shadow">
          <h2 className="text-lg font-semibold">
            Total Executions
          </h2>

          <p className="text-4xl font-bold mt-2">
            {totalExecutions}
          </p>
        </div>

        <div className="p-6 rounded-xl border bg-white shadow">
          <h2 className="text-lg font-semibold">
            Successful Runs
          </h2>

          <p className="text-4xl font-bold mt-2 text-green-600">
            {successCount}
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-black text-green-400 p-4 overflow-auto">
        <pre>
          {JSON.stringify(logs, null, 2)}
        </pre>
      </div>
    </div>
  );
}