"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

type EmailEditorProps = {
  content: string;
  setContent: (content: string) => void;
};

const EmailEditor = ({ content, setContent }: EmailEditorProps) => {
  const editorRef = useRef(null);

  return (
    <JoditEditor
      ref={editorRef}
      value={content}
      config={{ readonly: false, height: "480" }}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      // onChange={(newContent) => {}}
    />
  );
};

export default EmailEditor;
