
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "Care4All has transformed how I support causes. The verification system gives me confidence that my donations reach the right places.",
    name: "Amit Sharma",
    role: "Regular Donor",
    avatar: "https://placehold.co/200x200/ccefef/006969?text=AS",
  },
  {
    id: 2,
    content:
      "The transparency on this platform is remarkable. I can see exactly how my contributions are being used and the impact they're making.",
    name: "Priya Patel",
    role: "Monthly Contributor",
    avatar: "https://placehold.co/200x200/ccefef/006969?text=PP",
  },
  {
    id: 3,
    content:
      "As a small NGO, Care4All has helped us reach donors who truly believe in our cause. The trust score system has been game-changing for us.",
    name: "Rahul Gupta",
    role: "NGO Director",
    avatar: "https://placehold.co/200x200/ccefef/006969?text=RG",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">
            What Our Community Says
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Hear from donors and NGOs about their experience with Care4All.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-impact-500"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="mb-6 text-muted-foreground">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
