import React, { useState, useEffect, useMemo } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// ─── Dados dos Pilares ───────────────────────────────────────────────────────
const PILLARS = [
  {
    id: 1,
    name: 'Posicionamento',
    color: '#0F2D3A', // Brand Navy
    criteria: [
      { label: 'Bio explica o que a pessoa faz', max: 2 },
      { label: 'Fica claro para quem é o serviço', max: 2 },
      { label: 'Existe promessa ou resultado claro', max: 2 },
      { label: 'Foto de perfil profissional', max: 2 },
      { label: 'CTA na bio (WhatsApp, agenda etc.)', max: 2 },
    ],
  },
  {
    id: 2,
    name: 'Clareza de Público',
    color: '#1DB954', // Brand Green
    criteria: [
      { label: 'Conteúdo fala com público específico', max: 3 },
      { label: 'Perfil tem nicho claro', max: 3 },
      { label: 'Linguagem direcionada', max: 2 },
      { label: 'Problemas do cliente aparecem nos posts', max: 2 },
    ],
  },
  {
    id: 3,
    name: 'Conteúdo Estratégico',
    color: '#2d3436', // Neutral Navy
    criteria: [
      { label: 'Conteúdo educa o público', max: 3 },
      { label: 'Conteúdo mostra autoridade', max: 3 },
      { label: 'Conteúdo incentiva ação', max: 2 },
      { label: 'Consistência de postagem', max: 2 },
    ],
  },
  {
    id: 4,
    name: 'Estrutura de Conversão',
    color: '#1DB954', // Brand Green
    criteria: [
      { label: 'Link na bio claro', max: 3 },
      { label: 'Facilidade de contato', max: 3 },
      { label: 'Convite para ação', max: 2 },
      { label: 'Perfil direciona para venda', max: 2 },
    ],
  },
  {
    id: 5,
    name: 'Destaques e Estrutura',
    color: '#0F2D3A', // Brand Navy
    criteria: [
      { label: 'Destaques organizados', max: 3 },
      { label: 'Destaque de serviços', max: 3 },
      { label: 'Prova social (clientes/resultados)', max: 2 },
      { label: 'Apresentação do profissional', max: 2 },
    ],
  },
];

const INTERPRETATIONS = [
  { min: 0,  max: 20, label: 'Perfil Desestruturado',    desc: 'O perfil não comunica claramente o negócio e precisa de uma reestruturação completa para começar a gerar resultados.', emoji: '🔴', bg: '#fef2f2', border: '#fecaca' },
  { min: 21, max: 30, label: 'Estrutura Inicial',         desc: 'Existe uma base ainda frágil. Melhorias de posicionamento e conteúdo são urgentes para avançar.', emoji: '🟠', bg: '#fff7ed', border: '#fed7aa' },
  { min: 31, max: 40, label: 'Perfil em Desenvolvimento', desc: 'O perfil já tem direção, mas faltam elementos de conversão e consistência para transformar seguidores em clientes.', emoji: '🟡', bg: '#fefce8', border: '#fde68a' },
  { min: 41, max: 50, label: 'Perfil Estratégico',        desc: 'O perfil está bem posicionado e tem estrutura sólida. Pequenos ajustes podem maximizar os resultados.', emoji: '🟢', bg: '#f0fdf4', border: '#bbf7d0' },
];

