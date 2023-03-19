import React from "react";
import Carousel from "react-image-gallery";

import styles from "./image-gallery-carousel.scss";
import { IImages } from "../../types/home-types";


function galleryItemsCreator(images: Array<{
    original: string,
    thumbnail: string,
}>) {
    return images.map((image) => ({
        original: image,
        thumbnail: image
    }));
}

const convertArrayCarousel = (array: Array<{
    original: string,
    thumbnail: string,
    slug: string
}>) =>
    array.map((el: any) => ({
        original: el.image,
        thumbnail: el.image,
        slug: el.slug
    }));

const CarouselItem = (item: {
    original: string,
}) => {
    return (
        <img src={`${item.original}`} alt={item.original} className={styles.img} />
    );
};


interface IQuickShopItem {
    images: Array<IImages>;
    modelOption?: Array<any>;
}

const aa : any = [
    {
        "id": 7,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 8,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 9,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 10,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 11,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 12,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 13,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    },
    {
        "id": 14,
        "original": "/uploads/2/car/2/1678831343nkar1.webp",
        "thumbnail": "/uploads/2/car/2/1678831343nkar1.webp"
    }
]

const ImageGallery: React.FC<IQuickShopItem> = ({ images, modelOption }) => {
    return (
        <Carousel
            thumbnailPosition={"top"}
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            renderItem={CarouselItem}
        />
    );
};


ImageGallery.defaultProps = {
    images: null,
    modelOption: null
};
export default ImageGallery;
