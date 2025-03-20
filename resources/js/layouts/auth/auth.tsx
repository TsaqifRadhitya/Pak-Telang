import { Head } from "@inertiajs/react";

export default function AuthLayout({children,head} : {children : React.ReactNode,head : string}) {
    return (
        <div className="flex min-h-screen w-full flex-row">
            <Head title={head} />
            <main className="relative flex-1 bg-[#EBEFFF] md:flex-2/3">
                <div className="absolute top-1/2 left-1/2 flex h-fit w-2/3 -translate-1/2 flex-col gap-y-6 md:w-2/3 xl:w-2/5 lg:w-2/5">
                    {children}
                </div>
            </main>
            <aside className="relative hidden flex-1/3 bg-[#666FD5] xl:block">
                <div className="absolute top-1/2 flex min-h-5/7 w-5/6 -translate-x-1/6 -translate-y-1/2 flex-row rounded-[4rem] bg-[#AFB3FF] p-15">
                    <h1 className="text-5xl font-extralight text-white">
                        Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed <br /> do <br /> eiusmod
                    </h1>
                    <img
                        src="Asset\Image\bungaTelang.png"
                        alt="bunga"
                        className="absolute top-1/2 ml-auto w-fit translate-x-3/7 -translate-y-1/2 scale-125"
                    />
                </div>
            </aside>
        </div>
    );
}
