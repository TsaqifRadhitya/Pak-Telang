import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { mouEditor } from '@/utils/mouEditor';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const mouUrl = 'https://ybcvbaxalqwrvgemxdzc.supabase.co/storage/v1/object/public/paktelang/Mou/Template/MOU%20Pak%20Telang%20(2).docx';

export default function Mou() {
    const [url, setUrl] = useState<string>(mouUrl);
    const { auth } = usePage<SharedData>().props;
    const handleUpdate = () => {
        mouEditor.replacer(mouUrl, { User: auth.user }).then((ress) => {
            const link = document.createElement('a');
            link.href = ress as string;
            link.download = 'nama_file.docx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setUrl(ress as string)
        });
    };
    return (
        <div className="flex min-h-screen w-screen">
            <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`} className="w-1/3 flex-2/3"></iframe>
            <Button onClick={handleUpdate}>Update</Button>
        </div>
    );
}