const PROBLEM_LABELS = [
  { key: 'critical',   label: 'Problema Crítico',   icon: '🚨', color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
  { key: 'structural', label: 'Problema Estrutural', icon: '⚠️', color: '#f59e0b', bg: '#fff7ed', border: '#fed7aa' },
  { key: 'quick',      label: 'Melhoria Rápida',     icon: '💡', color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
];

const PROBLEM_SUGGESTIONS = {
  'Posicionamento': [
    'Reescreva a bio com quem você ajuda, como você ajuda e qual o resultado.',
    'Adicione um CTA claro: link do WhatsApp ou página de agendamento.',
    'Troque a foto de perfil por uma imagem profissional e bem iluminada.',
  ],
  'Clareza de Público': [
    'Defina um nicho específico e mencione-o na bio e nos posts.',
    'Fale diretamente com as dores e desejos do seu público-alvo.',
    'Revise a linguagem dos posts para que o cliente ideal se reconheça.',
  ],
  'Conteúdo Estratégico': [
    'Crie uma série de posts educativos que demonstrem sua expertise.',
    'Mostre bastidores e resultados reais para construir autoridade.',
    'Planeje uma grade de conteúdo para manter consistência semanal.',
  ],
  'Estrutura de Conversão': [
    'Coloque um link direto para WhatsApp ou página de contato na bio.',
    'Adicione CTAs nos posts: "Clique no link da bio", "Me manda mensagem".',
    'Crie um funil simples: post → stories → link → conversa.',
  ],
  'Destaques e Estrutura': [
    'Organize os destaques com capas personalizadas e nomes claros.',
    'Crie um destaque dedicado a depoimentos e resultados de clientes.',
    'Adicione um destaque "Sobre mim" apresentando sua trajetória.',
  ],
};

// ─── Gráfico de Radar SVG ────────────────────────────────────────────────────
function RadarChart({ scores }) {
  const cx = 160, cy = 160, r = 120;
  const n = PILLARS.length;
  const angles = PILLARS.map((_, i) => (Math.PI * 2 * i) / n - Math.PI / 2);

  const point = (value, maxValue, angle) => ({
    x: cx + (value / maxValue) * r * Math.cos(angle),
    y: cy + (value / maxValue) * r * Math.sin(angle),
  });

  const gridLevels = [2, 4, 6, 8, 10];
  const dataPoints = PILLARS.map((p, i) => point(scores[i] || 0, 10, angles[i]));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  const axisLabels = PILLARS.map((p, i) => {
    const a = angles[i];
    return { x: cx + (r + 26) * Math.cos(a), y: cy + (r + 26) * Math.sin(a), name: p.name, color: p.color };
  });

  return (
    <svg viewBox="0 0 320 320" style={{ width: '100%', maxWidth: 340 }}>
      {gridLevels.map(level => {
        const pts = angles.map(a => point(level, 10, a));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
        return <path key={level} d={path} fill="none" stroke="#e2e8f0" strokeWidth="1" />;
      })}
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      <path d={dataPath} fill="rgba(29,185,84,0.15)" stroke="#1DB954" strokeWidth="2.5" strokeLinejoin="round" />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={PILLARS[i].color} stroke="#fff" strokeWidth="2" />
      ))}
      {dataPoints.map((p, i) => (
        <text key={i} x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill={PILLARS[i].color}>
          {scores[i]?.score || 0}
        </text>
      ))}
      {axisLabels.map((l, i) => {
        const words = l.name.split(' ');
        return (
          <text key={i} x={l.x} y={l.y} textAnchor="middle" fontSize="9.5" fontWeight="600" fill={l.color}>
            {words.map((w, j) => <tspan key={j} x={l.x} dy={j === 0 ? 0 : 12}>{w}</tspan>)}
          </text>
        );
      })}
      {gridLevels.map(level => (
        <text key={level} x={cx + 4} y={cy - (level / 10) * r + 3} fontSize="7" fill="#94a3b8">{level}</text>
      ))}
    </svg>
  );
}

