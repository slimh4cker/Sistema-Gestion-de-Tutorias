// Metodos relaiconados con request
// como por ejemplo obtener datos de estos

export function obtenerMailDeReq (req) {
  return req.user.email
}