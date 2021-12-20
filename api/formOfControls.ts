export async function getFormOfControls() {
    const url = new URL(`${process.env.API_ENDPOINT}/formOfControl`)
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }
    const params: any = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function createFormOfControl({
    subject,
    control_form,
    semester,
    curriculum_id,
    teacher_id,
    exam_date,
}: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/formOfControl`)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subject, control_form, semester, curriculum_id, teacher_id, exam_date }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function updateFormOfControl({
    id,
    subject,
    control_form,
    semester,
    curriculum_id,
    teacher_id,
    exam_date,
}: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/formOfControl`)
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, subject, control_form, semester, curriculum_id, teacher_id, exam_date }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function deleteFormOfControl({ id }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/formOfControl`)
    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            id,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