// ─── Componente Principal ────────────────────────────────────────────────────
export default function VMEvaluation({ clientName, clientId, readOnly = false, onClose }) {
  const initialScores = PILLARS.map(p => p.criteria.map(() => ({ score: 0, comment: '', hasComment: false })));
  const [scores, setScores] = useState(initialScores);
  const [showResult, setShowResult] = useState(readOnly);
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(!!clientId);
  const [savedAt, setSavedAt] = useState(null);

  // Carregar avaliação existente do Firestore
  useEffect(() => {
    if (!clientId) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'users', clientId));
        if (snap.exists() && snap.data().vmEvaluation) {
          const saved = snap.data().vmEvaluation;
          setScores(saved.scores);
          setSavedAt(saved.savedAt);
          if (readOnly) setShowResult(true);
        }
      } catch (e) {
        console.error("Erro ao carregar avaliação:", e);
      } finally {
        setLoadingData(false);
      }
    })();
  }, [clientId, readOnly]);

  const pillarScores = useMemo(() =>
    PILLARS.map((p, pi) => p.criteria.reduce((sum, _, ci) => sum + (scores[pi][ci]?.score || 0), 0)),
    [scores]
  );

  const totalScore = pillarScores.reduce((a, b) => a + b, 0);
  const interpretation = INTERPRETATIONS.find(i => totalScore >= i.min && totalScore <= i.max) || INTERPRETATIONS[0];

  const sortedPillars = useMemo(() =>
    PILLARS.map((p, i) => ({ ...p, score: pillarScores[i] })).sort((a, b) => a.score - b.score),
    [pillarScores]
  );

  const problems = [
    { ...PROBLEM_LABELS[0], pillar: sortedPillars[0], suggestion: PROBLEM_SUGGESTIONS[sortedPillars[0]?.name]?.[0] },
    { ...PROBLEM_LABELS[1], pillar: sortedPillars[1], suggestion: PROBLEM_SUGGESTIONS[sortedPillars[1]?.name]?.[1] },
    { ...PROBLEM_LABELS[2], pillar: sortedPillars[2], suggestion: PROBLEM_SUGGESTIONS[sortedPillars[2]?.name]?.[2] },
  ];

  const setScore = (pi, ci, val) => {
    if (readOnly) return;
    setScores(prev => {
      const next = prev.map(r => [...r]);
      next[pi][ci] = { ...next[pi][ci], score: Number(val) };
      return next;
    });
  };

  const toggleComment = (pi, ci) => {
    if (readOnly) return;
    setScores(prev => {
      const next = prev.map(r => [...r]);
      next[pi][ci] = { ...next[pi][ci], hasComment: !next[pi][ci].hasComment };
      return next;
    });
  };

  const setCommentText = (pi, ci, text) => {
    if (readOnly) return;
    setScores(prev => {
      const next = prev.map(r => [...r]);
      next[pi][ci] = { ...next[pi][ci], comment: text };
      return next;
    });
  };

  const handleSave = async () => {
    if (!clientId) return;
    setSaving(true);
    try {
      const now = new Date().toISOString();
      await setDoc(doc(db, 'users', clientId), {
        vmEvaluation: { scores, pillarScores, totalScore, savedAt: now }
      }, { merge: true });
      setSavedAt(now);
      setShowResult(true);
    } catch (e) {
      alert('Erro ao salvar avaliação: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem 3rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏳</div>
          <p style={{ margin: 0, color: '#475569' }}>Carregando avaliação...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '2rem 1rem' }}>
      <div style={{ background: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '860px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>

        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', padding: '2rem 2.5rem', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.6 }}>
                {readOnly ? 'Seu Diagnóstico' : 'Avaliação'}
              </p>
              <h2 style={{ margin: '4px 0', fontSize: '1.8rem', fontWeight: 800 }}>
                Diagnóstico VM <span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.8 }}>do Instagram</span>
              </h2>
              <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
                Cliente: <strong style={{ color: '#a5b4fc' }}>{clientName}</strong>
                {savedAt && <span style={{ marginLeft: '1rem', fontSize: '0.75rem', opacity: 0.6 }}>Salvo em {new Date(savedAt).toLocaleDateString('pt-BR')}</span>}
              </p>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>
        </div>

        <div style={{ padding: '2rem 2.5rem' }}>
          {!showResult ? (
            /* ── FORMULÁRIO ── */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {PILLARS.map((pilar, pi) => (
                  <div key={pilar.id} style={{ border: `2px solid ${pilar.color}22`, borderRadius: '14px', padding: '1.25rem', background: `${pilar.color}05` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: pilar.color, fontWeight: 700 }}>Pilar {pilar.id}</p>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>{pilar.name}</h3>
                      </div>
                      <div style={{ background: pilar.color, color: '#fff', borderRadius: '10px', padding: '4px 12px', fontWeight: 800, fontSize: '1rem' }}>
                        {pillarScores[pi]}<span style={{ fontSize: '0.65rem', fontWeight: 400, opacity: 0.8 }}>/10</span>
                      </div>
                    </div>
                    {pilar.criteria.map((c, ci) => (
                      <div key={ci} style={{ marginBottom: '1.5rem', borderBottom: ci < pilar.criteria.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <label style={{ fontSize: '0.85rem', color: '#1e293b', flex: 1, fontWeight: 600 }}>{c.label}</label>
                        </div>
                        
                        {/* Botões de Múltipla Escolha */}
                        <div className="eval-pills-grid">
                          {[...Array(c.max + 1).keys()].map(val => (
                            <button
                              key={val}
                              type="button"
                              className={`eval-pill-btn ${scores[pi][ci]?.score === val ? 'selected' : ''}`}
                              onClick={() => setScore(pi, ci, val)}
                              disabled={readOnly}
                            >
                              {val}
                            </button>
                          ))}
                        </div>

                        {/* Toggle de Comentário */}
                        <div className="eval-comment-toggle">
                          <span>Escrever comentário?</span>
                          <button 
                            type="button" 
                            className={`eval-comment-btn ${scores[pi][ci]?.hasComment ? 'active' : ''}`}
                            onClick={() => toggleComment(pi, ci)}
                            disabled={readOnly}
                          >
                            Sim
                          </button>
                          <button 
                            type="button" 
                            className={`eval-comment-btn ${!scores[pi][ci]?.hasComment ? 'active' : ''}`}
                            onClick={() => !readOnly && scores[pi][ci]?.hasComment && toggleComment(pi, ci)}
                            disabled={readOnly}
                          >
                            Não
                          </button>
                        </div>

                        {scores[pi][ci]?.hasComment && (
                          <textarea
                            className="eval-textarea"
                            placeholder="Descreva observações ou orientações..."
                            value={scores[pi][ci]?.comment || ''}
                            onChange={(e) => setCommentText(pi, ci, e.target.value)}
                            disabled={readOnly}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Botão de Salvar no Final */}
              {!readOnly && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem 0', borderTop: '2px dashed #e2e8f0', marginTop: '2rem' }}>
                  <button 
                    onClick={handleSave} 
                    disabled={saving} 
                    style={{ 
                      background: '#1DB954', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: '50px', 
                      padding: '1.2rem 3rem', 
                      fontWeight: 800, 
                      cursor: 'pointer', 
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 20px rgba(29, 185, 84, 0.2)',
                      transition: 'all 0.3s'
                    }}
                  >
                    {saving ? '⏳ Salvando...' : '💾 Salvar e Ver Resultado Final'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ── RESULTADO ── */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', fontWeight: 600 }}>Pontuação Total</p>
                  <div style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1, color: '#1e293b' }}>{totalScore}</div>
                  <div style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '1rem' }}>de 50 pontos</div>
                  <div style={{ background: '#f1f5f9', borderRadius: '100px', height: 10, marginBottom: '1rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(totalScore / 50) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #ec4899)', borderRadius: '100px', transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ background: interpretation.bg, border: `1px solid ${interpretation.border}`, borderRadius: '12px', padding: '1rem' }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 800, fontSize: '1rem' }}>{interpretation.emoji} {interpretation.label}</p>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>{interpretation.desc}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <RadarChart scores={pillarScores} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                {PILLARS.map((p, i) => (
                  <div key={p.id} style={{ textAlign: 'center', background: `${p.color}10`, border: `2px solid ${p.color}33`, borderRadius: '12px', padding: '0.75rem 0.5rem' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: p.color }}>{pillarScores[i]}</div>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginBottom: '2px' }}>de 10</div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#334155', lineHeight: 1.2 }}>{p.name}</div>
                    <div style={{ marginTop: '6px', background: '#e2e8f0', borderRadius: '100px', height: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(pillarScores[i] / 10) * 100}%`, background: p.color, borderRadius: '100px' }} />
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontWeight: 800, marginBottom: '1rem', color: '#1e293b' }}>3 Pontos de Atenção Identificados</h3>
              <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                {problems.map((prob) => (
                  <div key={prob.key} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', background: prob.bg, border: `1px solid ${prob.border}`, borderRadius: '14px', padding: '1rem 1.25rem' }}>
                    <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{prob.icon}</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 800, color: prob.color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{prob.label}</span>
                        <span style={{ background: prob.color, color: '#fff', borderRadius: '6px', padding: '1px 8px', fontSize: '0.7rem', fontWeight: 700 }}>{prob.pillar?.name} — {prob.pillar?.score}/10</span>
                      </div>
                      <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', lineHeight: 1.5 }}>{prob.suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>

                <button onClick={() => setShowResult(false)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', color: '#475569', fontSize: '0.9rem' }}>✏️ Editar Notas</button>
                <button onClick={() => window.print()} style={{ background: '#0F2D3A', border: 'none', borderRadius: '10px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', color: '#fff', fontSize: '0.9rem' }}>🖨️ Imprimir PDF</button>
                {!readOnly && <button onClick={onClose} style={{ background: 'transparent', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}>Finalizar</button>}
              </div>

              {/* Seção de Comentários Detalhados no Resultado */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                <h3 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '1.5rem' }}>📋 Observações Detalhadas</h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {PILLARS.map((p, pi) => {
                    const pillarComments = scores[pi].filter(s => s.hasComment && s.comment.trim());
                    if (pillarComments.length === 0) return null;
                    return (
                      <div key={p.id} style={{ border: `1px solid ${p.color}33`, borderRadius: '12px', padding: '1.25rem', background: `${p.color}03` }}>
                        <h4 style={{ color: p.color, margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                          {p.name}
                        </h4>
                        {p.criteria.map((c, ci) => {
                          const s = scores[pi][ci];
                          if (!s.hasComment || !s.comment.trim()) return null;
                          return (
                            <div key={ci} style={{ marginBottom: '1rem', paddingLeft: '1rem', borderLeft: `2px solid #e2e8f0` }}>
                              <p style={{ margin: '0 0 4px 0', fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>{c.label}</p>
                              <p style={{ margin: 0, fontSize: '0.9rem', color: '#1e293b', fontStyle: 'italic' }}>"{s.comment}"</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  {PILLARS.every((_, pi) => !scores[pi].some(s => s.hasComment && s.comment.trim())) && (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>Nenhuma observação adicional registrada.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
