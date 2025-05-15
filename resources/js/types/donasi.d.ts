export type donasiTye = {
    id : string,
    nominal : number,
    name : string,
    email : string,
    pesan : string,
    status : donasiStatusType
    created_at : string
    updated_at : string
}

export type donasiStatusType = 'pending' | 'paid' | 'failed'
