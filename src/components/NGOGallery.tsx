
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { type NGO } from "@/data/mockData";
import { X } from "lucide-react";

interface NGOGalleryProps {
  ngo: NGO;
}

const NGOGallery = ({ ngo }: NGOGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Gallery</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {ngo.gallery.map((image, index) => (
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
