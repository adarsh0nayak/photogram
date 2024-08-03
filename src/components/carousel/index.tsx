import { PhotoMeta } from '@/types';
import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

interface ICarouselPhotosProps {
    photos: PhotoMeta[];
    format?: string;
}

const CarouselPhotos: React.FunctionComponent<ICarouselPhotosProps> = ({photos, format}) => {
  console.log(photos)
  return(
  <Carousel className='w-full max-w-xs'>
    <CarouselContent>
        {photos.map((photo) => (
            <CarouselItem key={photo.uuid}>
                <div className='p-1'>
                    <img src={`${photo.cdnUrl}${format}`} alt={photo.uuid} />
                </div>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious/>
    <CarouselNext/>
  </Carousel>
)};

export default CarouselPhotos;