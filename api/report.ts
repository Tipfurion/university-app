export async function getFullAcademicPerformance(): Promise<any> {
    const url = new URL(`${process.env.API_ENDPOINT}/report/fullAcademicPerformance`)
    const options = {
        method: 'Get',
        headers: { 'content-type': 'application/json' },
    }
    const res = await (await fetch(url.toString(), options)).json()
    return res
}
