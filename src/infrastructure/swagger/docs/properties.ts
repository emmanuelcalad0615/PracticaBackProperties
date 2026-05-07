/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Gestión de propiedades
 */

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Listar propiedades con filtros y paginación
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtrar por ubicación
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Precio mínimo
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Precio máximo
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Página (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Resultados por página (default 10)
 *     responses:
 *       200:
 *         description: Lista de propiedades
 */

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Obtener propiedad por ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propiedad encontrada
 *       404:
 *         description: Propiedad no encontrada
 */

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Crear propiedad
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 example: Apartamento en El Poblado
 *               price:
 *                 type: number
 *                 example: 350000000
 *               location:
 *                 type: string
 *                 example: Medellín
 *               available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Propiedad creada
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Actualizar propiedad
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               price:
 *                 type: number
 *               location:
 *                 type: string
 *               available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Propiedad actualizada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Propiedad no encontrada
 */

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Eliminar propiedad
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Propiedad eliminada
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Propiedad no encontrada
 */