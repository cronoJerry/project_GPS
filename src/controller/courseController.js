import db from "../config/db";
export const getCourseList = async (req, res) => {
    const userId = req.user ? req.user.user_id : null;
    const QUERY = `
    select c.*, uc.users_course_id from course c 
    left join users_course uc on
    c.course_id = uc.course_id 
    and uc.user_id = ?;
    `;

    const courseList = await db.execute(QUERY, [1]).then((result) => result[0]);
    res.json(courseList);
};
// controller -> service(important) -> repository
