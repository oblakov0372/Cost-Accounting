import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ICategory } from "../../types/category";
import { ICost } from "../../types/cost";
import { ICostModel } from "../formAddCost/FormAddCost";
import styles from "./DropDown.module.scss";

const DropDown = ({ active, setActive, categories, setCost }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClickActive = (index: number) => {
    setActive(index);
    setCost((prev: ICostModel) => ({
      categoryId: categories[index].id,
      price: prev.price,
      comment: prev.comment,
    }));
    setIsVisible((prev) => !prev);
  };
  return (
    <div className={styles.DropDown}>
      <div className={styles.DropDown__label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <span onClick={() => setIsVisible((prev) => !prev)}>
          {categories[active].name}
        </span>
      </div>
      {isVisible && (
        <div className={styles.DropDown__popup}>
          <ul>
            {categories.map((el: ICategory, index: number) => (
              <li onClick={() => onClickActive(index)} key={el.id}>
                {el.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
