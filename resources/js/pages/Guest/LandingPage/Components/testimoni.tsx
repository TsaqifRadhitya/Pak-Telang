import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { LucideArrowRight } from 'lucide-react';

export default function testimoni() {
    return (
        <div className="relative h-screen overflow-hidden bg-pink-400">
            <img src="Asset\Background Image\Testimoni.png" alt="" className="z-0 w-full" />
            <main className="absolute top-0 z-20 h-full w-full">
                <div className="absolute top-1/2 left-1/12 flex h-2/3 w-3/7 -translate-y-1/2 flex-col gap-y-10 rounded-4xl bg-[#AFB3FF] p-20 text-xl font-semibold text-[#3B387E]">
                    <div className="absolute top-0 h-full w-1/4 -translate-x-1/3 -translate-y-1/4 rounded-lg bg-transparent px-8 pt-16 pb-24 text-center">
                        <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full bg-[#5961BE] font-bold text-white">
                            <h1 className="absolute top-1/2 -translate-y-1/3 text-[10rem]">“</h1>
                        </div>
                    </div>
                    <h1 className="text-5xl font-black">Testimoni</h1>
                    <p className="w-2/3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod.
                    </p>
                    <p className="w-2/3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                    <Button
                        onClick={() => router.get(route('produk'))}
                        className="w-1/3 cursor-pointer bg-[#5961BE] text-[#EBEFFF] hover:bg-[#5961BE]"
                    >
                        Pesan Sekarang <LucideArrowRight color="#EBEFFF" />
                    </Button>
                    <div className="absolute top-0 flex h-full w-full translate-x-7/10 gap-x-9 py-20">
                        {Array.from({ length: 2 }).map(() => (
                            <div className="flex flex-1/2 flex-col gap-y-5 rounded-lg bg-[#5961BE] p-10">
                                <div className="relative flex-1/2">
                                    <div className="absolute top-0 h-full w-1/4 -translate-x-2/3 -translate-y-1/3 rounded-lg bg-transparent px-8 pt-16 pb-24 text-center">
                                        <div className="relative flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#AFB3FF] font-bold text-white">
                                            <h1 className="absolute top-4/7 -translate-y-1/3 text-5xl">“</h1>
                                        </div>
                                    </div>
                                    <img src="Asset\Image\Testimoni.png" alt="" className="w-full" />
                                </div>
                                <div className="flex flex-1/2 flex-col gap-y-5 text-white">
                                    <p className="font-extralight">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet,
                                        consectetur adipiscing elit, sed do eiusmod.
                                    </p>
                                    <h1>Apipa</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
