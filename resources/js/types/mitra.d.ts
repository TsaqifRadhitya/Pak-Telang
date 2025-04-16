import { User } from "."
import { addressType } from '@/types/address';

export default interface mitra {
    id:string
    alasanPengajuan:string,
    fotoDapur : string[],
    fotoKTP : string,
    isOpen : boolean,
    kulkas : boolean,
    mou : string,
    namaUsaha : string,
    pesanPersetujuan : string
    postalCode : string,
    statusPengajuan : string,
    user:User
    address : addressType
}
