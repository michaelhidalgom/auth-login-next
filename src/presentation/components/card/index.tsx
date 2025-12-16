import Image from "next/image";
import React from "react";

type CardProps = {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  onClick?: () => void;
};

const Card = ({ title, description, thumbnail, price }: CardProps) => {
  return (
    <div>
      <div>
        {/* <Image title={title} src={thumbnail} width={100} height={100} /> */}
      </div>
      <div>
        <div>
          <h5>{title}</h5>
          <p>{description}</p>
          <p>{price}</p>
          {/* <button onClick={onClick}>Ver más</button> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
