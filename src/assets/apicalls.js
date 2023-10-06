import { ENDPOINT } from "@/data/endpoints"
export const API_CALLS = {

    // function for updating the existing data
    updateSection: async (authToken, sectionName, updatedData, id) => {

        const response = await fetch(`${ENDPOINT.UPDATE_RECORD}/${sectionName}/${id}`, {
            method: "PUT",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(updatedData),
        }).then(async (response) => {
            console.log(response)
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
            console.log(response)
            return response.status == 200 ? { severity: 'success', message: response.message } : { severity: 'error', message: response.error }
        }).catch(error => {
            console.log(error)
            return { severity: 'error', message: error }
        });

        return response
    },

    // function for updating the existing data
    addRecord: async (authToken, sectionName, newData) => {

        const response = await fetch(`${ENDPOINT.ADD_RECORD}/${sectionName}`, {
            method: "POST",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': authToken
            },
            body: JSON.stringify(newData),
        }).then(async (response) => {
            console.log(response)
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
            console.log(response)
            return response.status == 200 ? { severity: 'success', message: response.message, data: response.data } : { severity: 'error', message: response.error }
        }).catch(error => {
            console.log(error)
            return { severity: 'error', message: error }
        });

        return response
    },

    // function for updating the existing data
    deleteRecord: async (authToken, sectionName, id) => {

        const response = await fetch(`${ENDPOINT.DELETE_RECORD}/${sectionName}/${id}`, {
            method: "DELETE",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'auth-token': authToken
            }
        }).then(async (response) => {
            console.log(response)
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
            console.log(response)
            return response.status == 200 ? { severity: 'success', message: response.message } : { severity: 'error', message: response.error }
        }).catch(error => {
            console.log(error)
            return { severity: 'error', message: error }
        });

        return response
    },


    // function for updating the existing data
    deleteSection: async (authToken, sectionName) => {

        const response = await fetch(`${ENDPOINT.DELETE_SECTION}/${sectionName}`, {
            method: "DELETE",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'auth-token': authToken
            }
        }).then(async (response) => {
            console.log(response)
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
            console.log(response)
            return response.status == 200 ? { severity: 'success', message: response.message } : { severity: 'error', message: response.error }
        }).catch(error => {
            console.log(error)
            return { severity: 'error', message: error }
        });

        return response
    },

    // function for adding new section
    addSection: async (authToken, sectionName) => {

        const response = await fetch(`${ENDPOINT.ADD_SECTION}/${sectionName}`, {
            method: "POST",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'auth-token': authToken
            },
        }).then(async (response) => {
            console.log(response)
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
            console.log(response)
            return response.status == 200 ? { severity: 'success', message: response.message } : { severity: 'error', message: response.error }
        }).catch(error => {
            console.log(error)
            return { severity: 'error', message: error }
        });

        return response
    },
    // function for adding new section
    reorderSection: async (authToken, sectionName, destinationIndex) => {

        const response = await fetch(`${ENDPOINT.REORDER_SECTION}/${sectionName}/${destinationIndex}`, {
            method: "GET",
            redirect: 'follow',
            headers: {
                'Accept': 'application/json',
                'auth-token': authToken
            },
        }).then(async (response) => {
            console.log(response)
            var json = await response.json()
            return { status: response.status, ...json }
        }).then(response => {
            console.log(response)
            return response.status == 200 ? { severity: 'success', message: response.message } : { severity: 'error', message: response.error }
        }).catch(error => {
            console.log(error)
            return { severity: 'error', message: error }
        });

        return response
    }
}

