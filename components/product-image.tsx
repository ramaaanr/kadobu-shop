import Image from 'next/image';
import { useState } from 'react';
interface ProductImageProps {
  foto_produk: string;
  height: number;
  width: number;
}

const ProductImage: React.FC<ProductImageProps> = ({
  foto_produk,
  height,
  width,
}) => {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_API_URL}/product_images/${foto_produk}`,
  );

  return (
    <Image
      width={width}
      height={height}
      className="rounded-lg"
      src={imgSrc}
      alt="foto_produk"
      onError={() => setImgSrc('/images/product-image-not-found.png')}
    />
  );
};

export default ProductImage;
