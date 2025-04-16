import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import mitra from '../../../types/mitra';
import AllMitra from './allMitra';
import SubmissionMitra from './submissionMitra';

export type prop  = {
    mitra: mitra[];
    pengajuanMitra: mitra[];
}
export default function mitraAdminPage() {
    const [firstSubmenu, setFirstSubtMenu] = useState<boolean>(false);
    return (
        <AdminPageLayout page="Mitra">
            <main className="h-full w-full rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center gap-x-4 border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1
                        onClick={() => setFirstSubtMenu(false)}
                        className={cn('cursor-pointer text-xl font-semibold', !firstSubmenu && 'underline decoration-[4px] underline-offset-[6px]')}
                    >
                        Mitra
                    </h1>
                    <h1 className="font-black">|</h1>
                    <h1
                        onClick={() => setFirstSubtMenu(true)}
                        className={cn('cursor-pointer text-xl font-semibold', firstSubmenu && 'underline decoration-[4px] underline-offset-[6px]')}
                    >
                        Pengajuan Mitra
                    </h1>
                </div>
                {!firstSubmenu ? <AllMitra /> : <SubmissionMitra />}
            </main>
        </AdminPageLayout>
    );
}
