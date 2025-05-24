import imageCompression from "browser-image-compression";

export async function imageCompresstionUtlis(File: File) {
    const options = {
        maxSizeMB: 5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }

    const compressedFile = await imageCompression(File, options)

    return compressedFile;
}
