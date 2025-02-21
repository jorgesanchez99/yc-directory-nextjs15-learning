"use client";

import Link from "next/link";
import { HiX } from "react-icons/hi";

export const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset();
    };

    return (
        <button type="reset" onClick={reset}>
            <Link href="/" className="search-btn text-white">
            <HiX  className="size-5" /> </Link>
        </button>
    )
}
