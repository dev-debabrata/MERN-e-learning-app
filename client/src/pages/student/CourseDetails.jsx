import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';


const CourseDetails = () => {

    const { id } = useParams();

    const [courseData, setCourseData] = useState(null);

    const { allCourses, calculateRating } = useContext(AppContext);

    const fetchCourseData = async () => {
        const findCourse = allCourses.find((course) => course.id === id);
        setCourseData(findCourse);
    }

    useEffect(() => {
        fetchCourseData()
    }, []);

    return courseData ? (
        <>
            <div className=' flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
                <div className=' absolute top-0 left-0 w-full -z-1 bg-gradient-to-b space-x-96 from-cyan-100/70'>

                </div>
                {/* left column */}
                <div className=' max-w-xl z-10 text-gray-500'>
                    <h1 className=' font-semibold text-gray-800'>{courseData.courseTitle}</h1>
                    <p className=' pt-4 md:text-base text-sm'
                        dangerouslySetInnerHTML={{ _html: courseData.courseDescription.slice(0, 200) }}></p>
                </div>

                <div className=' flex items-center space-x-2'>
                    <p>{calculateRating(courseData)}</p>
                    <div className=' flex'>
                        {[...Array(5)].map((_, i) => (<img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='' className=' w-3.5 h-3.5' />
                        ))}
                    </div>
                    <p className=' text-gray-500'>{courseData.courseRatings.length}</p>
                </div>

                {/* right column */}
                <div></div>
            </div>
        </>

    ) : <Loading />
}

export default CourseDetails