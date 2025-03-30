
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNGOById, type NGO, type Achievement, type TeamMember } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Users,
  Award,
  FileText,
  MapPin,
  Calendar,
  CreditCard,
  Link2,
} from "lucide-react";
import DonationForm from "@/components/DonationForm";
import NGOGallery from "@/components/NGOGallery";
import { useToast } from "@/hooks/use-toast";

const NGOProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [ngo, setNgo] = useState<NGO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchedNgo = getNGOById(id);
      setNgo(fetchedNgo || null);
      setIsLoading(false);
    }
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${ngo?.name} - Care4All`,
          text: `Check out ${ngo?.name} on Care4All and support their cause!`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share it with your friends and family.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!ngo) {
    return (
      <div className="container py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold">NGO Not Found</h1>
        <p>The NGO you're looking for doesn't exist or has been removed.</p>
        <Button className="mt-4" asChild>
          <a href="/ngos">Browse NGOs</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
        <img
          src={ngo.coverImage}
          alt={`${ngo.name} cover`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-lg border-4 border-white bg-white sm:h-24 sm:w-24">
              <img
                src={ngo.logo}
                alt={`${ngo.name} logo`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-white">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">{ngo.name}</h1>
                {ngo.verified && (
                  <Badge className="bg-green-600 text-white hover:bg-green-700">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <p className="flex items-center gap-1 text-white/80">
                <MapPin className="h-4 w-4" /> {ngo.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="text-2xl font-bold">{ngo.foundedYear}</p>
                  </div>
                  <Calendar className="h-10 w-10 text-muted-foreground" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Raised</p>
                    <p className="text-2xl font-bold">
                      ₹{(ngo.totalRaised / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <CreditCard className="h-10 w-10 text-muted-foreground" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Supporters</p>
                    <p className="text-2xl font-bold">
                      {ngo.supporters.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-10 w-10 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="about">
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">About {ngo.name}</h2>
                  <p className="text-muted-foreground">{ngo.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Verification Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div
                          className={`rounded-full ${
                            ngo.verified
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          } p-2`}
                        >
                          {ngo.verified ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <AlertTriangle className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Verification Status</h4>
                          <p className="text-sm text-muted-foreground">
                            {ngo.verified
                              ? "This NGO has been verified by Care4All"
                              : "Verification pending"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="flex items-start gap-4 p-4">
                        <div
                          className={`rounded-full p-2 ${
                            ngo.trustScore > 90
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : ngo.trustScore > 80
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          <Info className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Trust Score</h4>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full rounded-full bg-muted">
                              <div
                                className="h-2 rounded-full bg-care-500"
                                style={{ width: `${ngo.trustScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">
                              {ngo.trustScore}/100
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Registration Details</h3>
                  <Card>
                    <CardContent className="flex items-start gap-4 p-4">
                      <div className="rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Registration Number</h4>
                        <p className="text-sm text-muted-foreground">
                          {ngo.regNumber}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <h2 className="text-2xl font-semibold">Achievements & Impact</h2>
                <div className="space-y-6">
                  {ngo.achievements.map((achievement: Achievement) => (
                    <Card key={achievement.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">
                            {achievement.title}
                          </CardTitle>
                          <Badge variant="outline">
                            {new Date(achievement.date).toLocaleDateString()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          {achievement.image && (
                            <div className="overflow-hidden rounded-md">
                              <img
                                src={achievement.image}
                                alt={achievement.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className={achievement.image ? "" : "md:col-span-2"}>
                            <p className="text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <h2 className="text-2xl font-semibold">Our Team</h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {ngo.team.map((member: TeamMember) => (
                    <Card key={member.id} className="overflow-hidden">
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4 text-center">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.role}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <NGOGallery ngo={ngo} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <DonationForm ngoName={ngo.name} upiId={ngo.upiId} />

            <Card>
              <CardHeader>
                <CardTitle>Share This NGO</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={handleShare}>
                  <Link2 className="mr-2 h-4 w-4" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-secondary text-foreground">
                  {ngo.category}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfile;
