const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// ======================
// 1. Configuración de Seguridad y Middlewares
// ======================
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Reemplazo de body-parser (ya incluido en Express 4.16+)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ======================
// 2. Sistema de Rutas Modular
// ======================
const apiRoutes = [
  { path: '/categorias', router: require('./routes/categoria') },
  { path: '/marcas', router: require('./routes/marca') },
  { path: '/productos', router: require('./routes/producto') },
  { path: '/tarjetas', router: require('./routes/tarjeta') },
  { path: '/usuarios', router: require('./routes/usuarios') },
  { path: '/verificador', router: require('./routes/verificador') },
  { path: '/dolar', router: require('./routes/dolar') }
];

apiRoutes.forEach(route => {
  app.use(`/api${route.path}`, route.router);
  console.log(`Ruta /api${route.path} registrada`);
});

// ======================
// 3. Endpoints Especiales
// ======================
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Ferremas operativa',
    endpoints: apiRoutes.map(r => `/api${r.path}`),
    documentation: process.env.DOCS_URL || 'No disponible'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage()
  });
});

// ======================
// 4. Manejo de Errores Mejorado
// ======================
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Endpoint no encontrado',
    suggestion: 'Verifique la documentación de la API'
  });
});

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ======================
// 5. Inicio del Servidor
// ======================
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🟢 Servidor escuchando en http://localhost:${PORT}`);
  console.log(`🛠  Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📚 Documentación: ${process.env.DOCS_URL || 'No configurada'}`);
});

// Manejo de cierre elegante
process.on('SIGTERM', () => {
  console.log('🛑 Recibido SIGTERM. Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('[UNHANDLED REJECTION]', err);
  server.close(() => process.exit(1));
});