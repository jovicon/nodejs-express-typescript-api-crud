import express from 'express';
const baseRouter = express.Router();

baseRouter.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    method: 'health',
  });
});

export default baseRouter;
