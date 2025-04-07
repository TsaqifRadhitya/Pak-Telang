import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Copyright } from 'lucide-react';
import HeadingSmall from '../../../../components/heading-small';
export default function Contact() {
    const { auth } = usePage<SharedData>().props;
    return (
        <div className="hidden grid-cols-4 flex-col gap-4 bg-[#EBEFFF] p-20 px-10 pt-0 pb-10 lg:grid">
            <Card className="col-span-4 h-fit w-full rounded-3xl border-0 bg-white px-5 py-7">
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-end gap-x-5">
                                <h1 className="text-2xl font-black text-[#3B387E]">Pak Telang</h1>
                                <HeadingSmall
                                    title="Pilihan minuman berkualitas untuk hari-harimu yang lebih sehat"
                                    className="text-[#3B387E] text-lg"
                                />
                            </div>
                            <p className="flex items-center gap-x-1 text-xs text-[#3B387E]">
                                <Copyright size={20} strokeWidth={1} />
                                Copyright 2025
                            </p>
                        </div>
                        {!auth.user && (
                            <Button
                                onClick={() => router.get('register')}
                                className="min-h-full scale-125 cursor-pointer rounded-xl bg-[#5961BE] font-medium text-white hover:bg-[#4e55a1]"
                            >
                                Register Now
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
            <Card className="rounded-3xl border-0 bg-white p-7.5 px-2.5 text-[#3B387E]">
                <CardHeader>
                    <CardTitle className="text-xl">Social Media</CardTitle>
                    <p className="text-sm">Jangan lupa ikuti sosial media kami untuk update harian kami.</p>
                </CardHeader>
                <CardContent className='flex flex-col gap-y-5'>
                    <CardDescription className='flex items-center gap-x-4 text-[#3B387E]'><img src='Asset\Icon\Instagram.svg'/>paktelang</CardDescription>
                    <CardDescription className='flex items-center gap-x-4 text-[#3B387E]'><img src='Asset\Icon\Youtube.svg'/>paktelang</CardDescription>
                    <CardDescription className='flex items-center gap-x-4 text-[#3B387E]'><img src='Asset\Icon\Tiktok.svg'/>paktelang</CardDescription>
                </CardContent>
            </Card>
            <Card className="rounded-3xl border-0 bg-white p-7.5 px-2.5 text-[#3B387E]">
                <CardHeader>
                    <CardTitle className="text-xl">Kontak</CardTitle>
                    <p className="text-sm">Hubungi kami melalui beberapa cara berikut ini.</p>
                </CardHeader>
                <CardContent className='flex flex-col gap-y-5'>
                    <CardDescription className='flex items-center gap-x-4 text-[#3B387E] '><img src='Asset\Icon\Phone.svg'/>08123456789</CardDescription>
                    <CardDescription className='flex items-center gap-x-4 text-[#3B387E] '><img src='Asset\Icon\Whatsapp.svg'/>08123456789</CardDescription>
                    <CardDescription className='flex items-center gap-x-4 text-[#3B387E] '><img src='Asset\Icon\Location.svg'/>Jl. Rajawali, Krajan, Klungkung, Kec. Sukorambi, Kabupaten Jember, Jawa Timur</CardDescription>
                </CardContent>
            </Card>
            <Card className="col-span-2 rounded-3xl border-0 bg-white py-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5096.74447161094!2d113.6796449!3d-8.116914999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd695007cbb049d%3A0x2f1ea232340e9a1a!2sPak%20Telang%20(%20Teh%20Bunga%20Telang%20)!5e1!3m2!1sen!2sid!4v1743261918620!5m2!1sen!2sid"
                    className="h-full w-full rounded-3xl"
                    loading="lazy"
                    contextMenu="disable"
                ></iframe>
            </Card>
        </div>
    );
}
