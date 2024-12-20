import { toast } from "sonner";

 

export async function handleCopyClick   (text){
    try {
        await window.navigator.clipboard.writeText(text);
        toast("Copied to clipboard!");
    } catch (err) {
        console.error(
            "Unable to copy to clipboard.",
            err
        );
        toast("Copy to clipboard failed.");
    }
};