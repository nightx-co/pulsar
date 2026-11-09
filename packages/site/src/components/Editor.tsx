"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function Editor() {
    const editor = useCreateBlockNote({
        pasteHandler: ({ event, editor, defaultPasteHandler }) => {
            if (event.clipboardData?.types.includes("text/plain")) {
                const text = event.clipboardData.getData("text/plain");
        
                const looksLikeMarkdown =
                    /^(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```)|(\*\*|__|\[.+\]\(.+\))/m.test(
                    text
                );
        
                if (looksLikeMarkdown) {
                    editor.pasteMarkdown(text);
                    return true;
                }
            }
      
            return defaultPasteHandler();
          },
    });

    return <BlockNoteView
        editor={editor}
    />;
}