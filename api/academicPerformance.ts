export async function getAcademicPerformances() {
    const url = new URL(`${process.env.API_ENDPOINT}/academicPerformance`)
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }
    const params: any = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function createAcademicPerformance({ student_id, mark, form_of_control_id, complete_date }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/academicPerformance`)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            student_id,
            mark,
            form_of_control_id,
            complete_date,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function updateAcademicPerformance({ id, student_id, mark, form_of_control_id, complete_date }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/academicPerformance`)
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            id,
            student_id,
            mark,
            form_of_control_id,
            complete_date,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function deleteAcademicPerformance({ id }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/academicPerformance`)
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
