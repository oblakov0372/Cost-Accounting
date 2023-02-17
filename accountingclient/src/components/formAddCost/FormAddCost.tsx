import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCost } from "../../redux/slices/cost";
import { RootState } from "../../redux/store";
import { postRequest } from "../../utils/requests";
import DropDown from "../dropdown/DropDown";
import styles from "./FormAddCost.module.scss";

export interface ICostModel {
  categoryId: number;
  price: number;
  comment: string;
}

const FormAddCost = ({ setIsVisibleModalWindow }: any) => {
  //#useState
  const [active, setActive] = useState(0);
  //#useState

  //#redux
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  //#redux

  const createCost = async () => {
    if (cost.price === 0) {
      setIsVisibleModalWindow((prev: boolean) => !prev);
      return;
    }
    try {
      const data = await postRequest("Costs/CreateCost", cost);
      dispatch(addCost(data));
      setIsVisibleModalWindow((prev: boolean) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const [cost, setCost] = useState<ICostModel>({
    categoryId: categories[0].id,
    price: 0,
    comment: "",
  });
  return (
    <div className={styles.form}>
      <div className={styles.data}>
        <label>Category</label>
        <DropDown
          setCost={setCost}
          active={active}
          setActive={setActive}
          categories={categories}
        />
      </div>
      <div className={styles.data}>
        <label>$Money</label>
        <input
          type="number"
          min={0}
          value={cost.price}
          onChange={(e) =>
            setCost((prev: ICostModel) => ({
              categoryId: prev.categoryId,
              price: parseInt(e.target.value),
              comment: prev.comment,
            }))
          }
        />
      </div>
      <div className={styles.data}>
        <label>Comment</label>
        <input
          type="text"
          value={cost.comment}
          onChange={(e) =>
            setCost((prev: ICostModel) => ({
              categoryId: prev.categoryId,
              price: prev.price,
              comment: e.target.value,
            }))
          }
        />
      </div>
      <button className={styles.send} onClick={() => createCost()}>
        Ok
      </button>
    </div>
  );
};

export default FormAddCost;
