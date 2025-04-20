export type kontenType = {
    id: string
    slug: string
    content: string
    created_at: string
    video?: string
    imageCover: string
    imageContent?: string[]
    category: 'Blog' | 'Penyaluran Donasi'
}
