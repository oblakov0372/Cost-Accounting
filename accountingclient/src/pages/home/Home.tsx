import { useEffect, useState } from "react";
import { getRequest } from "../../utils/requests";
import styles from "./Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/slices/category";
import { setCosts } from "../../redux/slices/cost";
import { RootState } from "../../redux/store";
import Items from "../../components/grid/Items";
import ModalWindow from "../../components/modalWindow/ModalWindow";
import FormAddCategory from "../../components/formAddCategory/FormAddCategory";
import FormAddCost from "../../components/formAddCost/FormAddCost";
import Histogram from "../../components/histogram/Histogram";
import Sort from "../../components/sort/Sort";

const Home = () => {
  //#redux
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const isLoged = useSelector((state: RootState) => state.user.isLoged);
  const { costs, totalSum } = useSelector((state: RootState) => state.cost);
  const dispatch = useDispatch();
  //#redux
  //#useStates
  const [isVisibleModalWindow, setIsVisibleModalWindow] = useState(false);
  const [isModalForCategory, setIsModalForCategory] = useState(false);
  const [sort, setSort] = useState(0);
  //#useStates

  useEffect(() => {
    async function GetCategories() {
      const data = await getRequest("Categories/GetCategory");
      dispatch(setCategories(data));
    }
    async function GetCosts() {
      const data = await getRequest("Costs/GetAllDate");
      dispatch(setCosts(data));
    }
    if (isLoged) {
      GetCategories();
      GetCosts();
    }
  }, []);

  const openDropDown = (bool: boolean) => {
    setIsVisibleModalWindow(true);
    setIsModalForCategory(bool);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={styles.topBlock}>
          <div className={styles.topBlock__left}>
            <h1>Overview</h1>
            <p>Here is your costs</p>
          </div>
          <div className={styles.topBlock__right}>
            <button onClick={() => openDropDown(false)}>+ Add Cost</button>
            <button onClick={() => openDropDown(true)} className="ml-5">
              + Add category
            </button>
          </div>
        </div>
        <div className={styles.information}>
          <div className={styles.information__block}>
            <h1>Count costs</h1>
            <h2>{costs.length}</h2>
          </div>
          <div className={styles.information__block}>
            <h1>Paid</h1>
            <h2>${totalSum}</h2>
          </div>
        </div>
        <div className={styles.items}>
          <div className="flex justify-between items-center">
            <h1>Costs</h1>
            <Sort active={sort} setActive={(i: number) => setSort(i)} />
          </div>
          <Items items={costs} />
        </div>
        <div>
          <Histogram />
        </div>
      </div>

      {isVisibleModalWindow && (
        <ModalWindow setIsVisibleModalWindow={setIsVisibleModalWindow}>
          {isModalForCategory ? (
            <FormAddCategory
              setIsVisibleModalWindow={setIsVisibleModalWindow}
            />
          ) : (
            <FormAddCost setIsVisibleModalWindow={setIsVisibleModalWindow} />
          )}
        </ModalWindow>
      )}
    </>
  );
};

export default Home;
