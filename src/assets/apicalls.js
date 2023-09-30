import { ENDPOINT } from "@/data/endpoints"
export const API_CALLS = {

    updateSection: async (authToken, sectionName, updatedData, id) => {
        const response = await fetch(`${ENDPOINT.UPDATE_RECORD}/${sectionName}/${id}`, {
            method: "PUT",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
                'auth-token': authToken
            },
            body: JSON.stringify(updatedData),
        }).then(async (response) => {
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
                return response.status == 200 ? { severity: 'success', message: response.message } : { severity: 'error', message: response.error }
        }).catch(error => {
                return { severity: 'error', message: error }
            });

        return response
    }
}

