export function buildHeaders() {
   const token = localStorage.getItem('token');
   return { headers: { "Authorization": `Bearer ${token}` } };
}