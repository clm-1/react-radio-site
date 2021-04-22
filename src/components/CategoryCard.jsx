import style from '../css/CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  return ( 
    <div className={style.showCard}>
      <img src={category.image} alt=""/>
      <p>{category.name} - {category.id}</p>
    </div>
   );
}
 
export default CategoryCard;