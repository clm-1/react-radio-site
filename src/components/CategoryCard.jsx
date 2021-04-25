import { useContext } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  const { getAllProgramsByCategory, setTab } = useContext(RadioDataContext);

  const cardClickHandler = () => {
    getAllProgramsByCategory(category.id);
    setTab('category');
  }

  const colors = {
    2: 'rgb(195, 231, 206)',
    132: 'rgb(182, 221, 216)',
    82: 'rgb(211, 176, 221)',
    134: 'rgb(177, 176, 221)',
    135: 'rgb(222, 228, 196)',
    133: 'rgb(228, 196, 209)',
    3: 'rgb(235, 216, 201)',
    14: 'rgb(209, 218, 235)',
    4: 'rgb(228, 198, 190)',
    5: 'rgb(184, 208, 235)',
    11: 'rgb(184, 227, 235)',
    68: 'rgb(238, 234, 214)',
    7: 'rgb(216, 233, 206)',
    10: 'rgb(206, 231, 233)',
    12: 'rgb(233, 235, 217)',
  }

  return ( 
    <div className={`${style.categoryCard}`} style={{ backgroundColor: colors[category.id] }} onClick={cardClickHandler}>
      <img src={category.image} alt=""/>
      <p>{category.name}</p>
    </div>
   );
}
 
export default CategoryCard;