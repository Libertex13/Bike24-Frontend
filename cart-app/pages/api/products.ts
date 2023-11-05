import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../types/types";
import products from "../../../data/products.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products);
}
