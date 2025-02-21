import { z } from 'zod';

// Define a schema for form validation using Zod
export const formSchema = z.object({
    title: z.string()
        .min(3, { message: "El título debe tener al menos 3 caracteres" })
        .max(100, { message: "El título no debe exceder los 100 caracteres" }),
    description: z.string()
        .min(15, { message: "La descripción debe tener al menos 15 caracteres" })
        .max(200, { message: "La descripción no debe exceder los 500 caracteres" }),
    category: z.string()
        .min(3, { message: "La categoría debe tener al menos 3 caracteres" })
        .max(20, { message: "La categoría no debe exceder los 20 caracteres" }),
    url: z.string()
        .url({ message: "La URL debe ser válida" })
        .refine(async (url) => {
            // const imageRegex = /\.(jpeg|jpg|png|gif|png|svg|webp)$/i;
            // if (!imageRegex.test(url)) {
            //     return false;
            // }
            try {
                const res = await fetch(url, { method: 'HEAD' });
                const contentType = res.headers.get('content-type');
                return contentType && contentType.startsWith('image/');
            } catch {
                return false;
            }
        }, { message: "La URL debe apuntar a una imagen válida" }),
    pitch: z.string()
        .min(10, { message: "El pitch debe tener al menos 10 caracteres" }),
});
