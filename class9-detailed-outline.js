/* StudyAI • Class 9 Mathematics • authored teaching outline.
 * Builds unlimited chapter > lesson > focused-subtopic navigation from the
 * existing NCERT-aligned material, never from a fixed target or filler pages.
 * Every leaf points to an actual rendered explanation, worked example, or
 * authored subsection. Kept pure so chapter rings work without opening notes.
 */
(() => {
  'use strict';
  const skip=new Set([
    'Chapter coverage','Exam application','Common traps and final checks','Mastery check'
  ]);
  const list=value=>Array.isArray(value)?value:[];
  const clean=value=>String(value||'').trim();
  const usedTitle=(seen,title)=>{
    const n=(seen.get(title)||0)+1;
    seen.set(title,n);
    return n===1?title:title+' #'+n;
  };
  const hasCore=section=>Boolean(
    list(section.paragraphs).length||list(section.bullets).length||
    list(section.formulas).length||section.tip||section.exam_warning||
    section.figureId||!list(section.subtopics).length
  );
  function forEntry(entry){
    if(!entry||entry.board!=='CBSE'||entry.grade!=='Class 9'||
      entry.subject!=='Mathematics')return [];
    const chapter=window.CBSE_CLASS9_MATH_FULL_NOTES?.[entry.title];
    if(!chapter)return [];
    const appearances=new Map();
    const groups=[];
    for(const section of list(chapter.sections)){
      const title=clean(section?.title);
      if(!title||skip.has(title))continue;
      const groupKey=usedTitle(appearances,title);
      const leaves=[];
      const uniqueLeafNames=new Map();
      const add=(kind,name,details={})=>{
        const label=usedTitle(uniqueLeafNames,clean(name));
        leaves.push({
          kind,title:label,key:groupKey+'::'+kind+'::'+label,
          groupKey,groupIndex:groups.length,sectionIndex:groups.length,
          ...details
        });
      };
      const subtopics=list(section.subtopics).filter(item=>clean(item?.title));
      const examples=list(section.examples);
      if(hasCore(section)){
        add('core',subtopics.length?'Core explanation and methods':'Concept and method');
      }
      subtopics.forEach((item,index)=>{
        add('subtopic',item.title,{subtopicIndex:index});
      });
      // An actual, authored worked solution is a valid independent page.
      // These are direct section examples only; nested examples already stay
      // with the teaching subsection that explains them.
      examples.forEach((item,index)=>{
        if(item&&(item.question||list(item.steps).length||item.answer))
          add('example','Worked example: '+(clean(item.title)||String(index+1)),
            {exampleIndex:index});
      });
      if(!leaves.length)add('core','Concept and method');
      groups.push({title,key:groupKey,index:groups.length,leaves});
    }
    return groups;
  }
  function flat(entry){return forEntry(entry).flatMap(group=>group.leaves);}
  window.StudyAIClass9Outline={forEntry,flat};
})();
