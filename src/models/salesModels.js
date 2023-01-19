const connection = require('./connection');

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
        FROM StoreManager.sales AS s
        INNER JOIN StoreManager.sales_products AS sp
        ON s.id = sp.sale_id
    ORDER BY saleId, productId`,
  );
  return result;
};

const findSalesById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY productId`,
    [id],
  );

  return sale;
};

module.exports = {
  findAllSales,
  findSalesById,
};

// table "sales" e "sales_products"