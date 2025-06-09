import mitra from '@/types/mitra';
import { usePage } from '@inertiajs/react';
import FormApprove from './components/statusFormApprove';
import FormPending from './components/statusFormPending';
import FormRejected from './components/statusFormRejected';
import MoUWaitingApprovement from './components/statusMoUWaitingApprovement';
import MouRejected from './components/statusMouRejected';

export default function Show() {
    const { mitra } = usePage<{ mitra: mitra }>().props;
    switch (mitra.statusPengajuan) {
        case 'Menunggu Persetujuan Formulir':
            return <FormPending />;
        case 'Formulir disetujui':
            return <FormApprove />;
        case 'Formulir ditolak':
            return <FormRejected />;
        case 'Menunggu Persetujuan MOU':
            return <MoUWaitingApprovement />;
        default:
            return <MouRejected />;
    }
}
