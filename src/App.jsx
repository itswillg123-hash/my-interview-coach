import { useState, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0a0f;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: #0a0a0f;
    position: relative;
    overflow: hidden;
  }

  .bg-grid {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(212,175,100,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212,175,100,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  .bg-glow {
    position: fixed;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(212,175,100,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .container {
    max-width: 820px;
    margin: 0 auto;
    padding: 3rem 2rem 6rem;
    position: relative;
    z-index: 1;
  }

  .header {
    text-align: center;
    margin-bottom: 3.5rem;
    animation: fadeUp 0.6s ease both;
  }

  .badge {
    display: inline-block;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #d4af64;
    border: 1px solid rgba(212,175,100,0.3);
    padding: 5px 14px;
    border-radius: 100px;
    margin-bottom: 1.2rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #f0ebe0;
    line-height: 1.15;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  h1 span { color: #d4af64; }

  .subtitle {
    font-size: 15px;
    color: rgba(232,228,220,0.5);
    font-weight: 300;
    line-height: 1.6;
  }

  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 1.25rem;
    animation: fadeUp 0.6s ease both;
  }

  .card-label {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 500;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(212,175,100,0.15);
  }

  textarea {
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
    padding: 1rem 1.25rem;
    resize: vertical;
    transition: border-color 0.2s;
    outline: none;
  }

  textarea::placeholder { color: rgba(232,228,220,0.25); }
  textarea:focus { border-color: rgba(212,175,100,0.4); }

  .api-row {
    margin-bottom: 1.25rem;
    animation: fadeUp 0.6s 0.3s ease both;
  }

  .api-input-wrap input {
    width: 100%;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    color: #e8e4dc;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 0.75rem 1.25rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .api-input-wrap input:focus { border-color: rgba(212,175,100,0.4); }
  .api-input-wrap input::placeholder { color: rgba(232,228,220,0.25); }

  .api-hint {
    font-size: 11px;
    color: rgba(232,228,220,0.3);
    margin-top: 6px;
    padding-left: 2px;
  }

  .api-hint a { color: #d4af64; text-decoration: none; }

  .generate-btn {
    width: 100%;
    padding: 1rem;
    background: #d4af64;
    color: #0a0a0f;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 0.25rem;
    animation: fadeUp 0.6s 0.35s ease both;
  }

  .generate-btn:hover:not(:disabled) {
    background: #e0be72;
    transform: translateY(-1px);
    box-shadow: 0 8px 30px rgba(212,175,100,0.25);
  }

  .generate-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .loading-wrap {
    text-align: center;
    padding: 4rem 2rem;
    animation: fadeUp 0.4s ease both;
  }

  .loader {
    display: inline-flex;
    gap: 6px;
    margin-bottom: 1.5rem;
  }

  .loader span {
    width: 6px;
    height: 6px;
    background: #d4af64;
    border-radius: 50%;
    animation: bounce 1.2s ease infinite;
  }

  .loader span:nth-child(2) { animation-delay: 0.15s; }
  .loader span:nth-child(3) { animation-delay: 0.3s; }

  .loading-text {
    font-size: 14px;
    color: rgba(232,228,220,0.45);
    font-weight: 300;
  }

  .results-wrap { animation: fadeUp 0.5s ease both; }

  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .results-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: #f0ebe0;
    font-weight: 600;
  }

  .results-count {
    font-size: 12px;
    color: #d4af64;
    background: rgba(212,175,100,0.1);
    border: 1px solid rgba(212,175,100,0.2);
    padding: 4px 10px;
    border-radius: 100px;
  }

  .question-card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    margin-bottom: 1rem;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .question-card:hover { border-color: rgba(212,175,100,0.2); }

  .q-header {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 1.25rem 1.5rem;
    cursor: pointer;
    user-select: none;
  }

  .q-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #d4af64;
    font-weight: 600;
    min-width: 28px;
    line-height: 1.4;
  }

  .q-text {
    flex: 1;
    font-size: 15px;
    color: #e8e4dc;
    font-weight: 400;
    line-height: 1.5;
  }

  .q-toggle {
    font-size: 18px;
    color: rgba(232,228,220,0.3);
    transition: transform 0.2s, color 0.2s;
    margin-top: 2px;
  }

  .q-toggle.open { transform: rotate(45deg); color: #d4af64; }

  .q-answer {
    padding: 0 1.5rem 1.25rem 3.4rem;
    font-size: 14px;
    color: rgba(232,228,220,0.65);
    line-height: 1.75;
    font-weight: 300;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 1rem;
  }

  .reset-btn {
    margin-top: 2rem;
    width: 100%;
    padding: 0.75rem;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: rgba(232,228,220,0.4);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .reset-btn:hover { border-color: rgba(255,255,255,0.2); color: rgba(232,228,220,0.7); }

  .error-box {
    background: rgba(220,60,60,0.08);
    border: 1px solid rgba(220,60,60,0.25);
    border-radius: 10px;
    padding: 1rem 1.25rem;
    font-size: 13px;
    color: #f08080;
    margin-top: 1rem;
    line-height: 1.5;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
    40% { transform: scale(1); opacity: 1; }
  }
`;

function QuestionCard({ question, answer, index }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="question-card">
      <div className="q-header" onClick={() => setOpen(o => !o)}>
        <span className="q-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="q-text">{question}</span>
        <span className={`q-toggle${open ? " open" : ""}`}>+</span>
      </div>
      {open && <div className="q-answer">{answer}</div>}
    </div>
  );
}

export default function App() {
  const [cv, setCv] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const generate = async () => {
    if (!cv.trim() || !jobDesc.trim() || !apiKey.trim()) {
      setError("Please fill in all three fields before generating.");
      return;
    }
    setError("");
    setLoading(true);
    setQuestions(null);

    const prompt = `You are an expert interview coach. Given this candidate's CV and the job description below, generate exactly 10 highly tailored interview questions the interviewer is likely to ask, along with a strong model answer for each.

CV:
${cv}

Job Description:
${jobDesc}

Return your response as a JSON array of exactly 10 objects, each with "question" and "answer" keys. Return ONLY the JSON array, no preamble, no markdown fences.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setQuestions(parsed);
    } catch (e) {
      setError(e.message || "Something went wrong. Check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow" />
      <div className="container">
        <div className="header">
          <div className="badge">AI-Powered</div>
          <h1>Interview <span>Coach</span></h1>
          <p className="subtitle">Paste your CV and the job description.<br />Get 10 tailored questions with model answers — instantly.</p>
        </div>

        {!questions && !loading && (
          <>
            <div className="api-row">
              <div className="card-label" style={{fontSize:'11px',letterSpacing:'0.14em',textTransform:'uppercase',color:'#d4af64',fontWeight:'500',marginBottom:'0.75rem',display:'flex',alignItems:'center',gap:'8px'}}>
                Anthropic API Key
                <span style={{flex:1,height:'1px',background:'rgba(212,175,100,0.15)',display:'block'}}/>
              </div>
              <div className="api-input-wrap">
                <input
                  type="password"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                />
              </div>
              <p className="api-hint">Get your key at <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a> — never shared or stored</p>
            </div>

            <div className="card">
              <div className="card-label">Your CV / Résumé</div>
              <textarea
                rows={8}
                placeholder="Paste your CV here — work experience, skills, education, achievements..."
                value={cv}
                onChange={e => setCv(e.target.value)}
              />
            </div>

            <div className="card">
              <div className="card-label">Job Description</div>
              <textarea
                rows={7}
                placeholder="Paste the full job description here..."
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
              />
            </div>

            {error && <div className="error-box">{error}</div>}

            <button
              className="generate-btn"
              onClick={generate}
              disabled={!cv.trim() || !jobDesc.trim() || !apiKey.trim()}
            >
              Generate My Interview Questions →
            </button>
          </>
        )}

        {loading && (
          <div className="loading-wrap">
            <div className="loader">
              <span /><span /><span />
            </div>
            <p className="loading-text">Analysing your CV and crafting tailored questions...</p>
          </div>
        )}

        {questions && (
          <div className="results-wrap">
            <div className="results-header">
              <span className="results-title">Your Interview Prep</span>
              <span className="results-count">{questions.length} questions</span>
            </div>
            {questions.map((q, i) => (
              <QuestionCard key={i} index={i} question={q.question} answer={q.answer} />
            ))}
            <button className="reset-btn" onClick={() => { setQuestions(null); setError(""); }}>
              ← Generate for a different role
            </button>
          </div>
        )}
      </div>
    </div>
  );
}