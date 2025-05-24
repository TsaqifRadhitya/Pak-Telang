import { cn } from '@/lib/utils';
import { Plus, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

type props = {
    setImage: (param: File[] | undefined) => void;
    inputMessage: string;
    setInputMessage: (param: string) => void;
    images: File[];
    newMessage: () => void;
    inputFile: React.RefObject<HTMLInputElement | null>;
    isTyping: boolean;
};

export default function ChatAreaWithPhotos(param: props) {
    const { setImage, inputMessage, images, newMessage, setInputMessage, inputFile } = param;
    const handleDeleteImage = (params: number) => {
        const newImages = [...images].filter((images, index) => index != params);
        if (params !== 0) {
            setSelected((prev) => prev - 1);
        }
        setImage(newImages.length > 0 ? newImages : undefined);
    };
    const [selected, setSelected] = useState<number>(0);
    return (
        <div className="relative mt-5 flex flex-1 flex-col rounded-t-2xl bg-black/50 p-5 ring">
            <img src={URL.createObjectURL(images[selected])} alt="" className="mx-auto mt-auto max-h-52" />
            <div className="absolute top-1/2 left-1/2 flex w-[95%] -translate-1/2 justify-between">
                <Button
                    className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                    onClick={() => setSelected((prev) => prev - 1)}
                    disabled={selected === 0}
                >
                    {'<'}
                </Button>
                <Button
                    className="h-10 min-h-0 cursor-pointer rounded-full px-4 ring ring-[#3B387E] hover:bg-[#3B387E] hover:text-white disabled:cursor-default disabled:opacity-50"
                    onClick={() => setSelected((prev) => prev + 1)}
                    disabled={selected === images.length - 1}
                >
                    {'>'}
                </Button>
            </div>
            <div className="mt-auto mb-2.5 flex justify-center gap-2.5">
                {images.map((image, index) => (
                    <div className="relative" key={index}>
                        <img
                            onClick={() => setSelected(index)}
                            className={cn(
                                'aspect-square h-14 cursor-pointer rounded-lg object-cover object-center',
                                index === selected && 'scale-110 cursor-default border border-white',
                            )}
                            src={URL.createObjectURL(image)}
                            key={index}
                        />
                        {selected === index && (
                            <Trash2Icon
                                onClick={() => handleDeleteImage(index)}
                                className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer text-white"
                            />
                        )}
                    </div>
                ))}
                <div
                    onClick={() => inputFile.current?.click()}
                    className="flex aspect-square h-14 cursor-pointer items-center justify-center rounded-lg ring"
                >
                    <Plus />
                </div>
            </div>
            <h1
                onClick={() => setImage(undefined)}
                className="absolute top-5 left-5 aspect-square h-fit rotate-45 cursor-pointer rounded-full bg-[#3B387E] px-2 text-xl text-white ring ring-[#3B387E] hover:hover:bg-white hover:font-semibold hover:text-[#3B387E]"
            >
                +
            </h1>
            <div className="z-[999] w-full self-end">
                <section className="relative mt-1 flex gap-2.5">
                    <Textarea
                        placeholder="Tambahkan keterangan....."
                        className="min-10 h-fit flex-1 border-0 pr-7 text-[#3B387E] ring ring-[#3B387E] placeholder:text-[#3B387E] focus-visible:ring-3 focus-visible:ring-[#3B387E]"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />

                    <Button onClick={newMessage} className="group h-10 cursor-pointer ring ring-[#3B387E] hover:bg-[#3B387E]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_1378_6373)">
                                <path d="M15.5 5H11L16 12L11 19H15.5L20.5 12L15.5 5Z" className="fill-[#3B387E] group-hover:fill-white" />
                                <path d="M8.5 5H4L9 12L4 19H8.5L13.5 12L8.5 5Z" className="fill-[#3B387E] group-hover:fill-white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1378_6373">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </Button>
                </section>
            </div>
        </div>
    );
}
