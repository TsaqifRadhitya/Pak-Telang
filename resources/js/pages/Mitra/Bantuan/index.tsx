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
                    <div className="flex-1 rounded-t-2xl p-5 ring ring-[#3B387E] flex flex-col justify-center">
                        <Heading title="FAQ (Frequently Asked Questions)" className="text-center text-2xl" />
                        <HeadingSmall title="Pertanyaan seputar kemitraan Pak Telang" className="text-center text-sm" />
                        <div className="mt-5 h-[2.5px] bg-[#D9D9D9]"></div>
                        <div className="mt-5 flex flex-col gap-5 md:max-h-[40vh] md:overflow-y-auto md:p-1">
                            <FAQComponent header="Bagaimana Cara Mendapatkan Notifikasi Pesanan ?">
                                <p className="text-justify">
                                    Notifikasi pesanan biasanya terkirim otomatis ke alamat email akun Anda. Namun, jika tidak muncul di kotak masuk,
                                    kemungkinan besar masuk ke folder spam atau promosi. Solusi yang bisa anda lakukan adalah periksa folder spam pada
                                    email Anda lalu tandai email dari kami sebagai "bukan spam". Jika hal tersebut sudah dilakukan, maka secara
                                    otomatis anda akan mendapatkan notifikasi melalui email apabila mendapatkan pesanan.
                                </p>
                            </FAQComponent>
                            <FAQComponent header="Bagaimana Cara Mencairkan Pendapatan Saya ?">
                                <p className="text-justify">
                                    Pencairan pendapatan dapat dilakukan apabila anda telah menyelesaikan transaksi. Anda dapat mencairkannya melalui
                                    halaman dashboard, lalu klik lihat e-wallet. Apabila anda memiliki saldo e-wallet, maka anda dapat mengklik tarik
                                    saldo dan memilih metode pencairannya. Pencairan ini akan ditindak lanjuti apabila telah mendapat persetujuan dari
                                    admin. Anda dapat memantaunya secara berkala melalui fitur e-wallet pada dashboard.
                                </p>
                            </FAQComponent>
                            <FAQComponent header="Apakah saya harus memesan bahan baku secara berkala ?">
                                <p className="text-justify">
                                    Anda tidak perlu memesan bahan baku secara berkala. Silahkan memesan bahan baku apabila stok bahan baku anda
                                    menipis atau anda memerlukan lebih banyak bahan baku. Namun tetap pastikan anda mematuhi aturan yang telah
                                    tertulis pada MoU.
                                </p>
                            </FAQComponent>
                            <FAQComponent header="Apakah ada ketentuan metode pengiriman pesanan ke pembeli ?">
                                <p className="text-justify">
                                    Tidak ada. Anda bebas menentukan metode pengiriman yang digunakan. Diperkenankan untuk mengantar produk secara
                                    langsung kepada pembeli atau bisa juga menggunakan jasa ojek. Pastikan anda mengantar produk hingga ke tangan
                                    pembeli dengan baik.
                                </p>
                            </FAQComponent>
                            <FAQComponent header="Apakah saya bisa menerima pesanan di luar kota saya tinggal ?">
                                <p className="text-justify">
                                    Tidak bisa. Tim Pak Telang ingin memastikan bahwa produk yang diterima pembeli dalam kondisi terbaik dan sehat
                                    untuk dikonsumsi. Kami khawatir produk dapat mengalami kerusalann apabila didistribusikan di luar kota tempat anda
                                    tinggal.
                                </p>
                            </FAQComponent>
                        </div>
                    </div>
                </div>
            </main>
        </MitraPageLayout>
    );
}
