import { Button } from '@/components/ui/button';
import { LucideArrowRight } from 'lucide-react';

export default function welcome() {
    return (
        <div className="relative h-screen bg-[#EBEFFF] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-1/2 md:flex gap-x-20 w-full xl:px-96">
                <img src="Asset\Image\bungaTelangWelcome.png" alt="" />
                <div className='flex flex-col gap-y-5'>
                    <h1 className='text-[#3B387E] font-[1000] text-5xl'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </h1>
                    <Button className="cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE] w-1/4">
                        Get Started <LucideArrowRight color="#EBEFFF" />
                    </Button>
                </div>
            </div>
            <img src="Asset\Particle\landingPageWelcome.svg" alt="" className='absolute bottom-0 right-[6rem] scale-125 translate-y-20'/>
        </div>
    );
}
