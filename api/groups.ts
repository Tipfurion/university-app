export async function getGroups() {
    const url = new URL(`${process.env.API_ENDPOINT}/group`)
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }
    const params: any = {}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function createGroup({ code, speciality }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/group`)
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            code,
            speciality,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function updateGroup({ id, code, speciality }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/group`)
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            id,
            code,
            speciality,
        }),
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
export async function deleteGroup({ id }: any) {
    const url = new URL(`${process.env.API_ENDPOINT}/group`)
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
