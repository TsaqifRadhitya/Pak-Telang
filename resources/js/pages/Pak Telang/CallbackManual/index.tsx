import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AdminPageLayout from '@/layouts/adminPageLayout';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { useState } from 'react';
import InputError from '../../../components/input-error';

type ress = {
    type: 'error' | 'success';
    ressData: object | string;
};

export default function Index() {
    const [err, setErr] = useState<string>();
    const [ressData, setRess] = useState<ress>();
    const [orderId, setOrderId] = useState<string>();
    const handleSubmit = async () => {
        if (!orderId) {
            setErr('Harap Memasukkan Order Id');
        }
        axios
            .post(route('midtrans.callback.manual'), {
                id: orderId,
            })
            .then((ress) => {
                setErr(undefined);
                setRess({ type: 'success', ressData: ress.data });
            })
            .catch((err) => {
                setErr(err.response.data.message);
                setRess({ type: 'error', ressData: err.response.data.message });
            });
    };
    return (
        <AdminPageLayout>
            <main className="relative flex h-full w-full flex-col rounded-t-lg border-[1px] border-b-0 border-[#AFB3FF] bg-[#FFFFFF] shadow-lg">
                <div className="flex items-center border-b-[1px] border-[#AFB3FF] p-5 md:px-10 md:py-5">
                    <h1 className="text-xl font-semibold">Emergency Midtrans Callback</h1>
                </div>
                <section className="flex flex-1 flex-col items-center justify-center space-y-2.5 p-5 md:p-5">
                    <h1 className="w-full max-w-lg font-semibold text-center text-2xl mb-10">Emergency Midtrans Callback</h1>
                    <h1 className="w-full max-w-lg font-semibold">Order Id</h1>
                    <Input onChange={(e) => setOrderId(e.target.value)} type="text" placeholder="order id" className="max-w-lg" />
                    {err && <InputError message={err} className="w-full max-w-lg text-left" />}
                    <Button
                        onClick={handleSubmit}
                        className="w-full max-w-lg cursor-pointer bg-[#3B387E] text-white ring ring-[#3B387E] hover:bg-transparent hover:font-semibold hover:text-[#3B387E]"
                    >
                        Submit
                    </Button>
                    {ressData && (
                        <div
                            className={cn(
                                'text- w-full max-w-lg break-words rounded-lg border-2 border-green-400 bg-green-300 p-5 text-green-600',
                                ressData.type === 'error' && 'border-red-500 bg-red-400 text-red-600 text-center',
                            )}
                        >
                            {typeof ressData.ressData === typeof"" ? ressData.ressData as string : JSON.stringify(ressData.ressData)}
                        </div>
                    )}
                </section>
            </main>
        </AdminPageLayout>
    );
}
