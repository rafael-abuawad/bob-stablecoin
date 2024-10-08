import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HealthFactor() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardDescription>Health Factor</CardDescription>
        <CardTitle className="text-4xl tabular-nums text-green-500">
          1.00
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
