export async function convertHeicToJpeg(file: File): Promise<File> {
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    try {
      // Dynamically import `heic2any` for client-side usage
      const heic2any = (await import('heic2any')).default;

      const blob = await heic2any({
        blob: file,
        toType: 'image/jpg',
        quality: 0.5,
      });

      return new File([blob as Blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
        type: 'image/jpg',
      });
    } catch (error) {
      console.error('Error converting HEIC to JPG:', error);
      throw new Error('Failed to convert HEIC image');
    }
  }
  return file;
}

export function getImageFormat(file: File): string {
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    return 'jpg';
  }
  return file.type.split('/')[1];
}
