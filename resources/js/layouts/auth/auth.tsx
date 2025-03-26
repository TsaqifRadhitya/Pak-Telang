import { Head } from "@inertiajs/react";
import { cn } from "@/lib/utils";

export default function AuthLayout({children,head,className} : {children : React.ReactNode,head : string,className? : string}) {
    return (
        <div className={cn("flex min-h-screen w-full flex-row overflow-x-hidden",className)}>
            <Head title={head} />
            <main className="flex-1 bg-[#EBEFFF] md:flex-2/3 content-center">
                <div className="mx-auto flex h-fit w-full p-10 md:p-0 flex-col gap-y-6 md:w-1/2 xl:w-2/5 lg:w-2/5">
                    {children}
                </div>
            </main>
            <aside className="relative hidden md:flex-3/5 xl:flex-2/5 2xl:flex-1/3 bg-[#666FD5] xl:block">
                <div className="absolute top-1/2 flex min-h-5/7 w-5/6 -translate-x-1/6 -translate-y-1/2 flex-row rounded-[4rem] bg-[#AFB3FF] p-15">
                    <h1 className="text-5xl font-extralight text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed <br /> do <br /> eiusmod
                    </h1>
                    <img
                        src="Asset\Image\bungaTelang.png"
                        alt="bunga"
                        className="absolute top-1/2 ml-auto w-fit xl:translate-x-2/7 2xl:translate-x-3/7 -translate-y-1/2 2xl:scale-125 scale-105"
                    />
                </div>
            </aside>
        </div>
    );
}
