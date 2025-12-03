import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Credits Earned vs Retired Data
const creditsData = [
  { month: "Jul", earned: 280, retired: 120 },
  { month: "Aug", earned: 320, retired: 180 },
  { month: "Sep", earned: 290, retired: 150 },
  { month: "Oct", earned: 410, retired: 220 },
  { month: "Nov", earned: 380, retired: 200 },
  { month: "Dec", earned: 450, retired: 280 },
];

const creditsChartConfig = {
  earned: {
    label: "Credits Earned",
    color: "hsl(var(--accent))",
  },
  retired: {
    label: "Credits Retired",
    color: "hsl(var(--primary))",
  },
};

// Monthly Revenue Data
const revenueData = [
  { month: "Jul", revenue: 420000 },
  { month: "Aug", revenue: 480000 },
  { month: "Sep", revenue: 435000 },
  { month: "Oct", revenue: 615000 },
  { month: "Nov", revenue: 570000 },
  { month: "Dec", revenue: 675000 },
];

const revenueChartConfig = {
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(var(--success))",
  },
};

// Buyer Sources Data
const buyerSourcesData = [
  { name: "Corporate CSR", value: 45, color: "hsl(var(--primary))" },
  { name: "Individual Offset", value: 25, color: "hsl(var(--accent))" },
  { name: "Government", value: 20, color: "hsl(var(--success))" },
  { name: "NGOs", value: 10, color: "hsl(var(--info))" },
];

const buyerSourcesConfig = {
  value: {
    label: "Percentage",
  },
};

export const AnalyticsCharts = () => {
  const exportChartData = (chartName: string, data: any) => {
    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row: any) => Object.values(row).join(","))
    ].join("\n");
    
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chartName}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Credits Earned vs Retired */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg">Credits Earned vs Retired</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Last 6 months performance</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportChartData("credits-earned-retired", creditsData)}
            aria-label="Export credits earned vs retired chart data to CSV"
            className="w-full sm:w-auto min-h-[44px]"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer config={creditsChartConfig} className="h-[250px] sm:h-[300px] w-full">
            <LineChart 
              data={creditsData}
              accessibilityLayer
              aria-label="Line chart showing credits earned versus credits retired over the last 6 months"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="earned"
                stroke="var(--color-earned)"
                strokeWidth={2}
                dot={{ fill: "var(--color-earned)" }}
                name="Credits Earned"
              />
              <Line
                type="monotone"
                dataKey="retired"
                stroke="var(--color-retired)"
                strokeWidth={2}
                dot={{ fill: "var(--color-retired)" }}
                name="Credits Retired"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Revenue */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg">Monthly Revenue</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Revenue trends over 6 months</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportChartData("monthly-revenue", revenueData)}
            aria-label="Export monthly revenue chart data to CSV"
            className="w-full sm:w-auto min-h-[44px]"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer config={revenueChartConfig} className="h-[250px] sm:h-[300px] w-full">
            <BarChart 
              data={revenueData}
              accessibilityLayer
              aria-label="Bar chart showing monthly revenue for the last 6 months"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="revenue"
                fill="var(--color-revenue)"
                radius={[8, 8, 0, 0]}
                name="Revenue"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Buyer Sources */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base sm:text-lg">Buyer Sources</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Credit purchases by buyer type</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportChartData("buyer-sources", buyerSourcesData)}
            aria-label="Export buyer sources chart data to CSV"
            className="w-full sm:w-auto min-h-[44px]"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Export CSV</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
          <ChartContainer config={buyerSourcesConfig} className="h-[250px] sm:h-[300px] w-full">
            <PieChart
              accessibilityLayer
              aria-label="Pie chart showing the distribution of credit purchases by buyer type"
            >
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={buyerSourcesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.name}: ${entry.value}%`}
              >
                {buyerSourcesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
