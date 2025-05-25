import { useState } from "react"
import ReactMarkDown from "react-markdown"
import remarkGfm from 'remark-gfm'
import { LuCheck, LuCode, LuCopy } from 'react-icons/lu'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"


export const AIResponsePreview = ({content}) =>{
    if(!content) return null
    
    return (
        <div className="max-w-4xl mx-auto">
             <div className="px-4  py-2 prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkDown
                   remarkPlugins = {[remarkGfm]}
                   components = {{
                    code({node, className, children, ...props}){
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : ''
                    const isInLine = !className;
                     
                    return !isInLine ? (
                        <CodeBlock  
                         code={String(children).replace(/\n$/,'')}
                         language={language}
                        />
                    ) : (
                        <code className="px-1 py-0.5 bg-[#e3e7ec] text-sm" {...props}>
                            {children}
                        </code>
                    )
                    },

                    p({children}){
                        return <p className="mb-4 leading-5">{children}</p>
                    },
                    strong({children}){
                        return <strong>{children}</strong>
                    },
                    em({children}){
                        return <em>{children}</em>
                    }, 
                    ul({children}){
                        return <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
                    },
                    ol({children}){
                        return <ol className="list-disc pl-6 space-y-2 my-4">{children}</ol>
                    },
                    li({children}){
                        return <li className="mb-1">{children}</li>
                    },
                    blockquote({children}){
                        return <blockquote className="border-l-4 border-gray-200 pl-4 my-4">{children}</blockquote>
                    },
                    h1({children}){
                        return <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
                    },
                     h2({children}){
                        return <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
                    },
                    h3({children}){
                        return <a className="text-xl font-bold mt-5 mb-2" href="">{children}</a>
                    },
                    h4({children}){
                        return <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>
                    },
                    a({children, href}){
                        return <a href={href} className="text-blue-600 hover:text-blue-700">{children}</a>
                    },
                    table({children}){
                        return (
                            <div className="overflow-x-auto my-4">
                                <table className="min-w-full divide-y divide-gray-300 border border-gray-200">{children}</table>
                            </div>
                        )
                    },
                    thead({children}){
                        return <thead className="bg-gray-50">{children}</thead>
                    },
                   tbody({children}){
                        return <tbody className="divide-y divide-gray-200">{children}</tbody>
                    },
                    tr({children}){
                        return <tr>{children}</tr>
                    },
                    th({children}){
                        return <th className="px-3 py-2 text-left text-sm text-gray-500">{children}</th>
                    },
                    td({children}){
                        return <td className="px-3 py-2 whitespace-nowrap text-sm">{children}</td>
                    },
                    hr(){
                        return <hr className="my-6 border-gray-200"/>
                    },
                    img({src, alt}){
                        return <img src={src} alt={alt} className="my-4 max-w-full rounded" />
                    }
                   }}
                >
                    {content}
                </ReactMarkDown>
             </div>
        </div>
    )
}


function CodeBlock({code, language}){
    const [copied, setCopied] = useState(false)

    const copyCode = () =>{
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(()=>setCopied(false), 2000)
    }

    return <div className="relative m-6 rounded-2xl border border-[#e3e3e3] overflow-hidden bg-gray-50 ">
          <div className="flex justify-between border-b border-[#e3e3e3] bg-[#f5f5f5] py-4 px-3 items-center">
            <div className="flex gap-1 items-center text-[gray]">
                <LuCode size={16} />
                <span>{language || "Code"}</span>
            </div>
            <button onClick={copyCode}
            className="opacity-60 cursor-pointer" 
            area-label="Copy code"
            >
              { copied ? (
                <LuCheck size={16}/>
              ):(
                <LuCopy size={16}/>
              )}
              { copied && (
                <span>Copied</span>
              )}
            </button>
        </div>

        <SyntaxHighlighter
        language={language} style={oneLight} customStyle={{fontSize:13.5, margin:0, padding:"1rem", background:'white'}}
        >
         {code}
        </SyntaxHighlighter>
    </div>
}

