export default function Benefit() {
    return (
        <section className="flex min-h-screen w-full flex-col items-center gap-10 bg-[#EBEFFF] p-5 text-[#3B387E] lg:gap-20 lg:p-32">
            <header className="flex flex-col items-center text-center lg:w-3/5">
                <h1 className="text-2xl font-black lg:text-[2.8rem]">Keuntungan Menjadi Mitra Kami</h1>
                <h3 className="text-lg lg:max-w-11/12">
                    Bergabunglah dengan komunitas mitra kami dari berbagai daerah dan dapatkan peluang kerja sama baru.
                </h3>
            </header>
            <article className="flex flex-col gap-40 text-center lg:flex-row">
                <div className="flex aspect-3/2 flex-1/3 flex-col items-center gap-8">
                    <img src="/Asset/image/image 8.png" alt="" />
                    <article className="flex w-full flex-col items-center space-y-2">
                        <h3 className="text-xl font-bold">Keuntungan Menjadi Mitra Kami</h3>
                        <p className="text-md w-11/12">
                            Dapatkan margin keuntungan yang kompetitif untuk setiap transaksi. Semakin aktif, semakin besar peluang untungnya!
                        </p>
                    </article>
                </div>
                <div className="flex aspect-3/2 flex-1/3 flex-col items-center gap-8">
                    <img src="/Asset/image/image 9.png" alt="" />
                    <article className="flex w-full flex-col items-center space-y-2">
                        <h3 className="text-xl font-bold">Keuntungan Menjadi Mitra Kami</h3>
                        <p className="text-md w-11/12">
                            Kami tidak hanya memberikan produk, tapi juga pendampingan, tempat dagang, dan materi promosi untuk membantu bisnismu
                            berkembang
                        </p>
                    </article>
                </div>
                <div className="flex aspect-3/2 flex-1/3 flex-col items-center gap-8">
                    <img src="/Asset/image/image 10.png" alt="" />
                    <article className="flex w-full flex-col items-center space-y-2">
                        <h3 className="text-xl font-bold">Keuntungan Menjadi Mitra Kami</h3>
                        <p className="text-md w-11/12">
                            Kelola pesanan, stok, hingga laporan penjualan dengan mudah lewat platform kami yang modern, efisien, dan siap pakai.
                        </p>
                    </article>
                </div>
            </article>
            <section className="flex flex-col gap-10 lg:flex-row lg:gap-32">
                <article className="flex flex-1/4 flex-col items-center text-center">
                    <h3 className="text-3xl font-bold">10K+</h3>
                    <p>
                        Mitra di Seluruh <br /> Indonesia
                    </p>
                </article>
                <article className="flex flex-1/4 flex-col items-center text-center">
                    <h3 className="text-3xl font-bold">1M+</h3>
                    <p>
                        Produk Telah <br /> terjual
                    </p>
                </article>
                <article className="flex flex-1/4 flex-col items-center text-center">
                    <h3 className="text-3xl font-bold">400+</h3>
                    <p>Tersebar di Berbagai Kota</p>
                </article>
                <article className="flex flex-1/4 flex-col items-center text-center">
                    <h3 className="text-3xl font-bold">20K+</h3>
                    <p>
                        Telah Mendukung <br /> Berbagai Event
                    </p>
                </article>
            </section>
        </section>
    );
}
