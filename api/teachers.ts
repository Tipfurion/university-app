export async function getTeachers() {
    const url = new URL(`${process.env.API_ENDPOINT}/teacher`)
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }
    const params: any = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function createTeacher({ name, surname, patronymic, phone, email, department }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/teacher`)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, surname, patronymic, phone, email, department }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function updateTeacher({ id, name, surname, patronymic, phone, email, department }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/teacher`)
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, name, surname, patronymic, phone, email, department }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function deleteTeacher({ id }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/teacher`)
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
