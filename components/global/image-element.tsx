"use client";

import { getStorageImageUrl } from "@/actions/firebase/storage";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

type CustomImageProps = Omit<ImageProps, "src"> & {
  imageUrl: string;
  showSkeleton?: boolean;
};

const ImageElement = ({
                        imageUrl,
                        showSkeleton = true,
                        ...props
                      }: CustomImageProps) => {
  const [resolvedSrc, setResolvedSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrl.startsWith("blob:") || imageUrl.startsWith("/") || imageUrl.startsWith("data:")) {
      setResolvedSrc(imageUrl);
      setIsLoading(false);
    } else {
      getStorageImageUrl(imageUrl).then((url) => {
        setResolvedSrc(url);
        setIsLoading(false);
      });
    }
  }, [imageUrl]);

  return (
      <>
        {showSkeleton && isLoading && (
            <div
                className={clsx(
                    "animate-pulse bg-gray-200 rounded-md",
                    props.className,
                    props.fill ? "w-full h-full" : ""
                )}
                style={{
                  width: props.width,
                  height: props.height,
                }}
            />
        )}

        {!isLoading && resolvedSrc && (
            <Image
                {...props}
                src={resolvedSrc}
                alt={props.alt || "Image"}
                onLoadingComplete={() => setIsLoading(false)}
            />
        )}
      </>
  );
};

export default ImageElement;