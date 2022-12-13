import React, { useEffect, useRef, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import { Col, Row } from "react-grid-system";
import { useTranslation } from "react-i18next";
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store/moves";
import { getSerialsData } from "../../../store/selectors";
import SerialCard from "../../../components/serial-card/serial-card";
import { movesAPI } from "../../../api/site-api/move-api";
import { useInView } from "react-intersection-observer";
import { ISerialCard } from "../../../types/serial";
import s from "./serial.module.scss";
import Filter from "../../../components/filter/filter";
import { IOption } from "../../../components/select/select";

SwiperCore.use([Navigation, Pagination, EffectFade, Autoplay]);

interface IMoves {
  path: string;
}

const Serial: React.FC<IMoves> = () => {
  const { t } = useTranslation();

  const SerialsData = useSelector(getSerialsData);

  const dispatch = useDispatch();

  const { data, category } = SerialsData;

  const contentRef = useRef();

  const countRef = useRef(1);

  const [filter, setFilter] = useState({});

  const [ref, inView] = useInView({
    threshold: 0,
  });

  const crudKey = "serials";

  useEffect(() => {
    (async () => {
      console.log("aaaaaaaaaaaaaaaaaa");
      if (inView && Object.keys(filter).length === 0) {
        const data = await movesAPI.getMovesData(crudKey, countRef.current);
        dispatch(actions.fetching(data));
        countRef.current++;
      }
    })();
    ///return () => dispatch(actions.resetState())
  }, [inView, Object.keys(filter).length]);
  console.log(Object.keys(filter).length, "filter");
  const location = useLocation();

  //// const handlerCard = () => navigate(`${location.pathname}`)

  // useEffect(() => {
  //     (
  //         async () => {
  //
  //                 const data = await movesAPI.getMovesData(crudKey, countRef.current)
  //                 dispatch(actions.fetching(data))
  //             }
  //
  //
  //     )()
  //    /// return () => dispatch(actions.resetState())
  // }, [filter])
  useEffect(() => {
    (async () => {
      if (Object.keys(filter).length !== 0) {
        const data = await movesAPI.getFilterMovesData(filter);
        ///  dispatch(actions.resetState())
        dispatch(actions.fetching(data));
      }
    })();
  }, [Object.keys(filter).length]);

  const handlerOnChange = (name: any, criteria: Array<IOption>) => {
    console.log(criteria, name, "criteriacriteriacriteria");

    ////REMEBER FIX THIS PART FOR EMPTY ARRAY
    if (criteria) {
      setFilter((prevState: any) => ({
        ...prevState,
        [name]: criteria,
      }));
    } else {
      //   delete filter[name];
      setFilter(filter);
    }
  };
  return (
    <>
      <Filter category={category} handlerOnChange={handlerOnChange} />
      <Row ref={contentRef}>
        {data.length !== 0 ? (
          data.map((item: ISerialCard, index: number) => (
            <Col
              xs={12}
              sm={4}
              md={3}
              lg={3}
              xl={2}
              xxl={2}
              key={`${item.id}_${index}`}
            >
              <SerialCard
                id={item.id}
                title={item.title}
                url={item.url}
                image={item.image}
                genre={item.genre}
                year={item.year}
                duration={item.duration}
                crudKey={crudKey}
                slug={item.slug}
                quality={item.quality}
                rating={item.rating}
                description={item.description}
                country={item.country}
                director={item.director}
                translation={item.translation}
                home={false}
              />
            </Col>
          ))
        ) : (
          <p>{t("not_found_serials")}</p>
        )}
      </Row>
      <div className={s.detector} ref={ref} />
    </>
  );
};

export default Serial;
