import HeadingSmall from '@/components/heading-small';
import LandingPageLayout from '@/layouts/landingPageLayout';
import Heading from '../../../components/heading';

export default function kontenPage() {
    return (
        <LandingPageLayout page="Konten">
            <section className="min-h-screen w-full bg-[#EBEFFF] text-[#3B387E] p-5 lg:p-10 pt-20 lg:pt-24 space-y-2.5">
                <Heading title="Konten Kami" className='text-3xl font-bold'/>
                <HeadingSmall className='text-xl font-semibold'
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry also the leap into electronic"
                />
                <article className='w-full grid lg:grid-cols-3 gap-10 mt-10 px-2.5'>
                    {Array.from({length: 6}).map(()=> <div className='shadow rounded-lg w-full aspect-4/5 bg-white'>

                    </div>)}
                </article>
            </section>
        </LandingPageLayout>
    );
}
