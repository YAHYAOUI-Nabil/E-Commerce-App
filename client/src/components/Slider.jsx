import React from 'react'
import styled from 'styled-components'
import {sliderItems} from '../data'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { mobile } from "../responsive"

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    position: relative;
    overflow: hidden;   
    ${mobile({ display: "none" })}; 
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg };
`
const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`
const Image = styled.img`
    object-fit: fill;
`
const Title = styled.h1`
    font-size: 70px;
`
const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    padding: 10px;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
`

const Slider = () => {
    
  return (
    <Container>
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {sliderItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Slide bg={item.bg}>
                            <ImgContainer>
                                <Image src={item.img} />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                                <Button>SHOW NOW</Button>
                            </InfoContainer>
                        </Slide>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    </Container>
  )
}

export default Slider