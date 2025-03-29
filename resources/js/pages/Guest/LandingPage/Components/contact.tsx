import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copyright } from 'lucide-react';
import HeadingSmall from '../../../../components/heading-small';

export default function contact() {
    return (
        <div className="hidden h-screen flex-col gap-y-4 bg-[#EBEFFF] p-20 lg:flex">
            <Card className="h-fit w-full rounded-4xl border-0 bg-[#AFB3FF] px-5 py-7">
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-end gap-x-5">
                                <h1 className="text-2xl font-black text-[#3B387E]">Pak Telang</h1>
                                <HeadingSmall
                                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
                                    className="text-[#3B387E]"
                                />
                            </div>
                            <p className="flex items-center gap-x-1 text-xs text-[#3B387E]">
                                <Copyright size={20} strokeWidth={1} />
                                Copyright 2025
                            </p>
                        </div>
                        <Button className="min-h-full scale-125 rounded-xl bg-[#5961BE] cursor-pointer hover:bg-[#4e55a1] font-medium text-white">Register Now</Button>
                    </div>
                </CardContent>
            </Card>
            <div className="flex h-full gap-x-4">
                <Card className="flex-1/4 rounded-4xl border-0 bg-[#AFB3FF]"></Card>
                <Card className="flex-1/4 rounded-4xl border-0 bg-[#AFB3FF]"></Card>
                <Card className="flex-1/2 rounded-4xl border-0 bg-[#AFB3FF]"></Card>
            </div>
        </div>
    );
}
