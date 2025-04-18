import { generateHTML } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import RichTextEditor from 'reactjs-tiptap-editor';
import {
    BaseKit,
    Bold,
    BulletList,
    Code,
    Color,
    Emoji,
    FontFamily,
    FontSize,
    Heading,
    History,
    HorizontalRule,
    Image,
    ImportWord,
    Italic,
    LineHeight,
    Link,
    MoreMark,
    MultiColumn,
    OrderedList,
    SearchAndReplace,
    SlashCommand,
    Strike,
    TaskList,
    TextAlign,
} from 'reactjs-tiptap-editor/extension-bundle';

import 'reactjs-tiptap-editor/style.css';

const extensions = [
    History,
    Image.configure({
        upload: (files: File) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(files); // ubah ke base64
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        },
    }),
    BaseKit.configure({
        placeholder: {
            showOnlyCurrent: true,
        },
        characterCount: {
            limit: 50_000,
        },
    }),
    Bold,
    BulletList,
    Color,
    FontFamily,
    FontSize,
    HorizontalRule,
    Italic,
    LineHeight,
    Link,
    MoreMark,
    MultiColumn,
    OrderedList,
    SlashCommand,
    Strike,
    TaskList,
    TextAlign,
    SearchAndReplace,
    Emoji,
    ImportWord,
];

const previewExtensions = [
    Color,
    BulletList,
    Document,
    HardBreak,
    TextStyle,
    Image,
    TextAlign,
    ListItem,
    Paragraph,
    Text,
    Bold,
    Italic,
    Heading,
    OrderedList,
    Link,
    Strike,
    Code,
    FontFamily,
];

export default function KontenEditor() {
    const [text, setText] = useState(null);

    const html = text ? generateHTML(text, previewExtensions) : '<p class="text-gray-400">Belum ada konten</p>';
    console.log(html);
    return (
        <div className="flex min-h-screen w-screen flex-col gap-8 bg-white p-4">
            {/* Preview Section */}
            <div className="rounded border p-4 shadow">
                <h2 className="mb-2 text-xl font-semibold">Preview</h2>
                <div className="prose max-w-none whitespace-pre" dangerouslySetInnerHTML={{ __html: html }} />
            </div>

            {/* Editor Section */}
            <div className="rounded border p-4 shadow">
                <h2 className="mb-2 text-xl font-semibold">Editor</h2>
                <RichTextEditor
                    output="json"
                    content="Json"
                    onChangeContent={(e) => {
                        console.log(e);
                        setText(e);
                    }}
                    extensions={extensions}
                />
            </div>
        </div>
    );
}
