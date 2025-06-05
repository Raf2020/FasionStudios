"use client";

import { getStorageImageUrl } from "@/actions/firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImageElementProps = {
  className?: string;
  imageUrl: string;
};

const ImageElement = ({
  className = "w-full",
  imageUrl,
}: ImageElementProps) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (imageUrl.startsWith("blob:") || imageUrl.startsWith("/images")) {
      setImageSrc(imageUrl);
    } else {
      getStorageImageUrl(imageUrl).then((url) => {
        setImageSrc(url);
      });
    }
  }, [imageUrl]);

  return (
    imageSrc && <Image alt="imageSrc" className={className} src={imageSrc} />
  );
};

export default ImageElement;
