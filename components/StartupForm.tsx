'use client';
import { Input } from "./ui/input"
import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { formSchema } from "@/lib/validation";
import {z} from 'zod';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Form from "next/form";
import { createPitch } from "@/app/actions";
import { IoIosSend } from "react-icons/io";

export const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [url, setUrl] = useState('');
    const [pitch, setPitch] = useState('');
    const {toast} = useToast();
    const router = useRouter();





    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = async (prevState: any) => {
        try {
            const formValues = {
                title,
                description,
                category,
                url,
                pitch
            }

            //* Validate the form data
            await formSchema.parseAsync(formValues);

             // Convert formValues to FormData
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('url', url);
            formData.append('pitch', pitch);

            const result = await createPitch(formData);

            if(result.status == 'success'){
                toast({
                    title: "Éxito",
                    description: "Tu startup ha sido creada con éxito",
                })
                router.push(`/startup/${result._id}`);
            }

            return result;


        } catch (error) {
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors

                setErrors(fieldErrors as unknown as Record<string, string>);

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "La validación fallo. Por favor revisa los campos e intenta de nuevo",
                })

                return{...prevState, error:"La validación fallo", status: "ERROR"}
            }

            toast({
                title: "Error",
                description: "Un error inesperado ocurrio",
                variant: "destructive",
            })

            return {...prevState, error: "Un error inesperado ocurrio", status: "ERROR"}
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    });


    return (
        <Form action={formAction} className="startup-form">
            {state.error && <p className="startup-form_error">{state.error}</p>}
            <div>
                <label htmlFor="title" className="startup-form_label">Titulo</label>
                <Input id="title" name="title" type="text" className="startup-form_input" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Titulo de la Startup" />

                {errors.title && <p className="startup-form_error">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Descripción</label>
                <Textarea id="description" name="description" className="startup-form_textarea" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Descripción de la Startup"></Textarea>

                {errors.description && <p className="startup-form_error">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Categoría</label>
                <Input id="category" name="category" type="text" className="startup-form_input" value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="Categoria de la Startup (Tecnología, Educación, Salud,...)" />

                {errors.category && <p className="startup-form_error">{errors.category}</p>}
            </div>

            <div>
                <label htmlFor="url" className="startup-form_label">Image URL</label>
                <Input id="url" name="url" type="text" className="startup-form_input" value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="URL de la imagen de la Startup" />

                {errors.url && <p className="startup-form_error">{errors.url}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>

                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: 'Describe brevemente tu idea y que problema soluciona',
                    }}
                    previewOptions={{
                        disallowedElements: ["style"],
                    }}
                />
                {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
                {/* <MDEditor.Markdown source={pitch} style={{ whiteSpace: 'pre-wrap' }} /> */}
            </div>

            <Button type="submit" className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? 'Enviando...' : 'Enviar'}
                <IoIosSend className="size-6 ml-2" />
            </Button>
        </Form>
    )
}

