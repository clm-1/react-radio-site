import { useContext } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  const { getAllProgramsByCategory, setTab } = useContext(RadioDataContext);

  const cardClickHandler = () => {
    getAllProgramsByCategory(category.id);
    setTab('category');
  }

  return ( 
    <div className={`${style.categoryCard}`} onClick={cardClickHandler}>
      <img src={category.image} alt=""/>
      <p>{category.name}</p>
    </div>
   );
}
 
export default CategoryCard;