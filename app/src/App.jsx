import { useMemo, useState } from 'react'
import bloque from './bloque-B0.json'

const RACE_DATE = new Date('2027-03-14T09:00:00')
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

export function todayISO() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

function fmt(fecha) {
  const d = new Date(fecha + 'T09:00:00')
  return `${DIAS[d.getDay()].slice(0, 3)} ${d.getDate()} ${MESES[d.getMonth()]}`
}

function diasEntre(a, b) {
  return Math.round((new Date(b + 'T09:00:00') - new Date(a + 'T09:00:00')) / 86400000)
}

function useProgreso() {
  const [progreso, setProgreso] = useState(() => {
    try { return JSON.parse(localStorage.getItem('onil14k-progreso') || '{}') }
    catch { return {} }
  })
  const set = (fecha, patch) => {
    setProgreso((p) => {
      const next = { ...p, [fecha]: { ...(p[fecha] || {}), ...patch } }
      localStorage.setItem('onil14k-progreso', JSON.stringify(next))
      return next
    })
  }
  const clear = (fecha) => {
    setProgreso((p) => {
      const next = { ...p }
      delete next[fecha]
      localStorage.setItem('onil14k-progreso', JSON.stringify(next))
      return next
    })
  }
  return { progreso, set, clear }
}

/* Estado del reto caminata: día n de 100 (día 1 = 2026-09-12) */
function retoDeHoy(hoy, reto) {
  if (!reto) return null
  const n = diasEntre('2026-09-12', hoy) + 1
  if (n >= 1 && n <= 100) {
    const m = n < 61 ? 35 : reto.subidas?.find((s) => s.dia_reto <= n)?.min_caminata ?? 40
    return { dia: n, minutos: m, reto }
  }
  return null
}

function formatDateRange(bloque) {
  const a = bloque.metadata.fecha_inicio_bloque
  const b = bloque.metadata.fecha_fin_bloque
  return a && b && a !== b ? `${fmt(a)} → ${fmt(b)}` : fmt(b)
}

/* ================= Riel: tiras de días ================= */
function DiaRiel({ dia, progreso, irA, hoy }) {
  const pr = progreso[dia.fecha] || {}
  const esHoy = dia.fecha === hoy
  const descanso = dia.tipo.includes('descanso')
  const clases = [
    'dia',
    esHoy ? 'hoy' : '',
    pr.hecho ? 'hecha' : '',
    descanso && !esHoy && !pr.hecho ? 'descanso' : '',
    !pr.hecho && !descanso && !esHoy ? 'pendiente' : '',
    dia.condicional ? 'conditional' : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={clases}
      onClick={() => irA(dia.fecha)}
      aria-label={`${fmt(dia.fecha)}: ${dia.etiqueta || dia.tipo}${pr.hecho ? ', completado' : ''}`}
    >
      <span className="top">
        <span className={`code${dia.codigo?.[0] === 'F' ? ' f' : ''}`}>{dia.codigo || '—'}</span>
        <span className="dow">{esHoy ? 'HOY' : fmt(dia.fecha)}</span>
      </span>
      <span className="titulo">{dia.etiqueta || dia.tipo}</span>
      <span className="meta">
        {dia.duracion_min ? `${dia.duracion_min} min` : 'Descanso'}
        {dia.km_objetivo ? ` · ${dia.km_objetivo} km` : ''}
        {dia.zonas_fc && dia.zonas_fc !== '-' && dia.zonas_fc !== 'sin FC obligatoria' ? ` · ${dia.zonas_fc}` : ''}
      </span>
      {pr.hecho && <span className="terminada">hecho</span>}
      {esHoy && !pr.hecho && <span className="ver">Abrir el día → marcar completado</span>}
    </button>
  )
}

