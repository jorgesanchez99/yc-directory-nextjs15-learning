import { defineField, defineType } from "sanity";

export const playlist = defineType({
    name: "playlist",
    title: "Playlist",
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
            name: "select",
            type: "array",
            of: [{ type: "reference", to: [{ type: "startup" }] }],
        }),


    ],

});