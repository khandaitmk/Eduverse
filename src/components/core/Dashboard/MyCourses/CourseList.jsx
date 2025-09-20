import React from 'react'
import { useSelector } from 'react-redux'

function CourseList() {
  return (
    <div>
        <div>
            
        </div>
        <div>
            {
                course.map((item)=>{
                    return(
                    <div key={item._id}>
                        <div>
                            <div><img src={item.thumbnail} alt="" /></div>
                        </div>
                    </div>
                    );
                })
            }
        </div>
    </div>
  )
}

export default CourseList