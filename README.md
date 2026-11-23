# FinApp · Frontend

Aplicación web de finanzas personales. FinApp registra automáticamente los movimientos que llegan por notificación del banco, muestra en qué se va el dinero, controla el presupuesto por categoría y arma un plan para salir de deudas.

Este repositorio contiene el **frontend en Angular**. Por ahora funciona con **datos de prueba** guardados en el navegador; más adelante se conectará al backend (FastAPI + MySQL).

> Proyecto académico · Electiva I, Diseño de aplicaciones web · Corporación Universitaria Iberoamericana.

---

## Contenido

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Cómo levantar el proyecto](#cómo-levantar-el-proyecto)
- [Cuenta de prueba](#cuenta-de-prueba)
- [Comandos disponibles](#comandos-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Convenciones](#convenciones)
- [Datos de prueba](#datos-de-prueba)
- [Textos e idioma](#textos-e-idioma)
- [Estilos](#estilos)
- [Video de demostración](#video-de-demostración)
- [Publicación](#publicación)

---

## Funcionalidades

| Pantalla | Qué hace |
|---|---|
| Inicio de sesión | Ingreso con correo y contraseña, Google o Apple (simulado). |
| Inicio | Saldo total, ingresos y gastos del mes, últimos movimientos, próximo pago, presupuesto y deudas. |
| Movimientos | Lista agrupada por día con búsqueda y filtros por tipo, cuenta y categoría; detalle de cada movimiento. |
| Cuentas | Bancos, billeteras, efectivo y tarjeta de crédito con su saldo. |
| Conectar avisos | Guía para activar el registro automático en Android y iPhone y elegir qué apps escuchar. |
| Presupuesto | Gasto contra el límite de cada categoría, gasto por semana y alertas de límites superados. |
| Deudas | Saldo de cada deuda, porcentaje pagado, condiciones y tabla de próximas cuotas. |
| Plan de pagos | Simula los métodos **avalancha** y **bola de nieve** con el valor mensual que el usuario puede pagar. |
| Calendario de pagos | Cuotas y pagos fijos del mes en un calendario. |
| Reportes | Ingresos y gastos de los últimos seis meses, gastos por categoría y por cuenta. |
| Perfil y ajustes | Datos personales, preferencias, seguridad y botón para restablecer los datos de prueba. |
| Cómo se construyó | Página pública con el video de demostración, el proceso y las herramientas usadas. |

Además: ventanas para crear movimientos, cuentas y deudas y editar límites; panel de notificaciones; **modo oscuro**; diseño adaptable a celular.

## Tecnologías

- [Angular 22](https://angular.dev) con componentes standalone, signals y control de flujo `@if` / `@for`
- TypeScript
- SCSS
- [ngx-translate](https://github.com/ngx-translate/core) para los textos en español
- Fuente Plus Jakarta Sans (Google Fonts)

## Requisitos

- **Node.js 22** o superior
- **npm** (viene con Node.js)
- Git

Para revisar tu versión:

```bash
node -v
npm -v
```

<details>
<summary>¿No tienes Node.js? Instalación en macOS con Homebrew</summary>

```bash
brew install node@22
echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

En Windows o Linux descárgalo desde [nodejs.org](https://nodejs.org).
</details>

## Cómo levantar el proyecto

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tagudelo-ASD3/finApp-frontend.git
   cd finApp-frontend
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm start
   ```

4. **Abre el navegador** en [http://localhost:4200](http://localhost:4200)

   Los cambios que guardes en el código se ven al instante, sin recargar.

Para detener el servidor presiona `Ctrl + C` en la terminal.

> Si el puerto 4200 está ocupado: `npm start -- --port 4300`

## Cuenta de prueba

En la pantalla de inicio de sesión toca **"Usar cuenta de prueba"** y luego **"Iniciar sesión"**, o escribe:

| Correo | Contraseña |
|---|---|
| `andrea.rojas@correo.com` | `finapp2026` |

Cualquier correo válido con una contraseña de al menos 6 caracteres también funciona, porque el inicio de sesión todavía es simulado.

## Comandos disponibles

| Comando | Para qué sirve |
|---|---|
| `npm start` | Servidor de desarrollo en `http://localhost:4200`. |
| `npm run build` | Compila la versión de producción en `dist/finapp-web/browser`. |
| `npm run watch` | Compila en modo desarrollo cada vez que cambia un archivo. |

## Estructura del proyecto

```
src/
├── app/
│   ├── core/                    # Lo general de toda la aplicación
│   │   ├── constants/           # Contenido fijo (página "Cómo se construyó")
│   │   ├── guards/              # Protección de rutas (sesión iniciada o no)
│   │   ├── layout/shell/        # Barra lateral y contenedor de las páginas
│   │   ├── models/              # Todas las interfaces y tipos
│   │   ├── services/            # Lógica y datos (cuentas, movimientos, deudas…)
│   │   └── utils/               # Funciones de apoyo (fechas, plan de pagos, almacenamiento)
│   ├── shared/                  # Lo visual reutilizable
│   │   ├── assets/images/       # Imágenes e íconos del sitio
│   │   ├── components/          # dialog, icon, logo, page-header
│   │   ├── pipes/               # Formato de pesos y fechas relativas
│   │   └── styles/              # Estilos globales (ver sección Estilos)
│   ├── features/                # Un módulo por sección de la app
│   │   ├── <módulo>/pages/      # Pantallas: una carpeta por pantalla (.ts, .html, .scss)
│   │   ├── <módulo>/components/ # Ventanas y piezas propias del módulo
│   │   └── <módulo>/<módulo>.routes.ts
│   ├── app.config.ts            # Configuración: rutas, traducciones, idioma es-CO
│   ├── app.routes.ts            # Rutas principales
│   └── app.ts                   # Componente raíz
├── mocks/                       # Datos de prueba
├── index.html
└── main.ts
public/
└── i18n/es.json                 # Todos los textos de la interfaz
```

Módulos en `features/`: `about`, `accounts`, `auth`, `budgets`, `dashboard`, `debts`, `movements`, `notifications`, `profile`, `reports`.

## Convenciones

- **Código en inglés**: carpetas, archivos, clases, variables, rutas y comentarios. **Textos visibles en español**, siempre desde `es.json`.
- **Cada componente en su carpeta** con tres archivos separados: `nombre.ts`, `nombre.html` y `nombre.scss`. No se escribe HTML ni CSS dentro del `.ts`.
- **Interfaces y tipos** solo en `core/models/`, nunca dentro de un componente o servicio.
- **Servicios** solo en `core/services/`; las páginas solo muestran datos y llaman a los servicios.
- Prefijo de los selectores: `fa-` (por ejemplo `<fa-page-header>`).
- Nombres de archivo al estilo de Angular 22: `dashboard.ts` y clase `Dashboard`, sin el sufijo `.component`.
- Componentes con `ChangeDetectionStrategy.OnPush` y estado con signals.

## Datos de prueba

Mientras el backend no está listo, los datos salen de `src/mocks/` y los cambios que hagas (nuevos movimientos, cuentas, límites…) se guardan en el `localStorage` del navegador con el prefijo `finapp.v1.`.

- Las fechas se calculan desde el día actual, así que el mes siempre se ve con datos.
- Para volver a los datos originales: **Perfil y ajustes → Restablecer datos de prueba**.

## Textos e idioma

Todos los textos están en `public/i18n/es.json`, organizados por pantalla (`login`, `dashboard`, `movements`, `debts`…). En las plantillas se usan con el pipe `translate`:

```html
<h2>{{ 'dashboard.recentMovements' | translate }}</h2>
<p>{{ 'debts.inDays' | translate: { days: 5 } }}</p>
```

Para agregar un texto nuevo, crea la clave en `es.json` y úsala en el HTML.

## Estilos

Los estilos que se repiten están en `src/app/shared/styles/`, separados por responsabilidad:

| Carpeta | Contenido |
|---|---|
| `abstracts/` | Variables de color (modo claro y oscuro) y breakpoints. |
| `base/` | Reset y tipografía. |
| `layout/` | Página, grillas (`grid--2`, `grid--3`, `grid--auto`…), filas y columnas. |
| `components/` | Tarjetas, botones, chips, formularios, listas, tablas, interruptores, gráficas. |
| `utilities/` | Textos (`muted`, `faint`, `amount`…) y ayudas. |

El `.scss` de cada componente solo tiene lo que es propio de esa pantalla. Para usar los breakpoints en un componente:

```scss
@use 'abstracts/breakpoints' as bp;

@include bp.down(md) {
  // estilos para pantallas pequeñas
}
```

Colores principales: espresso `#2B1F17`, caramelo `#D9A66B` y fondo `#F4EDE3`.

## Video de demostración

Cuando el video esté en YouTube, pega su ID en `src/app/core/constants/about.constants.ts`:

```ts
// De https://youtu.be/AbC123xyz el ID es AbC123xyz
export const DEMO_VIDEO_ID = 'AbC123xyz';
```

El video aparece en la página **Cómo se construyó** (`/#/about`).

## Publicación

La aplicación usa rutas con `#` (por ejemplo `/#/dashboard`), así que funciona en un hosting estático como GitHub Pages sin configuración extra del servidor.

Para generar la versión que se publica:

```bash
npm run build -- --base-href /finApp-frontend/
```

Los archivos quedan en `dist/finapp-web/browser`.

---

Hecho con Angular · Datos de prueba ficticios.
