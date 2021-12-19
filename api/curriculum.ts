export async function getCurriculums() {
    const url = new URL(`${process.env.API_ENDPOINT}/curriculum`)
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }
    const params: any = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function createCurriculum({ education_form, start_date, groupIds }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/curriculum`)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            education_form,
            start_date,
            groupIds,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function updateCurriculum({ id, education_form, start_date, groupIds }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/curriculum`)
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            id,
            education_form,
            start_date,
            groupIds,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function deleteCurriculum({ id }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/curriculum`)
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
