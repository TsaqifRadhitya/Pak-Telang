import ChatDisplayComponent from '@/components/chatDisplay';
import MitraPageLayout from '@/layouts/mitraPageLayout';
import { chatType } from '@/types/chat';
import Heading from '../../../components/heading';
import HeadingSmall from '../../../components/heading-small';
import FAQComponent from './components/faqItem';

export default function BantuanPages({ lastChat }: { lastChat: chatType }) {
    return (
        <MitraPageLayout page="Bantuan">
            <main className="relative z-0 flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Bantuan</h1>
                </div>
                <div className="flex flex-1 flex-col space-y-5 px-7 pt-5">
                    <div className="rounded-2xl p-5 ring ring-[#3B387E]">
                        <Heading title="Chat" className="mb-5 text-xl" />
                        <ChatDisplayComponent lastChat={lastChat} type="Mitra" />
                    </div>
                    <div className="flex-1 rounded-t-2xl p-5 ring ring-[#3B387E]">
                        <Heading title="FAQ (Frequently Asked Questions)" className="text-center text-2xl" />
                        <HeadingSmall title="Pertanyaan seputar kemitraan Pak Telang" className="text-center text-sm" />
                        <div className="mt-5 h-[2.5px] bg-[#D9D9D9]"></div>
                        <div className="mt-5 flex flex-col gap-5 md:max-h-[40vh] md:overflow-y-auto md:p-1">
                            <FAQComponent header="Lorem Ipsum is simply dummy text of the printing and typesetting industry.">
                                <p className="text-justify">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum.
                                </p>
                            </FAQComponent>
                            <FAQComponent header="Lorem Ipsum is simply dummy text of the printing and typesetting industry.">
                                <p className="text-justify">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum.
                                </p>
                            </FAQComponent>
                            <FAQComponent header="Lorem Ipsum is simply dummy text of the printing and typesetting industry.">
                                <p className="text-justify">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum.
                                </p>
                            </FAQComponent>{' '}
                            <FAQComponent header="Lorem Ipsum is simply dummy text of the printing and typesetting industry.">
                                <p className="text-justify">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum.
                                </p>
                            </FAQComponent>{' '}
                            <FAQComponent header="Lorem Ipsum is simply dummy text of the printing and typesetting industry.">
                                <p className="text-justify">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                                    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
                                    of Lorem Ipsum.
                                </p>
                            </FAQComponent>
                        </div>
                    </div>
                </div>
            </main>
        </MitraPageLayout>
    );
}
