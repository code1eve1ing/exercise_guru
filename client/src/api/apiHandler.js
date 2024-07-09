import axiosInstance from './axios'

const apiHandler = async (method, url, data = null) => {
    const result = await axiosInstance(
        {
            method,
            url,
            data
        }
    )
        .then(res => res.data)
        .catch(err => {

            alert(err)
            return null

        })

    return result

}

export default apiHandler