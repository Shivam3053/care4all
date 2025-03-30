
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, School, Users, Leaf } from "lucide-react";

const stats = [
  {
    title: "NGOs Onboarded",
    value: "750+",
    description: "Verified organizations",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Total Donations",
    value: "₹25Cr+",
    description: "Raised through platform",
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "Education Projects",
    value: "320+",
    description: "Schools & learning centers",
    icon: School,
    color: "text-amber-500",
  },
  {
    title: "Environment Impact",
    value: "150K+",
    description: "Trees planted",
    icon: Leaf,
    color: "text-green-500",
  },
];

const ImpactStats = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            Our Collective Impact
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Through the support of our donors and dedicated NGOs, we've achieved remarkable milestones together.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
