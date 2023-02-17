import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { RootState } from "../../redux/store";

interface IHistogramModel {
  name: string;
  dollars$: number;
}

const Histogram = () => {
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const { costs, totalSum } = useSelector((state: RootState) => state.cost);
  const data: IHistogramModel[] = [];

  categories.forEach((element) => {
    const obj: IHistogramModel = {
      name: element.name,
      dollars$: costs
        .filter((el) => el.categoryId === element.id)
        .reduce((sum, obj) => sum + obj.price, 0),
    };
    data.push(obj);
  });

  return (
    <>
      {data.length > 0 && (
        <BarChart
          width={categories.length * 150 > 600 ? categories.length * 150 : 600}
          height={categories.length * 50 > 200 ? categories.length * 50 : 200}
          data={data}
        >
          <XAxis dataKey="name" stroke="#5800ab" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="dollars$" fill="#5800ab" barSize={30} />
        </BarChart>
      )}
    </>
  );
};
export default Histogram;
