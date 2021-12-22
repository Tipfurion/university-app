import { Request, Response } from 'express'
import db from '../db'
import _ from 'lodash'
const reportController = {
    getFullAcademicPerformance: async (req: Request, res: Response) => {
        const items = (await db.raw(`
          select ap.mark,ap.complete_date,
            foc.subject,foc.control_form,foc.exam_date, foc.semester ,
            gr.code as group_code,
            concat( st.surname,' ', st.name, ' ',st.patronymic) as student,
            concat( te.surname,' ', te.name, ' ',te.patronymic) as teacher, te.department as teacher_department
          from [academic_performance] ap
            join [form_of_control] foc on ap.form_of_control_id = foc.id
            join [student] st on ap.student_id = st.id
            join [group] gr on gr.id = st.group_id
            join [teacher] te on te.id = foc.teacher_id
        `)) as any
        return res.json(items)
    },
    getArrears: async (req: Request, res: Response) => {
        const items = (await db.raw(`
        select ap.mark,ap.complete_date,
          foc.subject,foc.control_form,foc.exam_date, foc.semester ,
          gr.code as group_code,
          concat( st.surname,' ', st.name, ' ',st.patronymic) as student,
          concat( te.surname,' ', te.name, ' ',te.patronymic) as teacher, te.department as teacher_department
        from [academic_performance] ap
          join [form_of_control] foc on ap.form_of_control_id = foc.id
          join [student] st on ap.student_id = st.id
          join [group] gr on gr.id = st.group_id
          join [teacher] te on te.id = foc.teacher_id
        where mark  in (N'Неявка', N'Неудовлетворительно', N'Не зачтено')
      `)) as any
        return res.json(items)
    },
    getArrearsBiggerThanHalfYear: async (req: Request, res: Response) => {
        const items = (await db.raw(`
      select ap.mark,ap.complete_date,
        foc.subject,foc.control_form,foc.exam_date, foc.semester ,
        gr.code as group_code,
        concat( st.surname,' ', st.name, ' ',st.patronymic) as student,
        concat( te.surname,' ', te.name, ' ',te.patronymic) as teacher, te.department as teacher_department
      from [academic_performance] ap
        join [form_of_control] foc on ap.form_of_control_id = foc.id
        join [student] st on ap.student_id = st.id
        join [group] gr on gr.id = st.group_id
        join [teacher] te on te.id = foc.teacher_id
      where mark  in (N'Неявка', N'Неудовлетворительно', N'Не зачтено')
      and DATEDIFF(year, complete_date, exam_date) > 0.5
    `)) as any
        return res.json(items)
    },
}
export default reportController
