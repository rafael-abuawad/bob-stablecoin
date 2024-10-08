import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HealthFactor() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("default", { month: "long" });

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardDescription>
          Health Factor ({month} - {year})
        </CardDescription>
        <CardTitle className="text-4xl tabular-nums text-green-500">
          1.00
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