/* ================= Pantalla principal ================= */
function Home({ bloque, progreso, irA }) {
  const hoy = todayISO()
  const diasParaCarrera = Math.max(0, diasEntre(hoy, '2027-03-14'))
  const dias = bloque.dias || []
  const hechos = dias.filter((d) => progreso[d.fecha]?.hecho).length
  const enRangoIndex = dias.findIndex((d) => d.fecha === hoy)
  const idx = enRangoIndex >= 0 ? enRangoIndex : dias.findIndex((d) => d.fecha > hoy)
  const retraso = enRangoIndex >= 0 ? Math.max(0, enRangoIndex - hechos) : null
  const retoHoy = retoDeHoy(hoy, bloque.metadata.reto_caminata)
  const siguiente = idx >= 0 && idx < dias.length ? dias[idx] : null

  const subidas = bloque.metadata.reto_caminata?.subidas || []
  const hitos = [61, 100, ...subidas.map((s) => s.dia_reto)]

  return (
    <div>
      <header className="mast">
        <div>
          <div className="t">14K Onil Trails</div>
          <div className="s">Bloque {bloque.metadata.bloque} · {bloque.metadata.fecha_inicio_bloque && formatDateRange(bloque)}</div>
        </div>
        <div className="c">
          <b>{diasParaCarrera}</b>
          <i>{diasParaCarrera === 1 ? 'día a la carrera' : 'días a la carrera'}</i>
        </div>
      </header>

      {retoHoy && (
        <div className="reto">
          <span className="n">{retoHoy.dia}/100</span>
          <p>
            <b>Reto caminata · hoy {retoHoy.minutos} min de caminar.</b>
            {retoHoy.dia < 100 && (
              (() => {
                const proxima = retoHoy.reto.subidas?.find((s) => s.dia_reto > retoHoy.dia)
                return proxima ? <> El día {proxima.dia_reto} sube a {proxima.min_caminata} min.</> : null
              })()
            )}
            {retoHoy.dia === 100 && <> Día final: la cadena se cierra.</>}
          </p>
        </div>
      )}

      {retoHoy && (
        <div className="tira" role="img" aria-label={`Reto caminata: día ${retoHoy.dia} de 100`}>
          <div className="row">
            {Array.from({ length: 100 }, (_, i) => {
              const nDay = i + 1
              const cl = nDay < retoHoy.dia ? 'hecha' : nDay === retoHoy.dia ? 'hecha mile' : hitos.includes(nDay) ? 'mile' : ''
              return <span key={i} className={`mk ${cl}`} />
            })}
          </div>
          <div className="cap">
            <span><b>{retoHoy.dia}</b> encadena</span>
            <span>100 días</span>
          </div>
        </div>
      )}

      <div className="stats">
        <div className="stat">
          <b>{hechos}<small>/{dias.length}</small></b>
          <span>completados</span>
        </div>
        <div className="stat">
          <b className={retraso > 0 ? 'warn' : ''}>{retraso !== null ? retraso : '--'}</b>
          <span>retraso</span>
        </div>
        <div className="stat">
          <b className="dato">{bloque.metadata.atleta.fc_max ? `${bloque.metadata.atleta.fc_max}` : '--'}</b>
          <span>FC máx · bpm</span>
        </div>
      </div>

      {retoHoy && (
        <div className="legenda">
          <i><span className="lm hecho" />día encadenado</i>
          <i><span className="lm aviso" />el reto de hoy</i>
          <i><span className="lm pend" />por venir</i>
        </div>
      )}

      {enRangoIndex >= 0 ? (
        <div style={{ padding: '18px 10px 6px 0' }}>
          <DiaRiel dia={dias[enRangoIndex]} progreso={progreso} irA={irA} hoy={hoy} />
        </div>
      ) : (
        siguiente && (
          <div className="preview" style={{ marginTop: 18 }}>
            El bloque abre el <b>{fmt(siguiente.fecha)}</b> con <b>{siguiente.codigo}</b> —{' '}
            {siguiente.etiqueta?.slice(0, 60)}
            {siguiente.etiqueta?.length > 60 ? '…' : ''}. Mientras, el reto caminata ya encadena.
          </div>
        )
      )}
    </div>
  )
}

/* ================= Lista de días (por semanas) ================= */
function ListaDias({ semana, progreso, irA }) {
  const hoy = todayISO()
  return (
    <div className="riel">
      {semana.map((d) => <DiaRiel key={d.fecha} dia={d} progreso={progreso} irA={irA} hoy={hoy} />)}
    </div>
  )
}

/** Agrupar los días por semanas naturales (lunes como inicio) */
function agruparPorSemanas(dias) {
  const semanas = []
  let current = []
  let currentLabel = ''
  dias.forEach((d) => {
    const dt = new Date(d.fecha + 'T09:00:00')
    const dow = (dt.getDay() + 6) % 7 // lunes = 0
    if (dow === 0 && current.length) {
      semanas.push({ label: currentLabel, dias: current })
      current = []
    }
    if (!current.length) {
      currentLabel = `Semana ${semanas.length + 1} · ${fmt(d.fecha)}`
    }
    current.push(d)
  })
  if (current.length) semanas.push({ label: currentLabel, dias: current })
  return semanas
}

