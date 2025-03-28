import { Card } from '@/components/ui/card';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';

type personType = {
    name: string;
    id: string;
};

interface props extends SharedData {
    persons: personType[];
}

export default function allPerson() {
    const { persons } = usePage<props>().props;
    console.log(persons);
    return (
        <div className="min-h-screen w-full bg-white p-5">
            <h1 className="text-2xl font-bold text-black">Daftar User</h1>
            {persons.map((e) => {
                return (
                    <Card onClick={()=> router.get(route('chat.create',{id : e.id}))} key={e.id} className="cursor-pointer border-0 bg-white text-black">
                        <h1 className="pl-5">{e.name}</h1>
                    </Card>
                );
            })}
        </div>
    );
}
