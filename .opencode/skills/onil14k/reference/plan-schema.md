# Schema JSON del plan de entrenamiento (web de seguimiento)

Objeto raíz — UNA INSTANCIA POR BLOQUE (la skill genera bloque a bloque):

```json
{
  "metadata": {
    "carrera": "14K Onil Trails",
    "fecha_carrera": "2027-03-14",
    "hora_salida": "09:00",
    "bloque": "B0",
    "bloque_descripcion": "Base cero + test de FC máx",
    "fecha_inicio_bloque": "2026-11-09",
    "fecha_fin_bloque": "2026-11-29",
    "atleta": {
      "edad": 26,
      "peso_inicial_kg": 85,
      "fc_max": null,
      "molestias": ["rodillas"],
      "material": "mancuernas ajustables, gomas, esterilla",
      "dispositivo": "Strava + pulsómetro de pecho"
    },
    "fecha_revision_bloque": "2026-11-29",
    "esqui": {
      "temporada_inicio": "2027-01-07",
      "temporada_fin": "2027-02-07",
      "fines_de_semana_variables": true,
      "semana_completa": ["2027-01-18", "2027-01-24"]
    },
    "objetivo": "Terminar dentro del corte, con margen hasta 3h30",
    "avituallamientos": [
      {"km": 7.4, "cierre": "10:30"},
      {"km": 10, "cierre": "12:00"},
      {"km": 14, "cierre": "13:00", "meta": true}
    ]
  },

  "dias": [
    {
      "id": "B0-01",
      "fecha": "2026-11-09",
      "dia_semana": "lunes",
      "bloque": "B0",
      "semana_de_bloque": 1,
      "fase": "base_cero",
      "tipo": "fuerza_casa",
      "etiqueta": "Fuerza: cimientos y rodillas",
      "duracion_min": 45,
      "km_objetivo": null,
      "zonas_fc": "solo control de RPE, sin FC obligatoria",
      "rpe_prev": 5,
      "calentamiento": "5-8 min de movilidad articular general",
      "sesion": [
        {"orden": 1, "categoria": "fuerza_piernas", "descripcion": "Sentadilla goblet con mancuerna; 3×10, bajando en 3s", "observacion": "Prepara rodillas sin carga axial violenta"},
        {"orden": 2, "categoria": "fuerza_piernas", "descripcion": "Zancadas estáticas; 2×8 por pierna", "observacion": "Rodilla alineada con el pie, sin que caiga hacia dentro"},
        {"orden": 3, "categoria": "fuerza_piernas", "descripcion": "Peso muerto rumano con mancuerna; 3×10", "observacion": "Isquiotibiales y lumbar listos para las bajadas futuras"},
        {"orden": 4, "categoria": "core", "descripcion": "Plancha frontal 3×30s + plancha lateral 2×20s por lado", "observacion": "Core para montaña"},
        {"orden": 5, "categoria": "accesorios", "descripcion": "Flexiones con rodillas al suelo; 2×máx-2", "observacion": "Progresará a flexiones completas con el tiempo"}
      ],
      "instrucciones_detalle": "Primera sesión de fuerza. No hay running. El objetivo es construir fuerza estructural para poder empezar a correr con seguridad y proteger las rodillas.",
      "alternativa_condicional": "Si aún no hay material: sentadillas en el aire, zancadas estáticas, planchas y flexiones con rodillas al suelo",
      "rutina": [
        {"campo": "hecho", "tipo": "bool"},
        {"campo": "duracion_min_real", "tipo": "number"},
        {"campo": "rpe_real", "tipo": "number", "rango": "1-10"},
        {"campo": "fc_media", "tipo": "number", "unidad": "bpm", "obligatorio": "excepto en fuerza"},
        {"campo": "fc_max_sesion", "tipo": "number", "unidad": "bpm"},
        {"campo": "molestia_rodilla", "tipo": "string", "opciones": ["0 - no molesta", "1-3 leve", "4-6 moderada", "7-10 fuerte"]},
        {"campo": "peso_manana_kg", "tipo": "number", "obligatorio": "1x por semana"},
        {"campo": "sensaciones", "tipo": "texto"},
        {"campo": "variante_elegida", "tipo": "string", "obligatorio": "solo en días condicionales"}
      ],
      "nutricion": "Comida post sesión: proteína + carbohidrato moderado dentro de la hora siguiente. Déficit calórico LIGERO el resto del día",
      "consejo": "Registra en Strava: duración, FC media y FC máx de la sesión"
    },
    {
      "id": "B3-08",
      "fecha": "2027-01-16",
      "dia_semana": "sábado",
      "bloque": "B3",
      "semana_de_bloque": 1,
      "fase": "ventana_esqui",
      "tipo": "condicional_esqui_o_larga",
      "etiqueta": "Esquí condicional / sesión larga alternativa",
      "condicional": true,
      "variantes": [
        {
          "condicion": "esqui_disponible",
          "tipo": "esqui",
          "etiqueta": "Día de esquí",
          "duracion_min": 300,
          "sesion": [
            {"orden": 1, "categoria": "cardio", "descripcion": "Día completo de esquí alpino", "observacion": "Cuenta como ejercicio: no añadir sesión extra de running"}
          ],
          "nutricion": "Ojo: el esquí gasta mucho. Añade carbohidratos el día antes y durante"
        },
        {
          "condicion": "sin_esqui",
          "tipo": "correr_montana_larga",
          "etiqueta": "Sesión larga en montaña",
          "duracion_min": 120,
          "km_objetivo": 12,
          "zonas_fc": "Z2 en todo momento, caminar las cuestas",
          "sesion": [
            {"orden": 1, "categoria": "cardio", "descripcion": "Sesión larga en montaña Onil/Mariola, con desnivel, sin bajar rápido", "observacion": "Rodillas: bajar controlado, sin zancadas largas"}
          ],
          "nutricion": "Desayuno con CH 60-90 min antes; hidratación durante"
        }
      ],
      "instrucciones_detalle": "Fin de semana dentro de la ventana de esquí. Si hay nieve, esquí sustituye al running; si no, toca la sesión larga en montaña. Elige la variante al terminar el día",
      "consejo": "Registra en Strava la variante elegida"
    },
    {
      "id": "B3-13",
      "fecha": "2027-01-21",
      "dia_semana": "jueves",
      "bloque": "B3",
      "semana_de_bloque": 2,
      "fase": "semana_entera_esqui",
      "tipo": "esqui",
      "etiqueta": "Esquí (semana del 18 ene)",
      "duracion_min": 0,
      "sesion": [
        {"orden": 1, "categoria": "cardio", "descripcion": "Esquí todo el día (semana de esquí completa)", "observacion": "Descarga activa: NO compensar con running"}
      ],
      "instrucciones_detalle": "Toda la semana del 18-24 ene es descarga del running. El esquí es cardio alto pero de impacto distinto. Es cuota de descanso acumulada en running: aprovecha que las rodillas echan de menos el descanso también",
      "nutricion": "Es semana de más CH, más Euro snacks y menos restrictividad calórica (se gasta mucho)",
      "consejo": "Registra horas de esquí estimadas"
    }
  ]
}
```

