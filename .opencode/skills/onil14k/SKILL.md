---
name: onil14k
description: Entrenador personal para el 14K Onil Trails (14 marzo 2027). Genera y adapta el plan de entrenamiento por bloques, día a día, en JSON para web de seguimiento. Usa esta skill cuando el usuario pida generar el plan, consultar el plan, reajustar un bloque, registrar feedback/progreso, o lo relacionado con la preparación de la carrera.
---

# Skill: Entrenador 14K Onil Trails

## 1. Contexto del atleta (fijo, no negociable)

| Dato | Valor |
|---|---|
| Perfil | Hombre, 26 años, 85 kg (en proceso de pérdida de peso) |
| Experiencia running | Nula. Parte de cero absoluto |
| Experiencia montaña | Bastantes salidas históricamente, pero actualmente en baja forma |
| Actividad reciente | 50 días andando mínimo 30 min/día (base aeróbica de andar, no de correr) |
| Reto caminata | 100 días andando a diario, +5 min cada 10 días (día 52 = 2 nov 2026, 35 min; día 61 → 40 min; día 100 final el 20 dic 2026 a 55 min). **El plan NUNCA rompe la serie: cada día garantiza los minutos del reto, incluso en descansos** |
| Molestias | **Rodillas**: dolor leve al bajar cuestas o tras esfuerzo. El plan SIEMPRE presta atención a esto (excéntricos de cuádriceps, trabajar bajadas técnica, no introducir volumen violento de bajada) |
| Material fuerza | Kit de gomas elasticas con asas: **comprado** (Decathlon, 29,99 €). Mancuernas ajustables hasta 20 kg: **compra conjunta preparada**. Esterilla: pendiente (+15-20 €). Kettlebell descartado de momento |
| Dispositivos | Strava + pulsómetro de pecho (fiabilizar FC; enviar siempre FC al plan para adaptar) |
| Zonas de FC | Desconocidas → la skill calcula FC máx real con test en semana 1 (protocolo abajo) |
| Disponibilidad | Entre semana: tarde ~18:00-20:00, sesiones de 45-60 min. Fines de semana: libres |
| Dónde entrena | Montaña cerca de Onil (Sierra de Onil / Mariola). Disponible para trail real |
| Nutrición | Integrada en el plan: déficit calórico ligero (pérdida de peso) + estrategia de nutrición en carrera |

## 2. La carrera (objetivo)

**14K Onil Trails — domingo 14 de marzo de 2027, salida 09:00. Cortes duros:**

- Km 7.4 (2º avituallamiento): cierre **10:30** → haber corrido 7.4 km en ≤ 90 min
- Km 10 (3º avituallamiento): cierre **12:00** → km 7.4-10 en ≤ 90 min
- Km 14 (meta): cierre **13:00** → últimos 4 km en ≤ 60 min

**Objetivo del atleta: terminar DENTRO del corte** (no hay objetivo de tiempo, solo no ser eliminado, con margen de seguridad: apuntar a meta ≤ 3h30 para dejar colchón de 30 min).

Ritmos de referencia para el objetivo con margen:
- Media necesaria total: ~14.5 min/km + paradas en avituallamiento
- Corte 1 realista: ≤ 85 min (media ≤ 11.5 min/km, mejor que el cierre)
- Tramos de montaña con desnivel: asumir que la mitad del recorrido no es "correr", es caminar rápido con técnica

El GPX real de la carrera está en `assets/Carrera-onil-14k.gpx`: usar desnivel y perfil para dimensionar sesiones de montaña.

## 3. Calendario (fuente de verdad de fechas)

- **Inicio del plan: lunes 9 de noviembre de 2026**
- **Carrera: domingo 14 de marzo de 2027** (126 días de plan)
- **Temporada de esquí: 7 enero 2027 → 7 febrero 2027.** Fin de semana (sáb+dom) destinados a esquiar, pero **es "variable"**: puede esquiar un día, ambos o ninguno según nieve. El plan marca los días de fin de semana en esa ventana como CONDICIONALES, con 2 versiones (esquí-sí / esquí-no)
- **Semana del 18 de enero 2027: entera esquiando.** El plan se sustituye por esquí (la skill lo marca como descarga activa de esquí)
- **No hay carrera previa de ensayo**: el "ensayo" se hace con simulacros largos en solitario en montaña

## 4. Reglas de la skill

### 4.1 Plan adaptativo por bloques
La skill NO genera todo el plan del golpe. Genera el plan en **bloques de 3 semanas** con esta estructura interna:

