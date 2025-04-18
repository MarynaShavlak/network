import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// const imageMimeType = /image\/(png|jpg|jpeg)/i;
const imageMimeType = /^image\//i;

interface UseImageUploaderProps {
    initialAvatar: string;
    deleteFromStorage: (imagePath: string) => void;
    onFileUpload?: (file: File | null) => void;
    // Callback to handle uploaded file
}

export interface UseImageUploaderReturn {
    avatarSrc: string;
    preview: string | null;
    fileTypeError: string | null;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
    resetImage: () => void;
    selectedImage: File | null;
}

export const useImageUploader = ({
    initialAvatar,
    onFileUpload,
    deleteFromStorage,
}: UseImageUploaderProps): UseImageUploaderReturn => {
    const { t } = useTranslation('articleDetails');

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileTypeError, setFileTypeError] = useState<string | null>(null);
    const [avatarSrc, setAvatarSrc] = useState<string>(initialAvatar || '');
    const errorMessage = t('Некоректний тип файлу');
    // useEffect(() => {
    //     if (initialAvatar) {
    //         setAvatarSrc(initialAvatar);
    //     }
    // }, [initialAvatar]);

    useEffect(() => {
        let previewUrl: string | null = null;

        if (selectedImage) {
            previewUrl = window.URL.createObjectURL(selectedImage);
            setPreview(previewUrl);
            setAvatarSrc(previewUrl);
            onFileUpload?.(selectedImage);
        }
        // else if (initialAvatar) {
        //     // When no image is selected but initialAvatar exists
        //     setAvatarSrc(initialAvatar);
        // }

        return () => {
            if (previewUrl) {
                window.URL.revokeObjectURL(previewUrl);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedImage]);

    const resetImage = useCallback(async () => {
        if (initialAvatar) {
            await deleteFromStorage(initialAvatar);
        }
        setSelectedImage(null);
        setPreview(null);
        setAvatarSrc('');
        onFileUpload?.(null);
    }, [deleteFromStorage, initialAvatar, onFileUpload]);

    const handleImageChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            // console.log('event.target.files', event.target.files);
            const file = event.target.files?.[0];
            if (!file) return;

            if (!file.type.match(imageMimeType)) {
                setFileTypeError(errorMessage);
                resetImage();
                return;
            }

            setFileTypeError(null);
            setSelectedImage(file);
        },
        [errorMessage, resetImage],
    );

    return {
        avatarSrc,
        preview,
        fileTypeError,
        handleImageChange,
        resetImage,
        selectedImage,
    };
};
