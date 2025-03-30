
import { Card, CardContent } from "@/components/ui/card";
import NewsletterSection from "@/components/NewsletterSection";
import { Check, Shield, Search, FileText, BarChart, Heart } from "lucide-react";

const About = () => {
  return (
    <div>
      <section className="hero-gradient py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              About Care4All
            </h1>
            <p className="text-lg text-white/90">
              Building bridges between donors and verified NGOs for a more
              transparent and impactful giving experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Our Mission</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Care4All was founded with a simple but powerful mission: to make
              charitable giving more transparent, efficient, and impactful. We
              believe that donors should be able to see exactly how their
              contributions are making a difference, and NGOs should have the
              tools to showcase their work and build trust with supporters.
            </p>

            <div className="mb-12 grid gap-8 sm:grid-cols-2">
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-full bg-care-100 p-2 text-care-700 dark:bg-care-900 dark:text-care-300">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">For Donors</h3>
                    <p className="text-muted-foreground">
                      We provide a platform where you can find verified NGOs,
                      understand their work, and donate with confidence, knowing
                      your contributions are making a real difference.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-full bg-impact-100 p-2 text-impact-700 dark:bg-impact-900 dark:text-impact-300">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">For NGOs</h3>
                    <p className="text-muted-foreground">
                      We offer a space to showcase your work, build credibility
                      through verification, and connect with donors who are
                      passionate about your cause.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Why Choose Care4All?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-secondary p-2">
                  <Shield className="h-5 w-5 text-care-600" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Rigorous Verification Process
                  </h3>
                  <p className="text-muted-foreground">
                    Every NGO on our platform undergoes a thorough verification
                    process. We check registration documents, financial
                    statements, and operational history to ensure legitimacy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-secondary p-2">
                  <Search className="h-5 w-5 text-care-600" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Transparency at Every Step
                  </h3>
                  <p className="text-muted-foreground">
                    We believe in complete transparency. Donors can see how funds
                    are utilized, and NGOs can showcase their impact through
                    detailed reports and updates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-secondary p-2">
                  <FileText className="h-5 w-5 text-care-600" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Comprehensive Profiles
                  </h3>
                  <p className="text-muted-foreground">
                    NGO profiles on Care4All provide detailed information about
                    their mission, achievements, team, and financial records,
                    helping donors make informed decisions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-secondary p-2">
                  <Check className="h-5 w-5 text-care-600" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Secure Payment Gateway
                  </h3>
                  <p className="text-muted-foreground">
                    Our UPI payment gateway ensures that your donations reach
                    NGOs securely and efficiently, with minimal transaction fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Our Team
            </h2>
            <p className="mb-8 text-muted-foreground">
              Care4All is powered by a passionate team of individuals committed
              to making a positive impact in the world through technology and
              innovation.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src="https://placehold.co/300x300/00afaf/ffffff?text=SK"
                    alt="Founder & CEO"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Sanjay Kumar</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src="https://placehold.co/300x300/00afaf/ffffff?text=AR"
                    alt="CTO"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Aisha Rahman</h3>
                <p className="text-sm text-muted-foreground">CTO</p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src="https://placehold.co/300x300/00afaf/ffffff?text=RM"
                    alt="Head of Verification"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">Rajiv Mehta</h3>
                <p className="text-sm text-muted-foreground">
                  Head of Verification
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};

export default About;
