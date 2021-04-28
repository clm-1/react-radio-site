import { useContext, useEffect } from 'react';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/CategoryProgramList.module.css'
import ProgramCard from './ProgramCard';

const CategoryProgramList = () => {
  const { categoryPrograms, setTab, setCategoryPrograms } = useContext(RadioDataContext);

  useEffect(() => {
    return () => {
      setCategoryPrograms(null);
    }
    // eslint-disable-next-line
  }, [])

  let content = 'Laddar...';
  let title = 'Laddar...'
  if (categoryPrograms) {
    title = categoryPrograms[0].programcategory.name;
    console.log(categoryPrograms);
    content = categoryPrograms.map(program => (
      <ProgramCard key={program.id} program={program} />
    ))
  }

  return ( 
    <div className={style.categoryProgramsWrapper}>
      <div>
        <div className={style.categoryTitleRow}>
          <span onClick={() => setTab('categories')}>{'<'}</span>
          <h4>{ title }</h4>
        </div>
        <div className={style.categoryProgramList}>
          { content }
        </div>
      </div>
    </div>
   );
}
 
export default CategoryProgramList;