## Reglas de generación

1. **Todos los días tienen entrada** (incluidos los días de descanso total, con `tipo: "descanso"` y `sesion: []`), para que la web tenga un cuadrado por cada día del calendario del bloque
2. `sesion` es siempre un array de pasos ordenados; cada paso lleva `categoria` (fuerza_piernas / core / accesorios / cardio / técnica / test) y `observacion`
3. **Códigos de sesión** (campo `codigo` por día): serie **F01, F02...** para `tipo: "fuerza_casa"`. Serie **T01, T02...** para todo lo que entrena y no es fuerza (cardio, marchar-corriendo, montaña, test FC, esquí, recuperación activa). **Sin código** (`codigo: null`): descanso total y revisión de bloque. Las series son GLOBALES y continuas en todo el plan (T y F separadas, nunca se resetea por bloque); al replanificar días, renumerar las sesiones afectadas. Es lo más visible de cada día en la web
3. `instrucciones_detalle` SIEMPRE explica el POR QUÉ del día y menciona las rodillas en días de carga o con bajadas
4. Días condicionales de esquí: `condicional: true` + array `variantes` con las 2 versiones; la web muestra botones para elegir la variante
5. Cada día lleva `rutina` con los campos que el atleta debe registrar tras la sesión (opto yo por llamarle `rutina` en vez de `resumen_post`); los campos obligatorios se marcan con `obligatorio`
6. `consejo` siempre apunta a registrar en Strava lo que se sincroniza: FC media, FC máx, km, m de desnivel, duración
7. Las semanas de descarga (la 3ª de cada bloque) tienen 20-30% menos volumen en las sesiones progresivas, nunca una semana al 0 absoluto
8. El GPX de la carrera (`assets/Carrera-onil-14k.gpx`) es la fuente para dimensionar las sesiones de montaña específicas en B4 y B5 (perfil y desnivel del recorrido real)
9. Nombres de campos y `tipo` siempre en mayúsculas/minúsculas consistentes, en ASCII donde sea posible (evitar acentos en claves JSON: usar `esqui`, `condicional_esqui_o_larga`, `correr_montana_larga`), para que la web no se rompa
