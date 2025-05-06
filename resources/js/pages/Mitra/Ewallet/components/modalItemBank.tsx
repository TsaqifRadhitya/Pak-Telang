import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { WidrawEwalletType } from '@/types/wdEwallet';
import InputError from '../../../../components/input-error';

export type SetData<TForm> = {
    (data: Partial<TForm>): void;

    <K extends keyof TForm>(key: K, value: TForm[K]): void;

    (updater: (previousData: TForm) => TForm): void;
};

const banks = [
    // Bank BUMN
    'Bank Mandiri',
    'Bank Rakyat Indonesia (BRI)',
    'Bank Negara Indonesia (BNI)',
    'Bank Tabungan Negara (BTN)',

    // Bank Swasta Nasional
    'Bank Central Asia (BCA)',
    'Bank CIMB Niaga',
    'Bank Danamon',
    'Bank Permata',
    'Bank Mega',
    'Bank OCBC NISP',
    'Bank Sinarmas',
    'Bank Mayapada',
    'Bank Panin',

    // Bank Asing
    'HSBC Indonesia',
    'Standard Chartered Bank Indonesia',
    'Citibank Indonesia',
    'Bank UOB Indonesia',
    'Bank DBS Indonesia',
];

export default function ModalItemBank({
    data,
    error,
    setData,
}: {
    data: WidrawEwalletType;
    error: Partial<Record<keyof WidrawEwalletType, string>>;
    setData: SetData<WidrawEwalletType>;
}) {
    return (
        <div className="mt-2.5 space-y-2.5">
            <div>
                <Label className="text-md font-semibold">Pilih Bank</Label>
                <select
                    onChange={(e) => setData('provider', e.target.value)}
                    className="h-9 w-full rounded-md p-1 ring ring-[#B9BDFF] focus-visible:ring-2"
                >
                    <option value="">Pilih Bank</option>
                    {banks.map((bank) => (
                        <option key={bank} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>
                <InputError message={error.provider} />
            </div>
            <div className="flex gap-2.5">
                <div className="flex-1/2">
                    <Label className="text-md font-semibold">Nama Pemilik Rekening</Label>
                    <Input
                        onChange={(e) => setData('ownerName', e.target.value)}
                        value={data.ownerName ?? ""}
                        className="mt-0.5 border-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:border-0 focus-visible:ring-[#B9BDFF]"
                        placeholder="Nama Pemilik Rekening"
                        type="text"
                    />
                    <InputError message={error.ownerName} />
                </div>
                <div className="flex-1/2">
                    <Label className="text-md font-semibold">Nomor Rekening</Label>
                    <Input
                        onChange={(e) => setData('number', e.target.value)}
                        value={data.number?.toString() ?? "0"}
                        className="mt-0.5 border-[#B9BDFF] placeholder:text-[#B9BDFF] focus-visible:border-0 focus-visible:ring-[#B9BDFF]"
                        placeholder="No. Rekening"
                        type="number"
                    />
                    <InputError message={error.number} />
                </div>
            </div>
        </div>
    );
}
