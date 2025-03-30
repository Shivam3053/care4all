
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Shield, CreditCard, Award } from "lucide-react";

const steps = [
  {
    title: "Find NGOs",
    description: "Browse through verified NGOs based on causes you care about.",
    icon: Search,
    iconColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    title: "Verify Authenticity",
    description: "Check trust scores, documents, and past achievements.",
    icon: Shield,
    iconColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  {
    title: "Make Donation",
    description: "Contribute directly through secure UPI payments.",
    icon: CreditCard,
    iconColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    title: "Track Impact",
    description: "Receive updates on how your donation is making a difference.",
    icon: Award,
    iconColor: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            How Care4All Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our platform makes it easy to donate with confidence through a
            simple, transparent process.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${step.iconColor}`}
                >
                  <step.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-8 items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-0.5 flex-1 bg-muted"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
