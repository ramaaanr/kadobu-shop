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
    <div className={`image-container relative w-[${width}px] h-[${height}px]`}>
      <Image
        className="rounded-lg"
        src={imgSrc}
        alt="Logo"
        fill
        objectFit="cover"
        objectPosition="center"
      />
    </div>
  );
};

export default ProductImage;
