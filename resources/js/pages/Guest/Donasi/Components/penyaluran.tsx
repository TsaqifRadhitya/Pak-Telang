import Heading from '../../../../components/heading';
export default function Penyaluran() {
    return (
        <section className="flex min-h-screen flex-col bg-[#EBEFFF] text-center px-5 lg:px-20 text-[#3B387E]">
            <Heading title="Penyaluran Donasi" className="text-4xl" />
            <p className="mt-5 text-xl">Pilihan minuman berkualitas untuk hari-harimu yang lebih sehat</p>
            <div className="w-fu flex-1 grid-cols-2 lg:grid xl:grid-cols-3"></div>
        </section>
    );
}
