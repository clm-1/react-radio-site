import { useContext, useState, useEffect } from 'react';
import ProgramCard from '../components/ProgramCard';
import { RadioDataContext } from '../contexts/RadioDataContext';
import style from '../css/ProgramList.module.css';

const ProgramList = () => {
  const { getPrograms, programs } = useContext(RadioDataContext);
  

  useEffect(() => {
    getPrograms();
  }, []);

  let content = 'Loading';
  if (programs) {
    console.log(programs)
    content = programs.map(program => (
      <ProgramCard key={program.id} program={program} />
    ))
  }

  return ( 
    <div className={style.programListWrapper}>
      <div className={style.header}></div>
      <hr/>
      <div className={style.programList}>
        { content }
      </div>
    </div>
   );
}
 
export default ProgramList;