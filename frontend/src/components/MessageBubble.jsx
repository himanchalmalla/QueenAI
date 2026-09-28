import { Anchor, Check, CheckIcon, CopyIcon, ExternalLink, X } from "lucide-react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageBubble = ({ role, content, images }) => {
    const [lightBox, setLightBox] = useState(null);
    const [copiedCodeValue, setCopiedCodeValue] = useState('');

    const handleCopied = async (value) => {
        await navigator.clipboard.writeText(value);
        setCopiedCodeValue(value);
        setTimeout(() => {
            setCopiedCodeValue("");
        }, 10000);
    }
    const isUser = role === "user";
    return (
        <div
            className={`flex flex-col flex-wrap px-2 py-2 gap-2 ${isUser
                ? "items-end justify-end"
                : "items-start justify-start"
                }`}
        >
            <div
                className={`
        flex flex-col
        w-fit max-w-[92vw] md:max-w-[70%]
        px-4 py-3
        rounded-2xl
        gap-3
        text-[13px]
        leading-relaxed
        wrap-break-word
        border
        ${isUser
                        ? "bg-linear-to-br from-[#3c4bc2] to-[#1245b3] text-[#bcb9e1] font-medium border-[#3a5862]/30 rounded-tr-sm"
                        : "bg-linear-to-br from-[#273438] to-[#3a5862]/20 text-[#c5e8ef] border-[#3a5862]/25 rounded-tl-sm"
                    }
    `}
            >
                {/* Images */}
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Image ${index + 1}`}
                                loading="lazy"
                                className="
                            w-40 h-28
                            object-cover
                            rounded-xl
                            bg-[#3a5862]/30
                            border border-[#3a5862]/30
                            cursor-zoom-in
                            transition-all duration-200
                            hover:opacity-90
                            hover:scale-[1.02]
                        "
                                onError={(e) => e.currentTarget.remove()}
                                onClick={() => setLightBox(image)}
                            />
                        ))}
                    </div>
                )}

                {/* Message content */}
                <div className="prose prose-sm max-w-none text-inherit">
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Headings
                            h1: ({ children }) => (
                                <h1 className="text-2xl font-bold tracking-tight mt-5 mb-3 text-[#d8f3f8]">
                                    {children}
                                </h1>
                            ),

                            h2: ({ children }) => (
                                <h2 className="text-xl font-semibold tracking-tight mt-5 mb-2.5 text-[#d2eef3]">
                                    {children}
                                </h2>
                            ),

                            h3: ({ children }) => (
                                <h3 className="text-lg font-semibold mt-4 mb-2 text-[#c9e8ee]">
                                    {children}
                                </h3>
                            ),

                            h4: ({ children }) => (
                                <h4 className="text-base font-semibold mt-4 mb-2 text-[#c4e3e9]">
                                    {children}
                                </h4>
                            ),

                            // Paragraph
                            p: ({ children }) => (
                                <p className="mb-3 last:mb-0 leading-7 text-inherit">
                                    {children}
                                </p>
                            ),

                            // Bold
                            strong: ({ children }) => (
                                <strong className="font-semibold text-[#d8f3f8]">
                                    {children}
                                </strong>
                            ),

                            // Italic
                            em: ({ children }) => (
                                <em className="italic text-[#b8dce3]">
                                    {children}
                                </em>
                            ),

                            // Unordered list
                            ul: ({ children }) => (
                                <ul className="list-disc pl-5 mb-3 space-y-1.5 marker:text-[#6f9ba6]">
                                    {children}
                                </ul>
                            ),

                            // Ordered list
                            ol: ({ children }) => (
                                <ol className="list-decimal pl-5 mb-3 space-y-1.5 marker:text-[#6f9ba6]">
                                    {children}
                                </ol>
                            ),

                            // List item
                            li: ({ children }) => (
                                <li className="pl-1 leading-6 text-inherit">
                                    {children}
                                </li>
                            ),

                            // Links
                            a: ({ children, href }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" flex flex-row gap-1 items-center 
                    text-[#8e9cd7]
                    underline
                    underline-offset-2
                    decoration-[#5d8f9b]/60
                    hover:text-[#bde6ef]
                    hover:decoration-[#bde6ef]
                    transition-colors
                "
                                >
                                    {children} <ExternalLink size={11} />
                                </a>
                            ),

                            // Inline code
                            code: ({ children, className }) => {
                                const isCodeBlock = className?.includes("language-");

                                if (isCodeBlock) {
                                    return (
                                        <code className="font-mono text-[12px] leading-6 text-[#c8e8ee]">
                                            {children}
                                        </code>
                                    );
                                }

                                return (
                                    <code
                                        className="
                        px-1.5 py-0.5
                        mx-0.5
                        rounded-md
                        bg-[#172428]
                        border border-[#3a5862]/40
                        text-[#a9dce5]
                        font-mono
                        text-[12px]
                    "
                                    >
                                        {children}
                                    </code>
                                );
                            },

                            // Code block
                            pre: ({ children }) => (
                                <pre
                                    className="
                    my-4
                    p-4
                    overflow-x-auto
                    rounded-xl
                    bg-[#172428]
                    border border-[#3a5862]/40
                    shadow-inner
                    scrollbar-thin
                    scrollbar-thumb-[#3a5862]
                    scrollbar-track-transparent
                "
                                >
                                    {children}
                                </pre>
                            ),

                            // Blockquote
                            blockquote: ({ children }) => (
                                <blockquote
                                    className="
                    my-4
                    pl-4
                    py-1
                    border-l-2
                    border-[#5f8f9a]
                    text-[#9fc5cd]
                    italic
                    bg-[#273438]/40
                    rounded-r-lg
                "
                                >
                                    {children}
                                </blockquote>
                            ),

                            // Horizontal rule
                            hr: () => (
                                <hr className="my-5 border-0 border-t border-[#3a5862]/40" />
                            ),

                            // Tables
                            table: ({ children }) => (
                                <div className="my-4 w-full overflow-x-auto rounded-xl border border-[#3a5862]/40">
                                    <table className="w-full border-collapse text-left text-[12px]">
                                        {children}
                                    </table>
                                </div>
                            ),

                            thead: ({ children }) => (
                                <thead className="bg-[#3a5862]/30 text-[#d1edf2]">
                                    {children}
                                </thead>
                            ),

                            tbody: ({ children }) => (
                                <tbody className="divide-y divide-[#3a5862]/25">
                                    {children}
                                </tbody>
                            ),

                            tr: ({ children }) => (
                                <tr className="hover:bg-[#3a5862]/10 transition-colors">
                                    {children}
                                </tr>
                            ),

                            th: ({ children }) => (
                                <th className="px-3 py-2.5 font-semibold border-b border-[#3a5862]/40 whitespace-nowrap">
                                    {children}
                                </th>
                            ),

                            td: ({ children }) => (
                                <td className="px-3 py-2.5 text-[#b8dce3] align-top">
                                    {children}
                                </td>
                            ),

                            // Images inside Markdown
                            img: ({ src, alt }) => (
                                <img
                                    src={src}
                                    alt={alt || ""}
                                    loading="lazy"
                                    className="
                    my-3
                    max-w-full
                    max-h-100
                    rounded-xl
                    border border-[#3a5862]/30
                    object-contain
                    shadow-lg
                "
                                />
                            ),

                            // Strikethrough from GFM
                            del: ({ children }) => (
                                <del className="text-[#78969e]">
                                    {children}
                                </del>
                            ),

                            // Line break
                            br: () => <br />,

                            code: ({ className, children }) => {
                                const value = String(children).replace(/\n$/, "");

                                // Inline code
                                if (!className) {
                                    return (
                                        <code
                                            className="
                    font-mono
                    text-[12px]
                    leading-6
                    bg-[#266cc7]/20
                    border border-[#3a5862]/40
                    rounded-md
                    px-1.5
                    py-0.5
                    text-[#a8d8e0]
                "
                                        >
                                            {children}
                                        </code>
                                    );
                                }

                                const language = className.replace(/language-/, "");

                                return (
                                    <div
                                        className="
                my-4
                overflow-hidden
                rounded-xl
                border border-[#3a5862]/40
                bg-[#172428]
                shadow-lg
            "
                                    >
                                        {/* Header */}
                                        <div
                                            className="
                    flex
                    items-center
                    justify-between
                    bg-[#426c79]/70
                    border-b border-[#3a5862]/40
                    px-4
                    py-2
                "
                                        >
                                            {/* Language */}
                                            <span
                                                className="
                        text-[#d8edf1]
                        font-mono
                        text-[11px]
                        uppercase
                        font-bold
                        tracking-wider
                    "
                                            >
                                                {language || "code"}
                                            </span>

                                            {/* Copy button */}
                                            <button
                                                type="button"
                                                onClick={() => handleCopied(value)}
                                                className="
                        flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-md
                        text-[11px]
                        font-medium
                        text-[#b8dce3]
                        hover:text-[#e0f7fa]
                        hover:bg-[#3a5862]/50
                        transition-all
                        duration-200
                    "
                                            >
                                                {copiedCodeValue === value ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                                                {copiedCodeValue === value ? "Copied" : "Copy"}
                                            </button>
                                        </div>

                                        {/* Code */}
                                        <div className="overflow-x-auto">
                                            <SyntaxHighlighter
                                                language={language || "text"}
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    margin: 0,
                                                    padding: "16px",
                                                    background: "transparent",
                                                    fontSize: "12px",
                                                    lineHeight: "1.7",
                                                }}
                                                codeTagProps={{
                                                    style: {
                                                        fontFamily:
                                                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                                                    },
                                                }}
                                                wrapLongLines={false}
                                            >
                                                {value}
                                            </SyntaxHighlighter>
                                        </div>
                                    </div>
                                );
                            },
                        }}
                    >
                        {content}
                    </Markdown>
                </div>
            </div>

            {/* Image Lightbox */}
            <div
                className={`
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70 backdrop-blur-sm
            transition-all duration-200
            ${lightBox ? "visible opacity-100" : "invisible opacity-0"}
        `}
                onClick={() => setLightBox(null)}
            >
                <button
                    className="
                absolute top-4 right-4
                flex items-center justify-center
                w-9 h-9
                rounded-full
                bg-[#273438]/80
                border border-[#3a5862]/50
                text-[#bde6ef]
                hover:bg-[#3a5862]
                transition
            "
                    onClick={() => setLightBox(null)}
                >
                    <X size={18} />
                </button>

                <img
                    src={lightBox}
                    alt="LightBox"
                    loading="lazy"
                    className="
                max-w-[90vw]
                max-h-[85vh]
                rounded-2xl
                border border-[#3a5862]/50
                shadow-2xl
                object-contain
            "
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    )
}

export default MessageBubble
