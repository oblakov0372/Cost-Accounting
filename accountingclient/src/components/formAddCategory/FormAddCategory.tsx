import { useState } from "react";
import deletePng from "../../assets/delete2.png";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, deleteCategory } from "../../redux/slices/category";
import { RootState } from "../../redux/store";
import { ICategory } from "../../types/category";
import { deleteRequest, postRequest } from "../../utils/requests";
import styles from "./FormAddCategory.module.scss";

const FormAddCategory = ({ setIsVisibleModalWindow }: any) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ name: "" });
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const createCategory = async () => {
    if (category.name === "") {
      setIsVisibleModalWindow((prev: boolean) => !prev);
      return;
    }
    try {
      const data = await postRequest("Categories/CreateCategory", category);
      dispatch(addCategory(data));
      setIsVisibleModalWindow((prev: boolean) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const onClckDeleteCategory = async (id: number) => {
    const status = await deleteRequest(
      `Categories/DeleteCategory?categoryId=${id}`
    );
    if (status === 200) {
      dispatch(deleteCategory(id));
    }
  };
  return (
    <>
      <div className={styles.form}>
        <div className={styles.data}>
          <label>Category Name:</label>
          <input
            type="text"
            value={category.name}
            onChange={(e) => setCategory({ name: e.target.value })}
          />
        </div>
        <button className={styles.send} onClick={() => createCategory()}>
          Ok
        </button>
      </div>
      <div className={styles.myCategories}>
        <h1>My categories</h1>
        <ul>
          {categories.map((cat: ICategory, index: number) => (
            <div className="flex items-center justify-between">
              <li key={cat.id}>
                {index + 1}. {cat.name}
              </li>
              <img
                onClick={() => onClckDeleteCategory(cat.id)}
                className="cursor-pointer"
                src={deletePng}
                alt="delete"
                width={20}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FormAddCategory;
