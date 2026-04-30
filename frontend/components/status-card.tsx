import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";

type StatusCardProps = {
  status: string | null;
  loading: boolean;
  error: string | null;
};

export function StatusCard({ status, loading, error }: StatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend Status</CardTitle>
        <CardDescription>Verifies the FastAPI service is reachable.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? <p className="text-sm text-muted-foreground">Checking backend...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!loading && !error && status ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-100 text-emerald-700">Healthy</Badge>
              <span className="text-sm text-muted-foreground">
                <code className="font-mono text-xs">/health</code> returned {status}.
              </span>
            </div>
            <Input readOnly value={API_URL} aria-label="Backend API URL" />
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
