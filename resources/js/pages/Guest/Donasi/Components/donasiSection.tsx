import Form from './form';

export default function MainContent({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
    return (
        <section ref={ref} className="bg-[#EBEFFF] px-5 pb-20 text-[#3B387E] lg:px-20">
            <Form />
        </section>
    );
}
