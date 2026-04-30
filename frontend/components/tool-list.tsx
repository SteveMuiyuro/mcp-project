import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Tool } from "@/lib/api";

type ToolListProps = {
  tools: Tool[];
  loading: boolean;
  error: string | null;
};

export function ToolList({ tools, loading, error }: ToolListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Discovery</CardTitle>
        <CardDescription>Placeholder MCP-backed tool list.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {loading ? <p className="text-sm text-muted-foreground">Loading tools...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!loading && !error && tools.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tools are exposed yet. Real MCP discovery is intentionally deferred.
          </p>
        ) : null}
        {tools.map((tool) => (
          <div key={tool.name} className="rounded-md border border-border p-3">
            <p className="font-medium">{tool.name}</p>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

