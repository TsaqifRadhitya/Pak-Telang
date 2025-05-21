export type donasiType = {
    id? : string,
    nominal : number | undefined,
    name : string,
    email : string,
    pesan? : string,
    status? : donasiStatusType
    created_at? : Date
    updated_at? : string
}

export type donasiStatusType = 'pending' | 'paid' | 'failed'
