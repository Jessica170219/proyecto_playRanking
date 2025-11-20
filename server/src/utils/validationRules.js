
const { body } = require('express-validator');

const validacionCrearRanking = [

  body('nombreRanking').notEmpty().withMessage('El nombre es obligatorio'),
  body('parejas')
    .isInt({ min: 4, max: 10 })
    .withMessage('El número de parejas debe ser entre 1 y 10'),
  body('fechaInicio').isISO8601().toDate().withMessage('Fecha inicio inválida'),
  body('fechaFin')
    .isISO8601().toDate().withMessage('Fecha fin inválida')
    .custom((value, { req }) => {
      // value = fechaFin, req.body.fechaInicio = fechaInicio
      if (new Date(value) < new Date(req.body.fechaInicio)) {
        throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
      }
      return true;
    }),
];

module.exports = { validacionCrearRanking};
