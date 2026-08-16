import { useState, useEffect } from 'react'
import { Terminal, Layout, FileCode2, Play } from 'lucide-react'

export default function CodePlayground() {
  const [html, setHtml] = useState('<div class="container">\n  <h1>STEM Quest Innovator</h1>\n  <button id="btn">Launch Rocket</button>\n</div>')
  const [css, setCss] = useState('.container {\n  text-align: center;\n  font-family: system-ui;\n  padding: 2rem;\n}\nh1 {\n  color: #2563eb;\n}\nbutton {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n}')
  const [js, setJs] = useState('document.getElementById("btn").addEventListener("click", () => {\n  alert("Rocket Launched! 🚀");\n});')
  const [srcDoc, setSrcDoc] = useState('')
  const [activeTab, setActiveTab] = useState('html')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head><style>${css}</style></head>
          <body>
            ${html}
            <script>${js}<\/script>
          </body>
        </html>
      `)
    }, 400)
    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[600px] w-full bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-700">
      
      {/* Editor Section */}
      <div className="flex-1 flex flex-col bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="flex bg-slate-900 border-b border-slate-700">
          <button onClick={() => setActiveTab('html')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${activeTab === 'html' ? 'bg-slate-800 text-primary-400 border-t-2 border-t-primary-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <Layout className="h-4 w-4" /> HTML
          </button>
          <button onClick={() => setActiveTab('css')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${activeTab === 'css' ? 'bg-slate-800 text-pink-400 border-t-2 border-t-pink-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <FileCode2 className="h-4 w-4" /> CSS
          </button>
          <button onClick={() => setActiveTab('js')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition ${activeTab === 'js' ? 'bg-slate-800 text-yellow-400 border-t-2 border-t-yellow-500' : 'text-slate-400 hover:text-slate-200'}`}>
            <Terminal className="h-4 w-4" /> JS
          </button>
        </div>
        
        <div className="flex-1 p-4">
          {activeTab === 'html' && (
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="w-full h-full bg-transparent text-slate-300 font-mono text-sm outline-none resize-none"
              spellCheck="false"
            />
          )}
          {activeTab === 'css' && (
            <textarea
              value={css}
              onChange={(e) => setCss(e.target.value)}
              className="w-full h-full bg-transparent text-slate-300 font-mono text-sm outline-none resize-none"
              spellCheck="false"
            />
          )}
          {activeTab === 'js' && (
            <textarea
              value={js}
              onChange={(e) => setJs(e.target.value)}
              className="w-full h-full bg-transparent text-slate-300 font-mono text-sm outline-none resize-none"
              spellCheck="false"
            />
          )}
        </div>
      </div>

      {/* Output Section */}
      <div className="flex-1 flex flex-col bg-white rounded-xl overflow-hidden border border-slate-700">
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
          <Play className="h-4 w-4 text-emerald-600 fill-emerald-600" />
          <span className="text-sm font-semibold text-slate-700">Live Preview</span>
        </div>
        <div className="flex-1">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            className="w-full h-full border-none"
          />
        </div>
      </div>

    </div>
  )
}
