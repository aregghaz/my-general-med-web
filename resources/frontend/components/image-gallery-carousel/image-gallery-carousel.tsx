import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-image-gallery";
import { Link } from "@reach/router";

import styles from "./image-gallery-carousel.scss";
import {IImages} from "../../types/home-types";


function galleryItemsCreator (images:Array<{
    original:string,
    thumbnail:string,
}>){
    return   images.map((image) => ({
        original: image,
        thumbnail: image
    }));
}

const convertArrayCarousel = (array:Array<{
    original:string,
    thumbnail: string,
    slug:string
}>) =>
    array.map((el:any) => ({
        original: el.image,
        thumbnail: el.image,
        slug: el.slug
    }));

const CarouselItem = (item:{
    original:string,
}) => {
    return (
        <img src={`${item.original}`} alt={item.original} className={styles.img} />
    );
};


interface IQuickShopItem {
    images: Array<IImages>
    modelOption?: Array<any>
}

const ImageGallery: React.FC<IQuickShopItem> = ({ images, modelOption }) => {
    return (
        <Carousel
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            renderItem={CarouselItem}
        />
    );
}


ImageGallery.defaultProps = {
    images: null,
    modelOption: null
};
export default ImageGallery
