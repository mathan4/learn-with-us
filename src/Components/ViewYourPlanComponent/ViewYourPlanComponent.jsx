import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useReactToPrint } from 'react-to-print';
import { Textarea } from "@/components/ui/textarea";

const ViewYourPlanComponent = () => {
  const lessonPlan = localStorage.getItem('lessonPlan');
  const componentRef=useRef();
  const [edit ,setEdit]=useState(false)

  const formatTopics = (text) => {
    if (!text) return null;

    const elements = [];
    let topic = '';
    let content = '';
    let isTopic = true;

    const sections = text.split("**");

    for (let i = 1; i < sections.length; i++) {
      const section = sections[i].trim();

      if (isTopic) {
        topic = section;
      } else {
        content = section;

       
        const contentPoints = content.split("* "); 

        const formattedContent = contentPoints.length > 1 ? (
          <ul>
            {contentPoints.slice(1).map((point, index) => ( 
              <li key={index}>{point.trim()}</li>
            ))}
          </ul>
        ) : (
          content 
        );


        elements.push(
          <div key={i}>
            <div className='font-bold text-xl inline-block'>{topic}</div>
            <br />
            {formattedContent}
            <br />
          </div>
        );
      }

      isTopic = !isTopic;
    }

    return elements;
  };

  const formattedElements = formatTopics(lessonPlan);
  const handlePrint = useReactToPrint({
    documentTitle: 'Title',
    contentRef: componentRef,
  });
  
  const editHandler= ()=>{
     setEdit(true)
  }

  return (
    <React.Fragment>
        
        <main className='px-40 py-10' >
        <div ref={componentRef}><center className='font-bold text-5xl mb-20 px-10'>Your Personal Lesson Plan</center>
         <div className='sm:px-10' >{formattedElements}</div>
         </div>
         <Button onClick={()=>{handlePrint()}} className="my-10 text-2xl p-6 ml-10">Print Your Plan</Button>
         </main>
    </React.Fragment>
  );
};

export default ViewYourPlanComponent;