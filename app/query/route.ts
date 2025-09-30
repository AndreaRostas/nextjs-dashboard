import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false }, // ggf. anpassen
});

async function listInvoices() {
  return sql/*sql*/`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

