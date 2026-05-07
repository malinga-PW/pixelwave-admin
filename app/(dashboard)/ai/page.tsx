import React from "react";
import { getN8nExecutions } from "@/lib/n8n";
import { Activity, CheckCircle2, XCircle, Users, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

export default async function AIDashboardPage() {
  // Fetch live n8n data
  const executionsData = await getN8nExecutions();
  const logs = executionsData?.data || [];

  // Calculate Metrics
  const totalAutomations = logs.length;
  const successCount = logs.filter((ex: any) => ex.status === "success").length;
  const failedCount = totalAutomations - successCount;
  const successRate = totalAutomations > 0 ? ((successCount / totalAutomations) * 100).toFixed(1) : "0.0";

  // Static metric for demonstration
  const activeAgents = 5;

  return (
    <div className="p-6 space-y-6 w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Operations Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor Elena.AI agents, workflow executions, and system health in real-time.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Automations Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Automations</h3>
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{totalAutomations}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium mr-1">+12%</span> from last month
            </p>
          </div>
        </div>

        {/* Success Rate Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Success Rate</h3>
            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {Number(successRate) > 80 ? (
                <><ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" /><span className="text-emerald-500 font-medium mr-1">Optimal</span> performance</>
              ) : (
                <><ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" /><span className="text-rose-500 font-medium mr-1">Needs attention</span></>
              )}
            </p>
          </div>
        </div>

        {/* Active Agents Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Agents</h3>
            <div className="h-10 w-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{activeAgents}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-emerald-500 font-medium mr-1">Online</span> and ready
            </p>
          </div>
        </div>

        {/* Failed Tasks Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Failed Tasks</h3>
            <div className="h-10 w-10 bg-rose-100 dark:bg-rose-900/50 rounded-full flex items-center justify-center">
              <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold">{failedCount}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-rose-500 font-medium mr-1">Requires review</span> in n8n
            </p>
          </div>
        </div>

      </div>

      {/* Recent Executions Table */}
      <div className="mt-8 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Recent Agent Logs</h3>
            <p className="text-sm text-muted-foreground">Latest executions pulled directly from n8n webhook nodes.</p>
          </div>
          <Clock className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Execution ID</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Started At</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.length > 0 ? (
                logs.map((log: any) => (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">#{log.id}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${log.status === "success"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}>
                        {log.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(log.startedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`https://n8n.pixelwave.lk/execution/${log.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    No executions found or n8n API connection failed.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}