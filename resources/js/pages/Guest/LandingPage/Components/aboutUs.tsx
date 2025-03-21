import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { LucideArrowRight } from 'lucide-react';

export default function about() {
    return (
        <div className="relative flex h-screen flex-col gap-y-28 overflow-hidden bg-[#EBEFFF] p-20 px-32">
            <h1 className="text-center text-5xl font-[1000] text-[#3B387E]">About Us</h1>
            <div className="flex gap-x-20">
                <article className="flex-2/3 space-y-20 py-5 text-3xl font-black text-[#3B387E]">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit
                    </p>
                    <Button
                        onClick={() => router.get(route('produk'))}
                        className="w-1/4 cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE]"
                    >
                        Pesan Sekarang <LucideArrowRight color="#EBEFFF" />
                    </Button>
                </article>
                <div className="relative">
                    <img src="Asset\Image\bungaTelangAboutUs.png" alt="" className="flex-1/4 rounded-3xl" />
                    <img src="Asset\Particle\particleAboutUs2.svg" alt="" className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/3" />
                </div>
            </div>
            <img src="Asset\Particle\particleAboutUs1.svg" alt="" className="absolute top-1/12 -translate-x-4/5" />
            <img src="Asset\Particle\particleAboutUs2.svg" alt="" className="absolute bottom-1/6 -translate-x-4/5 translate-y-4/5" />
        </div>
    );
}