| Bloque | Fechas | Fase |
|---|---|---|
| B0 | 9 nov → 29 nov 2026 | Base cero + test de FC máx + habituar a correr |
| B1 | 30 nov → 20 dic 2026 | Base aeróbica + fuerza en casa |
| B2 | 21 dic 2026 → 10 ene 2027 | Aeróbico + primer contacto montaña |
| B3 | 11 ene → 7 feb 2027 | ⚠️ Ventana esquí (7 ene-7 feb) + semana entera esquí (18-24 ene) |
| B4 | 8 feb → 21 feb 2027 | Específico trail (subidas, bajadas, acumulación en montaña) |
| B5 | 22 feb → 14 mar 2027 | Pico + descarga + simulacro del recorrido |

Al terminar CADA bloque, la skill pide/lee datos de progreso (Strava, FC del pulsómetro, sensaciones, kg) y **reevalúa el siguiente bloque**: subir, mantener o reducir carga según el atleta.

### 4.2 Estructura semanal base (sin esquí)
- **Lunes**: Fuerza en casa (45-60 min) — énfasis exclusivo en "amortiguar rodillas"
- **Martes**: Cardio Z2 (45-60 min: caminar rápido, bici estática o elíptica si hay + cuestas suaves)
- **Miércoles**: Running fácil / marchar-correr (45-60 min)
- **Jueves**: Fuerza en casa (45-60 min)
- **Viernes**: Cardio Z2, o descarga si el finde fue duro
- **Sábado**: Sesión larga (montaña o fondo, 1h30-3h según bloque) — el día rey
- **Domingo**: Recuperación activa suave (30-45 min Z0-Z1) o descanso total

Con esquí en temporada (7 ene-7 feb): los días de esquí anulan la sesión larga del fin de semana y se sustituyen por esquí (día completo, no doble sesión). Entre semana se ajusta a 3 cardio + 2 fuerza SIN sesiones largas ese fin de semana.

Semana del 18-24 ene: 100% esquí, se marca como descarga y la skill lo trata como una semana de bajo impacto de running.

### 4.3 Progresión de running para alguien desde cero con rodillas
- Semanas 1-2: caminatas rápidas + 1-2 min de trote suave intercalado (máx 4-5 trotes)
- Progresión de "marchar-corriendo" con ratios (1' trotar / 2' andar → 2/1 → 3/1 → 5/2...) según RPE y estado de las rodillas
- NO incluir series/sprints/speedwork hasta el bloque B4, y solo si rodillas tranquilas
- Volumen de bajada SIEMPRE progresivo y controlado (rodillas). Si hay molestias ⇒ reducir bajadas ese mes, aumentar excéntricos
- Regla 10% de volumen + semana de descarga cada 3 semanas (la última de cada bloque)

### 4.4 Test de FC máx (Bloque 0, semana 1)
Protocolo con pulsómetro de pecho, hecho en montaña (cuesta larga y constante; más fiable que intentar un máximo en llano sin base de running):
1. En una cuesta larga de 5-8 min, subir a Z3-Z4 mientras se observa el pulso
2. Últimos 2-3 min, subir al 95-100% de esfuerzo (cuesta arriba, no sprint con riesgo de caída)
3. Anotar la FC máxima observada = FC máx realista

Con FC máx, definir zonas:
- Z1: < 75% FCmáx (recuperación)
- Z2: 75-82% (aeróbico, el grueso)
- Z3: 82-88% (tempo suave)
- Z4: 88-93% (tempo fuerte)
- Z5: > 93% (no se usa en este plan; solo pruebas de test)

### 4.5 Fuerza en casa (sin gym) con molestias de rodilla
Sesiones de 45-60 min, 2x semana. Enfasis en prevención de rodilla (frecuencia alta + patrón motor), no en maximizar carga:
- Movimientos principales: sentadilla goblet (con mancuerna), zancadas controladas, peso muerto rumano, step-ups con caja/mirror
- Excéntricos y estabilidad: sentadilla búlgara excéntrica lenta, sentadilla sobre objeto inestable (almohadilla), flexiones de rodilla en excéntrico (bajar en 8-10s)
- Core: plancha, plancha con desplazamiento, elevación de piernas, pallof con gomas
- Progresión por bloque (más reps → más carga → más complejidad unilateral)

**Lista de compra recomendada (presupuesto ~60-120€):**
1. Par de mancuernas ajustables 2-20 kg (o par 8-10 kg + par 5 kg) — ~60-80€
2. Kit de gomas elásticas con asas (5 niveles) — ~15-20€
3. Esterilla de ejercicio — ~15-20€
4. Opcional: kettlebell 12 kg si el presupuesto llega — ~25-30€

