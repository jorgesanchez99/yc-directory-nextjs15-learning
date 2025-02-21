"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from 'slugify';

export const createPitch = async (form: FormData) => {
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({ status: "ERROR", error: "No se pudo autenticar" });
    }

    const { title, description, category, url, pitch } = Object.fromEntries(form.entries());

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            description,
            category,
            image:url,
            slug: {
                _type: "slug",
                current: slug
            },
            pitch,
            author: {
                _type: "reference",
                _ref: session?.id
            },
            views:0,
        };

        const result = await writeClient.create({ _type: "startup", ...startup });

        return parseServerActionResponse({ ...result, status: "success", error: "" });

    } catch (error) {
        console.log(error);

        return parseServerActionResponse({ status: "ERROR", error: JSON.stringify(error) });
    }
};