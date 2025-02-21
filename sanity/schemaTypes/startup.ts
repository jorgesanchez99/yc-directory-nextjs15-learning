import { defineField, defineType } from "sanity";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (Rule) => Rule.required().min(3).max(50).error("El título debe tener entre 3 y 50 caracteres"),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title", //* Esto es para que el slug tome el valor del título, se genera automáticamente
            },
            validation: (Rule) => Rule.required()
        }),
        defineField({
            name: "author",
            type: "reference",
            to: [{ type: "author" }], //* Esto es para que el autor sea una referencia a otro documento
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "description",
            type: "text",
            validation: (Rule) => Rule.required().min(10).max(200).error("La descripción debe tener entre 10 y 200 caracteres"),
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.required().min(3).max(20).error("La categoría debe tener entre 3 y 20 caracteres"),
        }),

        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "pitch",
            type: "markdown",
        }),

    ],

});