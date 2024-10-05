import React from "react";
import { useEditor, EditorContent, isActive } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaUndo,
  FaRedo,
  FaTrash,
} from "react-icons/fa";

const Editor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Type something...",
      }),
    ],
    content: `<p>Hello World!</p>`,
  });

  if (!editor) {
    return null;
  }

  const buttons = [
    {
      action: () => editor.chain().focus().toggleBold().run(),
      icon: <FaBold />,
      label: "Bold",
      isActive: editor.isActive("bold"),
    },
    {
      action: () => editor.chain().focus().toggleItalic().run(),
      icon: <FaItalic />,
      label: "Italic",
      isActive: editor.isActive("italic"),
    },
    {
      action: () => editor.chain().focus().toggleUnderline().run(),
      icon: <FaUnderline />,
      label: "Underline",
      isActive: editor.isActive("underline"),
    },
    {
      action: () => editor.chain().focus().toggleStrike().run(),
      icon: <FaStrikethrough />,
      label: "Strike",
      isActive: editor.isActive("strike"),
    },
    {
      action: () => editor.chain().focus().setTextAlign("left").run(),
      icon: <FaAlignLeft />,
      label: "Left Align",
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      action: () => editor.chain().focus().setTextAlign("center").run(),
      icon: <FaAlignCenter />,
      label: "Center Align",
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      action: () => editor.chain().focus().setTextAlign("right").run(),
      icon: <FaAlignRight />,
      label: "Right Align",
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      action: () => editor.chain().focus().undo().run(),
      icon: <FaUndo />,
      label: "Undo",
      isActive: false,
      isDisabled: !editor.can().undo(),
    },
    {
      action: () => editor.chain().focus().redo().run(),
      icon: <FaRedo />,
      label: "Redo",
      isActive: false,
      isDisabled: !editor.can().redo(),
    },
    {
      action: () => editor.commands.clearContent(),
      icon: <FaTrash />,
      label: "Clear",
      isActive: false,
      isDisabled: false,
      isClassName: true,
    },
  ];
  return (
    <div className="max-w-3xl mx-auto p-6 m-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-mono text-center text-fuchsia-300 mb-6">
        TipTap Editor
      </h2>
      <div className="flex gap-4 mb-4 bg-gray-100 p-2 rounded-md shadow-md justify-center">
        {buttons.map((button, index) => (
          <div className="relative group" key={index}>
            <button
              onClick={button.action}
              disabled={button.isDisabled}
              className={`relative p-2 rounded-full transition-colors duration-300  ${
                button.isDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : button.isClassName
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : button.isActive
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {button.icon}
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-auto p-1 text-xs text-center text-gray-700 bg-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {button.label}
            </div>
          </div>
        ))}
      </div>

      <EditorContent
        editor={editor}
        className="border border-gray-400 p-4 rounded-md min-h-[300px] focus:outline-none font-serif text-xl"
      />
    </div>
  );
};

export default Editor;
