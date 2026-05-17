export function ok(data: any) {
  return Response.json({ success: true, data }, { status: 200 });
}

export function error(message: string, code = 400) {
  return Response.json({ success: false, message }, { status: code });
}