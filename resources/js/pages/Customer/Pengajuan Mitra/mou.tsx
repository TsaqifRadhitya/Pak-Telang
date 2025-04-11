import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { mouEditor } from '@/utils/mouEditor';
import { usePage } from '@inertiajs/react';
import { renderAsync } from 'docx-preview';
import { useEffect } from 'react';

const mouUrl = 'https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Mou/Template/MOU%20Pak%20Telang%20(2).docx';

export default function Mou() {
    const { auth } = usePage<SharedData>().props;
    useEffect(() => {
        handleLoadPreview();
    }, []);
    const handleLoadPreview = async (blob?: Blob) => {
        if (blob) {
            await renderAsync(blob, document.getElementById('docpreview') as HTMLElement);
        } else {
            const req = await fetch(mouUrl);
            const ress = await req.arrayBuffer();
            await renderAsync(ress, document.getElementById('docpreview') as HTMLElement);
        }
    };
    const handleUpdate = () => {
        mouEditor.replacer(mouUrl, { User: auth.user }).then((ress) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(ress);
            link.download = 'nama_file.docx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            handleLoadPreview(ress);
        });
    };
    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen items-center">
            <div className="max-h-screen max-w-full w-fit overflow-y-auto w-" id="docpreview"></div>
            <div className="flex-1">
                <Button className="w-full" onClick={handleUpdate}>
                    Update
                </Button>
            </div>
        </div>
    );
}