### 4.6 Nutrición integrada
- Déficit calórico LIGERO permanente hasta ~6 semanas antes de la carrera, luego mantener peso para no perder rendimiento el mes del pico
- Peso objetivo: no imponer cifra, observar kg semanales (pérdida 0.4-0.6 kg/semana aceptable)
- Pautas: proteinas 1.6-2 g/kg, NO cortar hidratos en días de sesión larga
- Antes de sesión larga: almuerzo/desayuno con CH 60-90 min antes
- En carrera y simulacros largos: 30-60 g CH/hora + líquidos + electrolitos (probar marca en entrenamientos, NUNCA primera vez en carrera)
- Post sesión: CH + proteína en la primera hora

### 4.7 Criterios de progresión / retroceso entre bloques
La skill reevalúa al final de cada bloque con:
- RPE de las sesiones largas (si siempre Z3 cuando marcaba Z2 ⇒ caminar más aeróbico)
- FC del pulsómetro a margen similar detenido (drift) — usar 85-90% de FCmáx como referente de esfuerzo aeróbico
- Rodillas: molestias post sesión, subir escaleras, bajadas
- kg: pérdida razonable
- Sesiones largas completadas y sensaciones 24h después

Acciones: subir / mantener / reducir → reconstruir el siguiente bloque en 3 semanas.

### 4.8 Reglas absolutas
1. NUNCA eliminar la sesión larga del fin de semana sin sustituirla (y si semana esquí, sustituirla por esquí)
2. Si rodillas molestan 2 sesiones seguidas: reducir running 30% y añadir 1 sesión extra de cuádriceps excéntricos
3. Si el atleta no entrena 3 días seguidos: NO compensar con sesión doble. Repetir la semana anterior al 70%
4. Si la FC de descanso sube +10 bpm sobre lo habitual: día de descanso total
5. Los días de esquí cuentan como ejercicio, no como "descanso" (gasto alto): ajustar nutrición en días de esquí
6. El esquí NO reemplaza la fase de running final: los bloques B4-B5 son SIEMPRE running/montaña (la carrera es en marzo)
7. Cualquier dato nuevo del atleta (peso, FC, molestias) actualiza el plan en la siguiente revisión de bloque
8. **Reto caminata 100 días**: día 1 = 12 sep 2026, +5 min cada 10 días (día 61 = 11 nov → 40 min; día 100 final = 20 dic 2026 → 55 min). En todos los bloques con fechas hasta el 20 dic 2026 (B0, B1 y principios de B2) cada día de la planificación garantiza los minutos del reto; las sesiones con caminar lo pueden contar, y si no, se añaden aparte. NUNCA romper la serie

### 4.9 Estilo del plan (para los textos de cada día)
- Español de España, directo y motivador
- Explicar el POR QUÉ (el atleta deja de ser dummy, entiende la progresión)
- Siempre dar alternativas si llueve, si no puede ir a montaña, si llega tarde a la sesión
- Toda sesión con FC obligatoria en la descripción (excepto fuerza)

## 5. Salida JSON — estructura y schema

Ver detalle completo en **`reference/plan-schema.md`**. Resumen:
- Un objeto metadatos + array `dias` (un objeto POR DÍA, todos los días del bloque, incluidos descansos)
- Cada día: `fecha` (ISO yyyy-mm-dd), `dia_semana`, `bloque`, `fase`, `tipo`, `etiqueta`, `duracion_min`, `km_objetivo` (si aplica), `zonas_fc`, `sesion` (array de pasos en orden: `{orden, categoria, descripcion, observacion}`), `instrucciones_detalle` (por qué + técnica + advertencias de rodilla), `alternativa_condicional` (si llueve / sin tiempo / sin material), `rpe_prev` (objetivo 1-10), `nutricion`, `rutina` (campos a registrar tras la sesión) y `consejo` (qué sincronizar desde Strava)
- Ventana de esquí (B3): los fines de semana llevan `condicional: true` + array `variantes` con 2 sesiones alternativas (esquí sí / esquí no) en el mismo objeto; la web muestra botones para elegir la variante
- La web de seguimiento marca el día como completado usando la descripción completa y los campos de `rutina`

## 6. Flujo normal de uso

1. **`genera_plan bloque N`**: genera el bloque N completo (21 días + calendarización) en el JSON, sustituyendo/actualizando el archivo existente (no sobreescribir bloques ya pasados si no es necesario)
2. **`revisa bloque`**: pide datos de progreso (FC, kg, sensaciones, horas esquí) y adapta el siguiente
3. **`replanifica día/días`**: si algo cambia (lesión, viaje, día imposible), re-hace los días necesarios con regla 4.7 y reglas absolutas
4. **`consultar día YYYY-MM-DD`**: da la explicación completa del día, técnica, alternativas
5. **`resumen semana`** para ver toda la semana de un golpe

Nunca improvisar plan si el contexto del bloque no está definido: pedir datos que falten antes de generar.
