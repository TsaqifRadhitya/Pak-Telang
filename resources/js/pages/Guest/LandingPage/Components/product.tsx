import { Button } from '@/components/ui/button';
import Heading from '../../../../components/heading';
import HeadingSmall from '../../../../components/heading-small';
import { motion } from 'motion/react'
export default function product() {
    return (
        <div className="min-h-screen md:h-screen space-y-5 bg-[#EBEFFF] px-32 py-20">
            <Heading title="Produk Kami" disableMb className="text-4xl font-black text-[#3B387E]" />
            <HeadingSmall title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. " className='text-[#3B387E] font-black'/>
            <div className="relative md:flex h-4/5 gap-x-20 px-5">
                {Array.from({ length: 3 }).map((i, index) => (
                    <motion.div initial = {{ scale : 0.9, opacity : 0 }} style={{ transformOrigin: "bottom" }} whileInView={{opacity : 1, scale : 1,transition : {duration : 0.4} }} key={index} className="relative h-full flex-1/3 rounded-2xl bg-[#EBEFFF] shadow-xl">
                        <div className="h-2/5 w-full rounded-t-xl bg-[#9A9FFF]"></div>
                        <div className="absolute top-0 left-1/2 mx-auto h-1/2 w-5/7 -translate-x-1/2 rounded-b-full bg-linear-180 from-[#9A9FFF] to-[#5961BE]"></div>
                        <div className="mt-20 w-fit rounded-r-full bg-[#5961BE] px-10 py-2 shadow-md">
                            <h1 className="w-fit pr-4 text-xl font-medium text-white">Teh Telang</h1>
                        </div>
                        <p className='px-10 py-10 text-xl text-[#5961BE] font-medium'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod.
                        </p>
                        <div className='w-full mt-auto px-10 flex items-center justify-between'>
                            <h1 className='text-[#5961BE] font-bold text-2xl'>Rp2.500,00</h1>
                            <Button className='bg-transparent ring-[#5961BE] ring-2 rounded-full text-[#5961BE] cursor-pointer hover:bg-[#5961BE] hover:text-white'>Beli Sekarang</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
