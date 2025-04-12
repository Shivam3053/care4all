
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type NGO } from "@/data/mockData";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface NGOGalleryProps {
  ngo: NGO;
}

const NGOGallery = ({ ngo }: NGOGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Use images property instead of gallery (which doesn't exist in the NGO type)
  const galleryImages = ngo.images || [];

  if (galleryImages.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Gallery</h3>
        <p className="text-muted-foreground">No gallery images available for this NGO.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Gallery</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {galleryImages.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button
                className="overflow-hidden rounded-md border"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`${ngo.name} gallery image ${index + 1}`}
                  className="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x400/e2e8f0/64748b?text=Image+Not+Found";
                  }}
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 sm:p-6 md:p-8">
              <div className="relative">
                <button
                  className="absolute right-2 top-2 rounded-full bg-foreground/10 p-2 backdrop-blur-sm"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </button>
                <img
                  src={selectedImage || image}
                  alt={`${ngo.name} gallery image ${index + 1}`}
                  className="h-full w-full rounded-lg object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/800x600/e2e8f0/64748b?text=Image+Not+Found";
                  }}
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default NGOGallery;
