import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WidrawEwalletType } from '@/types/wdEwallet';
import InputError from '../../../../components/input-error';

export type SetData<TForm> = {
    (data: Partial<TForm>): void;

    <K extends keyof TForm>(key: K, value: TForm[K]): void;

    (updater: (previousData: TForm) => TForm): void;
};

export default function ModalItemBank({
    data,
    error,
    setData,
}: {
    data: WidrawEwalletType;
    error: Partial<Record<keyof WidrawEwalletType, string>>;
    setData: SetData<WidrawEwalletType>;
}) {
    console.log(data)
    return (
        <div>
            <div>
                <Label>Pilih Bank</Label>
                <select onChange={(e) => setData('provider', e.target.value)} className="w-full">
                    <option value="">Pilih Bank</option>
                </select>
                <InputError message={error.provider} />
            </div>
            <div className="flex gap-2.5">
                <div className="flex-1/2">
                    <Label>Nama Pemilik Rekening</Label>
                    <Input type="text" />
                    <InputError message={error.OwneName} />
                </div>
                <div className="flex-1/2">
                    <Label>Nomor Rekening</Label>
                    <Input type="number" />
                    <InputError message={error.number} />
                </div>
            </div>
        </div>
    );
}