/* ================= Detalle del día ================= */
function DetalleDia({ dia, progreso, set, clear, volver }) {
  const pr = progreso[dia.fecha] || {}
  const hecho = !!pr.hecho
  const checks = pr.checks || {}

  const toggleCheck = (idx) => {
    const c = { ...checks, [idx]: !checks[idx] }
    set(dia.fecha, { checks: c })
  }

  const camposRutina = (dia.rutina || []).filter(
    (c) => c.campo !== 'hecho' && (!c.opcional || c.obligatorio !== false),
  )

  return (
    <div className="detail">
      <button className="back" onClick={volver}>Volver al riel</button>

      <div className="detail-head">
        <div className="date-line">
          {dia.fecha === todayISO() ? 'HOY · ' : ''}
          {dia.bloque && `Bloque ${dia.bloque} · `}
          {fmt(dia.fecha)}
        </div>
        <h2>
          {dia.codigo && <span className="day-code">{dia.codigo}</span>}
          {dia.etiqueta || dia.tipo}
        </h2>
        <div className="meta-line">
          {dia.duracion_min ? <span className="chip">{dia.duracion_min} min</span> : null}
          {dia.km_objetivo ? <span className="chip">{dia.km_objetivo} km</span> : null}
          {dia.rpe_prev ? <span className="chip">RPE {dia.rpe_prev}</span> : null}
          {dia.zonas_fc && dia.zonas_fc !== '-' && (
            <span className="chip fc">FC {dia.zonas_fc}</span>
          )}
          {dia.semana_de_bloque && !dia.bloque ? <span className="chip">Sem {dia.semana_de_bloque}</span> : null}
        </div>
      </div>

      {dia.condicional && (
        <div className="section">
          <div className="info-block warn">Día condicional de esquí. Elige variantes al llegar (esquí / sesión larga).</div>
        </div>
      )}

      {dia.sesion?.length > 0 && (
        <div className="section">
          <h3>La sesión</h3>
          <div className="steps">
            {dia.sesion.map((s) => (
              <div className="step" key={s.orden}>
                <div className="num">{String(s.orden).padStart(2, '0')}</div>
                <div>
                  <div className="name">{(s.categoria || 'paso').replace('_', ' ')}</div>
                  <div className="desc">{s.descripcion}</div>
                  {s.observacion && <div className="note">{s.observacion}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {dia.calentamiento && (
        <div className="section">
          <h3>Calentamiento</h3>
          <div className="info-block">{dia.calentamiento}</div>
        </div>
      )}

      {dia.instrucciones_detalle && (
        <div className="section">
          <h3>Por qué este día</h3>
          <div className="info-block">{dia.instrucciones_detalle}</div>
        </div>
      )}

      {dia.alternativa_condicional && (
        <div className="section">
          <h3>Si algo falla</h3>
          <div className="info-block">{dia.alternativa_condicional}</div>
        </div>
      )}

      {dia.nutricion && (
        <div className="section">
          <h3>Nutrición</h3>
          <div className="info-block">{dia.nutricion}</div>
        </div>
      )}

      {dia.tareas && (
        <div className="section">
          <h3>Tareas</h3>
          <div className="info-block">{dia.tareas.join(' · ')}</div>
        </div>
      )}

      {dia.consejo && (
        <div className="section">
          <h3>Consejo Strava</h3>
          <div className="info-block">{dia.consejo}</div>
        </div>
      )}

      {camposRutina.length > 0 && (
        <div className="section">
          <h3>Registrar tras la sesión</h3>
          <div className="info-block">
            {camposRutina.map((c) => `${c.campo}${c.obligatorio ? ' *' : ''}`).join(' · ')}
          </div>
        </div>
      )}

      {(dia.sesion?.length || 0) > 0 && (
        <div className="section">
          <h3>Pasos completados</h3>
          <div>
            {dia.sesion.map((s, i) => (
              <button
                className={`check-item${checks[i] ? ' checked' : ''}`}
                key={s.orden}
                onClick={() => toggleCheck(i)}
                aria-pressed={!!checks[i]}
              >
                <span className="box" aria-hidden="true" />
                {s.descripcion}
              </button>
            ))}
          </div>
        </div>
      )}

      <button className={`complete-btn${hecho ? ' done' : ''}`} onClick={() => (hecho ? clear(dia.fecha) : set(dia.fecha, { hecho: true }))}>
        {hecho ? 'Desmarcar día' : 'Marcar día como completado'}
      </button>
      <div className="footer-note">guardado local · sin cuentas · localStorage</div>
    </div>
  )
}

/* ================= Pestaña Nutrición ================= */
function Nutricion({ bloque, progreso, irA }) {
  const pasos = useMemo(() => {
    const g = bloque.metadata?.guias_nutricion
    if (g) return g
    return [
      'Déficit calórico LIGERO constante (−300/400 kcal): proteína 1.6-2 g/kg en comidas principales',
      'Cena con CH la noche ANTES de sesiones largas, no el día de',
      'Desayuno con CH 60-90 min antes de la sesión larga',
      'En sesiones > 90 min: 30-60 g CH/hora + líquidos + electrolitos (marcaka que ya conozcas)',
      'Post sesión: CH + proteína dentro de la primera hora',
      'Anotar peso 1x por semana en ayunas (día fijo)',
    ]
  }, [bloque])

  const dias = bloque.dias.filter((d) => d.nutricion && d.nutricion !== '-')
  const hoy = todayISO()
  return (
    <div>
      <div className="section" style={{ padding: '0 22px' }}>
        <h3>Reglas generales</h3>
        <div className="nut-list">
          {pasos.map((p, i) => (
            <div className="info-block" key={i} style={p.includes('\n') ? { marginBottom: 0 } : undefined}>{p}</div>
          ))}
        </div>
      </div>

      <div className="section" style={{ padding: '0 22px' }}>
        <h3>Por día</h3>
      </div>
      <div style={{ padding: '12px 0 0' }}>
        {dias.map((d) => {
          const pr = progreso[d.fecha] || {}
          return (
            <button
              key={d.fecha}
              className={`dia${pr.hecho ? ' hecha' : ''}${d.fecha === hoy ? '' : ' pendiente'}`}
              onClick={() => irA(d.fecha)}
            >
              <span className="top">
                <span className="code">{fmt(d.fecha)}</span>
                <span className="dow">{d.tipo.includes('descanso') ? 'rest' : d.tipo.includes('larga') || d.tipo.includes('montana') ? 'larga' : 'normal'}</span>
              </span>
              <span className="titulo" style={{ fontSize: 13.5, fontFamily: 'var(--body)', fontWeight: 400 }}>
                {d.nutricion.length > 88 ? d.nutricion.slice(0, 88) + '…' : d.nutricion}
              </span>
              <span className="meta">abrir el detalle del día</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ================= App ================= */
export default function App() {
  const { progreso, set, clear } = useProgreso()
  const [tab, setTab] = useState('entrenamientos')
  const [detalle, setDetalle] = useState(null)

  const dia = detalle ? bloque.dias.find((d) => d.fecha === detalle) : null
  const semanas = useMemo(() => agruparPorSemanas(bloque.dias || []), [])

  const irA = (fecha) => {
    setDetalle(fecha)
    window.scrollTo(0, 0)
  }

  if (dia) {
    return (
      <div className="app">
        <DetalleDia dia={dia} progreso={progreso} set={set} clear={clear} volver={() => setDetalle(null)} />
      </div>
    )
  }

  const hoy = todayISO()
  const enRango = bloque.dias?.some((d) => d.fecha === hoy)

  return (
    <div className="app">
      <Home bloque={bloque} progreso={progreso} irA={irA} />

      {tab === 'entrenamientos' &&(
        semanas.map((s) => (
          <div className="semana" key={s.label}>
            <div className="semana-header">
              <span>{s.label}</span>
              <span className="progreso">{s.dias.filter((d) => progreso[d.fecha]?.hecho).length}/{s.dias.length}</span>
            </div>
            <ListaDias semana={enRango ? s.dias.filter((d) => d.fecha !== hoy) : s.dias} progreso={progreso} irA={irA} />
          </div>
        ))
      )}

      {tab === 'nutricion' && <Nutricion bloque={bloque} progreso={progreso} irA={irA} />}

      <div className="tabs">
        <div className="tabs-inner">
          <button className={`tab-btn${tab === 'entrenamientos' ? ' active' : ''}`} onClick={() => setTab('entrenamientos')}>
            Entrenamientos
          </button>
          <button className={`tab-btn${tab === 'nutricion' ? ' active' : ''}`} onClick={() => setTab('nutricion')}>
            Nutrición
          </button>
        </div>
      </div>
    </div>
  )
}
