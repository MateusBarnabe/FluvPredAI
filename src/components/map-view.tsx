import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Map } from 'lucide-react';

export default function MapView() {
  const mapImage = PlaceHolderImages.find(img => img.id === 'map-placeholder');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Region Map
        </CardTitle>
        <CardDescription>Interactive map showing risk zones.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {mapImage ? (
          <div className="aspect-[4/3] w-full relative overflow-hidden rounded-b-lg">
            <Image
              src={mapImage.imageUrl}
              alt={mapImage.description}
              data-ai-hint={mapImage.imageHint}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Map could not be loaded.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
