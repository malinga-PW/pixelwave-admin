export async function getN8nExecutions() {
  const response = await fetch(`${process.env.N8N_API_URL}/executions?limit=20`, {
    headers: { 'X-N8N-API-KEY': process.env.N8N_API_KEY || '' },
    next: { revalidate: 60 } 
  });
  if (!response.ok) return { data: [] };
  return response.json();
}