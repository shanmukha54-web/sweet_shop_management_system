// small helpers; keep simple
export function requireFields(obj: any, fields: string[]) {
  for (const f of fields) {
    if (obj[f] === undefined || obj[f] === null) throw { statusCode: 400, message: `Missing field ${f}` };
  }
}
