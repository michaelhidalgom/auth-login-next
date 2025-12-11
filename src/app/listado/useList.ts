import { useEffect, useState } from "react";
import { ProductCases } from "@/application/useCases/ProductCases";
import { Products } from "@/domain/models/Product";
import { ProductApi } from "@/infrastructure/repositories/ProductApi";

const useList = () => {
  const [product, setProduct] = useState<Products | undefined>();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const getProductAll = new ProductCases(new ProductApi());
    const result = await getProductAll.getAllProducts();
    console.log(result.response.products);
    setProduct(result.response)
  };

  return { product };
};

export default useList;
