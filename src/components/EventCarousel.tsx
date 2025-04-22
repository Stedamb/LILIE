import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from './ui/carousel';

// Define the gallery image type
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

// Sample gallery images - replace with your actual images
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/gallery/image1.jpg",
    alt: "Underground club scene with laser lights",
    caption: "SONIC LIBERATION"
  },
  {
    id: 2,
    src: "/gallery/image2.jpg",
    alt: "Crowd dancing at a warehouse party",
    caption: "COLLECTIVE CONSCIOUSNESS"
  },
  {
    id: 3,
    src: "/gallery/image3.jpg",
    alt: "DJ performing with visual projections",
    caption: "TECHNOLOGICAL SHAMANISM"
  },
  {
    id: 4,
    src: "/gallery/image4.jpg",
    alt: "Eco-friendly festival setup",
    caption: "SUSTAINABLE HEDONISM"
  },
  {
    id: 5,
    src: "/gallery/image5.jpg",
    alt: "Protest-themed music event",
    caption: "SONIC ACTIVISM"
  }
];

// Default background for when images fail to load
const defaultBg = "bg-gradient-to-br from-purple-900 to-black";

export default function ImageGallery() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <div className="w-full py-12">
      <Carousel opts={{ loop: true }}>
        <div className="relative">
          <CarouselContent>
            {galleryImages.map(image => (
              <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/1">
                <div className="group relative overflow-hidden rounded-lg border border-white/10 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className={`h-[70vh] w-full overflow-hidden ${defaultBg}`}>
                    <img 
                      src={image.src} 
                      alt={image.alt} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={handleImageError} 
                    />
                  </div>
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-6 transform transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{image.caption}</h3>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <CarouselPrevious className="static text-white translate-y-0 translate-x-0 size-12 bg-black/30 backdrop-blur-sm border-white/20  hover:bg-black/30 hover:text-white hover:border-purple-500/50" />
          <CarouselNext className="static text-white translate-y-0 translate-x-0 size-12 bg-black/30 backdrop-blur-sm border-white/20 hover:bg-black/30 hover:text-white hover:border-purple-500/50" />
        </div>
      </Carousel>
    </div>
  );
}
