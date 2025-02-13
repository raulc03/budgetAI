import apiClient from "./apiClient";
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';

async function convertImageToBase64(uri: string) {
    try {
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [],
            {
                compress: 0.5,
                format: ImageManipulator.SaveFormat.JPEG
            }
        );

        const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
    } catch (error) {
        console.error("Error al convertir la imagen a base64");
        throw error;
    }
}

const classifyTransaccion = async (image_uri: string | null) => {
    if (image_uri) {
        const base64Image = await convertImageToBase64(image_uri);
        try {
            return apiClient("/upload_image", {
                method: 'POST',
                body: JSON.stringify({ image: base64Image }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

        } catch (error) {
            console.error("Error al clasificar la imagen: ", error);
            throw error;
        }
    } else {
        console.error("Imagen no válida.", image_uri);
        return JSON.stringify({ "message": "Imagen no válida." });
    }
};

export default classifyTransaccion;
